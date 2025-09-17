import React, { useContext, useState } from "react";
import SearchForm from "./SearchForm";
import ResultSummary from "./ResultSummary";
import DataTable from "./DataTable";
import { DataContext } from "../context/DataContext";
import NoticeModal from "../components/Notice/NoticeModal";

const MainArea = () => {
  const { openModal, setOpenModal } = useContext(DataContext);
  return (
    <>
      <div className={`flex w-full flex-col gap-4`}>
        <SearchForm />
        <ResultSummary />
      </div>
      <div className="mt-4 h-full w-full">
        {openModal.isOpen && <NoticeModal />}
        <DataTable />
      </div>
    </>
  );
};

export default MainArea;
