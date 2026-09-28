import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface SupportMessage {
  id: string;
  sender: string;
  body: string;
  created_at: string;
}

interface SupportSession {
  id: string;
  token: string;
  name: string;
  email: string;
}

const STORAGE_KEY = "sbx-support-chat";

const readSession = (): SupportSession | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SupportSession;
    if (!parsed.id || !parsed.token || !parsed.name || !parsed.email) return null;
    return parsed;
  } catch {
    return null;
  }
};

const HelpChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<SupportSession | null>(() => readSession());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);

  const loadMessages = async (current: SupportSession) => {
    const { data, error: loadError } = await supabase.rpc("visitor_support_messages", {
      p_chat_id: current.id,
      p_token: current.token,
    });
    if (loadError) {
      if (loadError.message.toLowerCase().includes("not found")) {
        localStorage.removeItem(STORAGE_KEY);
        setSession(null);
        setMessages([]);
      }
      return;
    }
    setMessages(data ?? []);
  };

  useEffect(() => {
    if (!isOpen || !session) return;
    loadMessages(session);
    const timer = window.setInterval(() => loadMessages(session), 4000);
    return () => window.clearInterval(timer);
  }, [isOpen, session]);

  useEffect(() => {
    const thread = threadRef.current;
    if (thread) thread.scrollTop = thread.scrollHeight;
  }, [messages, isOpen, session]);

  const startChat = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    if (!cleanName || !cleanEmail.includes("@")) {
      setError("Enter your name and email to start.");
      return;
    }

    setBusy(true);
    const { data, error: startError } = await supabase.rpc("start_support_chat", {
      p_name: cleanName,
      p_email: cleanEmail,
    });
    setBusy(false);

    const row = data?.[0];
    if (startError || !row) {
      setError(startError?.message || "Could not start the chat.");
      return;
    }

    const next = { id: row.id, token: row.access_token, name: cleanName, email: cleanEmail };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSession(next);
    setMessages([]);
  };

  const sendMessage = async () => {
    if (!session || !inputValue.trim() || busy) return;
    const body = inputValue.trim();
    setInputValue("");
    setBusy(true);
    setError("");
    const { error: sendError } = await supabase.rpc("visitor_send_support_message", {
      p_chat_id: session.id,
      p_token: session.token,
      p_body: body,
    });
    setBusy(false);
    if (sendError) {
      setInputValue(body);
      setError(sendError.message);
      return;
    }
    await loadMessages(session);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="mb-4 flex h-[28rem] w-80 flex-col overflow-hidden shadow-2xl border-primary/20 bg-background/95 backdrop-blur-sm">
          <CardHeader className="flex shrink-0 flex-row items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <CardTitle className="text-sm font-semibold">Help & Support</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex min-h-0 flex-1 flex-col p-0">
            {!session ? (
              <form onSubmit={startChat} className="flex flex-1 flex-col justify-center gap-3 p-4">
                <p className="text-sm text-muted-foreground">
                  Enter your name and email, then send a message. An admin will reply here.
                </p>
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={80}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  maxLength={160}
                  required
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" disabled={busy}>
                  Start chat
                </Button>
              </form>
            ) : (
              <>
                <div ref={threadRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground">
                      Hi {session.name}! Send your question and we will reply in this chat.
                    </div>
                  </div>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn("flex", message.sender === "visitor" ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                          message.sender === "visitor"
                            ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        {message.body}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="shrink-0 border-t p-4">
                  {error && <p className="mb-2 text-sm text-destructive">{error}</p>}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your question..."
                      value={inputValue}
                      onChange={(event) => setInputValue(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") sendMessage();
                      }}
                      maxLength={2000}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} size="sm" className="px-3" disabled={busy}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-300",
          "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90",
          "hover:scale-110 active:scale-95"
        )}
      >
        <MessageCircle className="h-6 w-6 text-primary-foreground" />
      </Button>
    </div>
  );
};

export default HelpChat;
