'use client';
import { useState } from 'react';

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
    <div className="flex items-center gap-1 rounded-lg bg-muted p-0.5 shadow-sm">
      {options.map(opt => (
        <button
          key={opt.id}
          onClick={() => handleSelect(opt.id)}
          className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
            active === opt.id
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
