'use client';
import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { subDays, startOfMonth, endOfMonth, subMonths, startOfDay, endOfDay } from 'date-fns';

type Period = 'hoje' | 'semana' | 'mes_atual' | 'mes_anterior' | 'personalizado';

interface DateRange {
  from: string;
  to: string;
}

interface StoreContextType {
  storeId: string;
  setStoreId: (id: string) => void;
  period: Period;
  setPeriod: (p: Period) => void;
  customFrom: string;
  setCustomFrom: (d: string) => void;
  customTo: string;
  setCustomTo: (d: string) => void;
  getDateRange: () => DateRange;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [storeId, setStoreId] = useState('all');
  const [period, setPeriod] = useState<Period>('mes_atual');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');

  const getDateRange = useMemo(() => () => {
    const now = new Date();
    switch (period) {
      case 'hoje': {
        const start = startOfDay(now);
        const end = endOfDay(now);
        return { from: start.toISOString(), to: end.toISOString() };
      }
      case 'semana': {
        const start = subDays(now, 7);
        return { from: start.toISOString(), to: now.toISOString() };
      }
      case 'mes_atual': {
        const start = startOfMonth(now);
        const end = endOfMonth(now);
        return { from: start.toISOString(), to: end.toISOString() };
      }
      case 'mes_anterior': {
        const prev = subMonths(now, 1);
        const start = startOfMonth(prev);
        const end = endOfMonth(prev);
        return { from: start.toISOString(), to: end.toISOString() };
      }
      case 'personalizado': {
        return {
          from: customFrom ? new Date(customFrom).toISOString() : subDays(now, 30).toISOString(),
          to: customTo ? new Date(customTo).toISOString() : now.toISOString(),
        };
      }
      default:
        return { from: startOfMonth(now).toISOString(), to: endOfMonth(now).toISOString() };
    }
  }, [period, customFrom, customTo]);

  return (
    <StoreContext.Provider value={{
      storeId, setStoreId, period, setPeriod,
      customFrom, setCustomFrom, customTo, setCustomTo,
      getDateRange,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
