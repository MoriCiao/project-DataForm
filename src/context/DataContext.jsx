import React, { createContext, useState } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(1);
  const value = {
    currentPage,
    setCurrentPage,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataProvider;
