import { ArrowUp, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type QueuedMessageCardProps = {
  messages: string[];
  onSend: (index: number) => void;
  onDelete: (index: number) => void;
};

export function QueuedMessageCard({
  messages,
  onSend,
  onDelete
}: QueuedMessageCardProps): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.12 }}
      className="flex flex-col gap-0.5 rounded-xl border border-amber-500/25 bg-amber-500/5 px-2 py-1"
    >
      {messages.map((msg, i) => (
        <div key={i} className="flex items-center gap-1 min-w-0">
          <span className="flex-1 truncate text-xs leading-4 text-foreground/80">{msg}</span>
          <Button
            type="button"
            onClick={() => onDelete(i)}
            title="Remove"
            aria-label="Remove queued message"
            variant="ghost"
            size="icon"
            className="h-4 w-4 shrink-0 rounded text-muted-foreground/60 hover:text-destructive"
          >
            <Trash2 size={10} />
          </Button>
          <Button
            type="button"
            onClick={() => onSend(i)}
            title="Send now"
            aria-label="Send queued message"
            size="icon"
            className="h-4 w-4 shrink-0 rounded-full bg-foreground text-background hover:bg-foreground/80"
          >
            <ArrowUp size={8} />
          </Button>
        </div>
      ))}
    </motion.div>
  );
}
