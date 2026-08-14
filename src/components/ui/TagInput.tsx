import { useState } from "react";
import { X } from "lucide-react";

import { Badge } from "./badge";
import { Input } from "./input";
import { Button } from "./button";

type Props = {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
};

export default function TagInput({ value, onChange, placeholder }: Props) {
  const [draft, setDraft] = useState("");

  function addTag() {
    const tag = draft.trim();

    if (!tag) return;

    const exists = value.some((t) => t.toLowerCase() === tag.toLowerCase());

    if (!exists) {
      onChange([...value, tag]);
    }

    setDraft("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  }

  return (
    <div className="space-y-2">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}

              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="rounded-full hover:text-destructive"
                aria-label={`Retirer l'étiquette ${tag}`}
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? "Ajouter une étiquette..."}
        />

        <Button type="button" variant="outline" onClick={addTag}>
          Ajouter
        </Button>
      </div>
    </div>
  );
}
