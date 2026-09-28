import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type SupportChat = {
  id: string;
  visitor_name: string;
  visitor_email: string;
  updated_at: string;
};

type SupportMessage = {
  id: string;
  sender: string;
  body: string;
  created_at: string;
};

export const SupportInbox = () => {
  const { toast } = useToast();
  const [chats, setChats] = useState<SupportChat[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  const loadChats = async () => {
    const { data, error } = await supabase
      .from("support_chats")
      .select("id, visitor_name, visitor_email, updated_at")
      .order("updated_at", { ascending: false });
    if (error) return;
    setChats(data ?? []);
  };

  const loadMessages = async (chatId: string) => {
    const { data, error } = await supabase
      .from("support_messages")
      .select("id, sender, body, created_at")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true });
    if (error) return;
    setMessages(data ?? []);
  };

  useEffect(() => {
    loadChats();
    const timer = window.setInterval(loadChats, 5000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    loadMessages(selectedId);
    const timer = window.setInterval(() => loadMessages(selectedId), 4000);
    return () => window.clearInterval(timer);
  }, [selectedId]);

  const sendReply = async () => {
    if (!selectedId || !reply.trim() || sending) return;
    setSending(true);
    const { error } = await supabase.from("support_messages").insert({
      chat_id: selectedId,
      sender: "admin",
      body: reply.trim(),
    });
    setSending(false);
    if (error) {
      toast({ title: "Reply not sent", description: error.message });
      return;
    }
    setReply("");
    await loadMessages(selectedId);
    await loadChats();
  };

  const selected = chats.find((chat) => chat.id === selectedId);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Support chats</h2>
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <Card className="max-h-[32rem] space-y-2 overflow-y-auto p-3">
          {chats.length === 0 && <p className="p-2 text-sm text-muted-foreground">No chats yet.</p>}
          {chats.map((chat) => (
            <button
              key={chat.id}
              type="button"
              onClick={() => setSelectedId(chat.id)}
              className={cn(
                "w-full rounded-md px-3 py-2 text-left",
                chat.id === selectedId ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
              )}
            >
              <p className="font-medium">{chat.visitor_name}</p>
              <p className={cn("text-xs", chat.id === selectedId ? "text-primary-foreground/80" : "text-muted-foreground")}>
                {chat.visitor_email}
              </p>
            </button>
          ))}
        </Card>

        <Card className="flex min-h-80 flex-col p-4">
          {!selected && <p className="text-sm text-muted-foreground">Select a chat to reply.</p>}
          {selected && (
            <>
              <div className="mb-3">
                <p className="font-medium text-foreground">{selected.visitor_name}</p>
                <p className="text-sm text-muted-foreground">{selected.visitor_email}</p>
              </div>
              <div className="mb-4 max-h-80 flex-1 space-y-3 overflow-y-auto">
                {messages.length === 0 && (
                  <p className="text-sm text-muted-foreground">This person has not sent a message yet.</p>
                )}
                {messages.map((message) => (
                  <div key={message.id} className={cn("flex", message.sender === "admin" ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                        message.sender === "admin"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      )}
                    >
                      {message.body}
                    </div>
                  </div>
                ))}
              </div>
              <Textarea
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                placeholder="Write a reply"
                maxLength={2000}
              />
              <Button className="mt-3 self-end" onClick={sendReply} disabled={sending || !reply.trim()}>
                Send reply
              </Button>
            </>
          )}
        </Card>
      </div>
    </section>
  );
};
