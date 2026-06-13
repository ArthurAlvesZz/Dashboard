'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { stores, dateFilters } from '@/lib/mockData';

interface StoreContextType {
  selectedStore: string;
  selectedDate: string;
  setSelectedStore: (id: string) => void;
  setSelectedDate: (id: string) => void;
  storeName: string;
  dateName: string;
  getDateRange: () => { from: string; to: string };
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [selectedStore, setSelectedStore] = useState(stores[0].id);
  const [selectedDate, setSelectedDate] = useState(dateFilters[0].id);

  const getDateRange = () => {
    const today = new Date();
    let from = new Date();
    let to = new Date();

    switch (selectedDate) {
      case 'hoje':
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      case 'semana':
        from.setDate(today.getDate() - today.getDay());
        from.setHours(0, 0, 0, 0);
        to.setDate(from.getDate() + 6);
        to.setHours(23, 59, 59, 999);
        break;
      case 'mes_atual':
        from = new Date(today.getFullYear(), today.getMonth(), 1);
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
        break;
      case 'mes_anterior':
        from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        to = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59, 999);
        break;
      default:
        from = new Date(today.getFullYear(), 0, 1);
        break;
    }
    return { from: from.toISOString(), to: to.toISOString() };
  };

  return (
    <StoreContext.Provider value={{
      selectedStore,
      selectedDate,
      setSelectedStore,
      setSelectedDate,
      storeName: stores.find(s => s.id === selectedStore)?.name || '',
      dateName: dateFilters.find(d => d.id === selectedDate)?.name || '',
      getDateRange
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
