import { createHmac, timingSafeEqual } from "crypto";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL
  || process.env.VITE_SUPABASE_URL
  || "https://lhckdztrycbovxiwdziz.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
  || process.env.VITE_SUPABASE_PUBLISHABLE_KEY
  || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxoY2tkenRyeWNib3Z4aXdkeml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MTM0OTcsImV4cCI6MjA3MjQ4OTQ5N30.65NVJePSyqOn0BTISwBlXpehqkOUPegBova14xO5qrM";

const apiBase = () => (process.env.NOWPAYMENTS_API_URL || "https://api.nowpayments.io/v1").replace(/\/$/, "");

const config = () => {
  const apiKey = process.env.NOWPAYMENTS_API_KEY || "";
  const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET
    || process.env.NOWPAYMENTS_API_SECRET
    || "";
  return {
    apiKey,
    apiSecret: process.env.NOWPAYMENTS_API_SECRET || "",
    ipnSecret,
    publicKey: process.env.NOWPAYMENTS_PUBLIC_KEY || "",
    payoutEmail: process.env.NOWPAYMENTS_PAYOUT_EMAIL || "",
    payoutPassword: process.env.NOWPAYMENTS_PAYOUT_PASSWORD || process.env.NOWPAYMENTS_PASSWORD || "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  };
};

const readBody = (req) => new Promise((resolve, reject) => {
  const chunks = [];
  let size = 0;
  req.on("data", (chunk) => {
    size += chunk.length;
    if (size > 1_000_000) {
      reject(new Error("Body too large"));
      req.destroy();
      return;
    }
    chunks.push(chunk);
  });
  req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  req.on("error", reject);
});

const sendJson = (res, status, body) => {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload),
  });
  res.end(payload);
};

const publicOrigin = (req) => {
  const configured = process.env.PUBLIC_SITE_URL || process.env.RENDER_EXTERNAL_URL || "";
  if (configured) return configured.replace(/\/$/, "");
  const forwardedProto = req.headers["x-forwarded-proto"];
  const proto = (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto)?.split(",")[0] || "https";
  const forwardedHost = req.headers["x-forwarded-host"];
  const host = (Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost) || req.headers.host;
  return `${proto}://${host}`;
};

const sortObject = (value) => {
  if (Array.isArray(value)) return value.map(sortObject);
  if (value && typeof value === "object") {
    return Object.keys(value).sort().reduce((sorted, key) => {
      sorted[key] = sortObject(value[key]);
      return sorted;
    }, {});
  }
  return value;
};

const signaturesMatch = (expected, received) => {
  const left = Buffer.from(String(expected).toLowerCase());
  const right = Buffer.from(String(received).toLowerCase());
  return left.length === right.length && timingSafeEqual(left, right);
};

const paymentStatusFor = (status) => {
  if (status === "finished" || status === "confirmed") return "paid";
  if (status === "failed" || status === "expired" || status === "refunded") return "failed";
  return "pending";
};

