import React, { createContext, useState } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    title: "Notice Modal",
    text: "Default Notice",
  });
  const value = {
    currentPage,
    setCurrentPage,
    openModal,
    setOpenModal,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataProvider;
