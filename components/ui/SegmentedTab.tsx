'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SegmentedTabProps {
  options: { id: string; label: string }[];
  defaultValue?: string;
  onChange?: (id: string) => void;
}

export function SegmentedTab({ options, defaultValue, onChange }: SegmentedTabProps) {
  const [active, setActive] = useState(defaultValue || options[0]?.id);

  const handleSelect = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted p-0.5 shadow-sm w-fit">
      {options.map(opt => (
        <button
          key={opt.id}
          onClick={() => handleSelect(opt.id)}
          className={cn(
            "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
            active === opt.id
              ? "bg-background text-foreground shadow-sm border border-border"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