const payoutToken = async () => {
  const { payoutEmail, payoutPassword } = config();
  if (!payoutEmail || !payoutPassword) return null;
  const response = await fetch(`${apiBase()}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: payoutEmail, password: payoutPassword }),
  });
  if (!response.ok) return null;
  const data = await response.json().catch(() => ({}));
  return data.token || null;
};

const adminClient = () => {
  const { serviceRoleKey } = config();
  if (!serviceRoleKey) return null;
  return createClient(SUPABASE_URL, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};

const markRequest = async (orderId, paymentStatus, paymentId) => {
  const admin = adminClient();
  if (!admin || !orderId) return;
  const status = paymentStatusFor(paymentStatus);
  const note = `NOWPayments ${paymentStatus}${paymentId ? ` #${paymentId}` : ""}`;
  const withPaymentId = await admin.from("plan_requests").update({
    status,
    message: note,
    payment_id: paymentId ? String(paymentId) : null,
  }).eq("id", orderId);
  if (!withPaymentId.error) return;
  await admin.from("plan_requests").update({
    status,
    message: note,
  }).eq("id", orderId);
};

const createInvoice = async (req, res) => {
  const { apiKey } = config();
  if (!apiKey) {
    sendJson(res, 503, { error: "NOWPayments API key is missing on the server." });
    return;
  }

  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) {
    sendJson(res, 401, { error: "Sign in before paying." });
    return;
  }

  let body = {};
  try {
    body = JSON.parse((await readBody(req)) || "{}");
  } catch {
    sendJson(res, 400, { error: "Invalid payment request." });
    return;
  }

  const planSlug = String(body.planSlug || "");
  if (!planSlug) {
    sendJson(res, 400, { error: "Choose a plan to pay for." });
    return;
  }

  const authClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: userData, error: userError } = await authClient.auth.getUser(token);
  if (userError || !userData.user) {
    sendJson(res, 401, { error: "Sign in before paying." });
    return;
  }

  const { data: plan, error: planError } = await authClient
    .from("plans")
    .select("id, slug, name, price_amount, billing_period, is_active")
    .eq("slug", planSlug)
    .eq("is_active", true)
    .maybeSingle();
  if (planError || !plan) {
    sendJson(res, 404, { error: "That plan is not available." });
    return;
  }

  const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data: request, error: requestError } = await userClient.from("plan_requests").insert({
    user_id: userData.user.id,
    plan_id: plan.id,
    plan_name: plan.name,
    email: userData.user.email,
    status: "pending",
  }).select("id").single();

  const savedRequest = request?.id
    ? request
    : (await userClient.from("plan_requests").insert({
      user_id: userData.user.id,
      plan_id: plan.id,
      plan_name: plan.name,
      email: userData.user.email,
      status: "new",
    }).select("id").single()).data;

  if (requestError && !savedRequest) {
    sendJson(res, 400, { error: requestError.message });
    return;
  }

  const origin = publicOrigin(req);
  await payoutToken();
  const invoiceResponse = await fetch(`${apiBase()}/invoice`, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_amount: Number(plan.price_amount),
      price_currency: "usd",
      order_id: savedRequest.id,
      order_description: `${plan.name} (${plan.billing_period})`,
      ipn_callback_url: `${origin}/api/nowpayments/ipn`,
      success_url: `${origin}/dashboard/subscription?payment=success`,
      cancel_url: `${origin}/dashboard/subscription?payment=cancelled`,
    }),
  });
  const invoice = await invoiceResponse.json().catch(() => ({}));
  if (!invoiceResponse.ok || !invoice.invoice_url) {
    sendJson(res, 502, { error: invoice.message || "NOWPayments could not start this payment." });
    return;
  }

  sendJson(res, 200, { invoiceUrl: invoice.invoice_url });
};

const receiveIpn = async (req, res) => {
  const { ipnSecret } = config();
  if (!ipnSecret) {
    sendJson(res, 503, { error: "IPN secret is not configured." });
    return;
  }

  let payload;
  try {
    payload = JSON.parse((await readBody(req)) || "{}");
  } catch {
    sendJson(res, 400, { error: "Invalid IPN payload." });
    return;
  }

  const signature = req.headers["x-nowpayments-sig"];
  const expected = createHmac("sha512", ipnSecret).update(JSON.stringify(sortObject(payload))).digest("hex");
  if (!signature || !signaturesMatch(expected, signature)) {
    sendJson(res, 401, { error: "Invalid IPN signature." });
    return;
  }

  await markRequest(payload.order_id, payload.payment_status, payload.payment_id);
  sendJson(res, 200, { ok: true });
};

export const handleNowPayments = async (req, res) => {
  const url = new URL(req.url || "/", "http://localhost");
  if (req.method === "POST" && url.pathname === "/api/nowpayments/invoice") {
    await createInvoice(req, res);
    return;
  }
  if (req.method === "POST" && url.pathname === "/api/nowpayments/ipn") {
    await receiveIpn(req, res);
    return;
  }
  sendJson(res, 404, { error: "Not found" });
};
