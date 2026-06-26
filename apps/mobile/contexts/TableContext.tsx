import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TableContextType {
  activeTable: string | null;
  setTable: (tableId: string | null) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export function TableProvider({ children }: { children: React.ReactNode }) {
  const [activeTable, setActiveTable] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('active_table').then(val => {
      if (val) setActiveTable(val);
    });
  }, []);

  const setTable = (tableId: string | null) => {
    setActiveTable(tableId);
    if (tableId) {
      AsyncStorage.setItem('active_table', tableId);
    } else {
      AsyncStorage.removeItem('active_table');
    }
  };

  return (
    <TableContext.Provider value={{ activeTable, setTable }}>
      {children}
    </TableContext.Provider>
  );
}

export const useTable = () => {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error('useTable must be used within a TableProvider');
  }
  return context;
};
