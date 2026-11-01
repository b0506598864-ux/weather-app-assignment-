import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { HistoryEntry } from "../types/history-type";

type HistoryContextValue = {
  entries: HistoryEntry[];
  addSearch: (city: string, country: string, searchedAt: string) => void;
};

const HistoryContext = createContext<HistoryContextValue | null>(null);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  const addSearch = useCallback(
    (city: string, country: string, searchedAt: string) => {
      const entry: HistoryEntry = {
        id: crypto.randomUUID(),
        city,
        country,
        searchedAt,
      };

      setEntries((previous) => [entry, ...previous]);
    },
    [],
  );

  return (
    <HistoryContext.Provider value={{ entries, addSearch }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);

  if (!context) {
    throw new Error("useHistory must be inside HistoryProvider");
  }

  return context;
}
