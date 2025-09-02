import React, { useContext, useState } from "react";
import SearchForm from "./SearchForm";
import ResultSummary from "./ResultSummary";
import DataTable from "./DataTable";
import { DataContext } from "../context/DataContext";

const MainArea = () => {
  return (
    <section
      className={`MainArea  flex flex-col items-center px-8 pt-4 mb-4 mx-8 h-auto w-auto max-w-[90vw]  overflow-overlay`}
    >
      <div className={`flex flex-col gap-4 w-full`}>
        <SearchForm />
        <ResultSummary />
      </div>
      <div className="mt-4 w-full h-full">
        <DataTable />
      </div>
    </section>
  );
};

export default MainArea;
