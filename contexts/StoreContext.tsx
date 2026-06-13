"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { startOfMonth, endOfMonth, subDays, startOfDay, endOfDay } from "date-fns";

interface DateRange { from: string; to: string; }
type PeriodPreset = 'today' | '7days' | 'month' | 'lastMonth' | 'custom';

interface StoreContextType {
  storeId: string;
  setStoreId: (id: string) => void;
  period: PeriodPreset;
  setPeriod: (p: PeriodPreset) => void;
  customRange: DateRange;
  setCustomRange: (r: DateRange) => void;
  getDateRange: () => DateRange;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [storeId, setStoreId] = useState("all");
  const [period, setPeriod] = useState<PeriodPreset>("month");
  const [customRange, setCustomRange] = useState<DateRange>({ from: "", to: "" });

  function getDateRange(): DateRange {
    const now = new Date();
    switch (period) {
      case 'today':
        return { from: startOfDay(now).toISOString(), to: endOfDay(now).toISOString() };
      case '7days':
        return { from: subDays(now, 7).toISOString(), to: now.toISOString() };
      case 'month':
        return { from: startOfMonth(now).toISOString(), to: endOfMonth(now).toISOString() };
      case 'lastMonth':
        return { from: startOfMonth(subDays(startOfMonth(now), 1)).toISOString(), to: endOfMonth(subDays(startOfMonth(now), 1)).toISOString() };
      case 'custom':
        return customRange;
      default:
        return { from: startOfMonth(now).toISOString(), to: endOfMonth(now).toISOString() };
    }
  }

  return (
    <StoreContext.Provider value={{ storeId, setStoreId, period, setPeriod, customRange, setCustomRange, getDateRange }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
