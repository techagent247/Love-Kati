import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { MessageCircle, Send, X, Square } from "lucide-react";
import { business } from "@/data/business";

type Msg = { role: "user" | "assistant"; content: string; error?: boolean };

const starters = ["What's vegan on the menu?", "Do you cater weddings?", "What is a kati roll?"];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  useEffect(() => { if (open && !busy) inputRef.current?.focus(); }, [open, busy]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const history: Msg[] = [...msgs.filter((m) => !m.error), { role: "user", content: q }];
    setMsgs([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
        signal: ac.signal,
      });
      if (!res.ok || !res.body) throw new Error((await res.json().catch(() => null))?.error ?? "Something went wrong.");
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        const [answer, err] = acc.split("[[error]]");
        setMsgs((m) => {
          const copy = [...m];
          copy[copy.length - 1] = err !== undefined && !answer.trim()
            ? { role: "assistant", content: err, error: true }
            : { role: "assistant", content: answer.trim() };
          return copy;
        });
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        setMsgs((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: (e as Error).message, error: true };
          return copy;
        });
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close helper" : "Ask Love Kati a question"}
        className="btn-pop btn-magenta fixed bottom-4 left-4 z-50 px-4 py-3 text-lg"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask us"}</span>
      </button>

      {open && (
        <div className="card-pop fixed bottom-20 left-4 right-4 z-50 flex max-h-[70vh] flex-col overflow-hidden bg-paper p-0 sm:right-auto sm:w-[380px] animate-rise">
          <div className="flex items-center gap-3 border-b-2 border-ink bg-magenta px-4 py-3 text-paper">
            <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-sun font-display text-lg text-ink">LK</span>
            <div>
              <p className="font-display text-xl leading-none">Kati Helper</p>
              <p className="text-xs opacity-90">Menu, catering & info</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.length === 0 && (
              <div className="space-y-2">
                <p className="text-sm">Hi! Ask me anything about our food or booking us for your event.</p>
                {starters.map((s) => (
                  <button key={s} onClick={() => send(s)} className="block w-full rounded-xl border-2 border-ink bg-sun px-3 py-2 text-left text-sm font-semibold hover:bg-saffron">
                    {s}
                  </button>
                ))}
              </div>
            )}
            {msgs.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm border-2 border-ink bg-ink px-3 py-2 text-sm text-paper">{m.content}</div>
              ) : m.error ? (
                <p key={i} className="rounded-xl border-2 border-magenta bg-cream p-3 text-sm">{m.content} <a className="font-bold underline" href={business.phoneHref}>Call {business.phone}</a></p>
              ) : m.content ? (
                <div key={i} className="prose prose-sm max-w-none text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_p]:my-1"><ReactMarkdown>{m.content}</ReactMarkdown></div>
              ) : (
                <p key={i} className="text-sm text-muted-foreground animate-pulse">Rolling up an answer…</p>
              ),
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-end gap-2 border-t-2 border-ink p-3"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              rows={1}
              maxLength={2000}
              placeholder="Type your question…"
              className="max-h-28 flex-1 resize-none rounded-xl border-2 border-ink bg-cream px-3 py-2 text-sm outline-none focus:border-magenta"
            />
            {busy ? (
              <button type="button" onClick={() => abortRef.current?.abort()} aria-label="Stop" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-ink bg-saffron"><Square className="h-4 w-4" /></button>
            ) : (
              <button type="submit" aria-label="Send" disabled={!input.trim()} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-ink bg-sun disabled:opacity-50"><Send className="h-4 w-4" /></button>
            )}
          </form>
          <p className="px-3 pb-2 text-[10px] text-muted-foreground">AI answers can be wrong — confirm allergies by phone.</p>
        </div>
      )}
    </>
  );
}
