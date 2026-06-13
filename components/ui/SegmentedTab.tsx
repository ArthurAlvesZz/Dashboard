'use client';
import { cn } from '@/lib/utils';

interface SegmentedTabProps {
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}

export function SegmentedTab({ options, value, onChange }: SegmentedTabProps) {
  return (
    <div className="flex bg-muted/50 p-1 rounded-lg w-fit">
      {options.map(option => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            "relative px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-300",
            value === option.id ? "bg-background shadow-sm text-foreground border border-border" : "text-muted-foreground hover:text-foreground border border-transparent"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
