import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type QueuedMessageCardProps = {
  text: string;
  onSteer: () => void;
  onEdit: (text: string) => void;
  onDelete: () => void;
};

export function QueuedMessageCard({
  text,
  onSteer,
  onEdit,
  onDelete
}: QueuedMessageCardProps): React.JSX.Element {
  const [localText, setLocalText] = useState(text);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setLocalText(text);
  }, [text]);

  const handleBlur = useCallback(() => {
    const trimmed = localText.trim();
    if (trimmed && trimmed !== text) {
      onEdit(trimmed);
    } else if (!trimmed) {
      setLocalText(text);
    }
  }, [localText, text, onEdit]);

  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [localText, resizeTextarea]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className="flex items-start gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/5 px-3 py-2.5"
    >
      <Textarea
        ref={textareaRef}
        value={localText}
        onChange={(e) => {
          setLocalText(e.target.value);
          resizeTextarea();
        }}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            handleBlur();
            onSteer();
          }
        }}
        rows={1}
        className="flex-1 min-h-7 max-h-[120px] resize-none overflow-y-auto border-0 bg-transparent px-0 py-0.5 text-sm leading-5 shadow-none focus-visible:ring-0"
      />
      <div className="flex items-center gap-1 shrink-0 pt-0.5">
        <Button
          type="button"
          onClick={onSteer}
          title="Send now"
          aria-label="Send now"
          size="icon"
          className="h-7 w-7 rounded-full bg-foreground text-background hover:bg-foreground/80"
        >
          <ArrowUp size={12} />
        </Button>
        <Button
          type="button"
          onClick={onDelete}
          title="Delete queued message"
          aria-label="Delete queued message"
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full text-muted-foreground hover:text-destructive"
        >
          <Trash2 size={12} />
        </Button>
      </div>
    </motion.div>
  );
}
