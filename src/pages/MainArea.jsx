import React, { useContext, useState } from "react";
import SearchForm from "./SearchForm";
import ResultSummary from "./ResultSummary";
import DataTable from "./DataTable";
import { DataContext } from "../context/DataContext";

const MainArea = () => {
  const { state, dispatch } = useContext(DataContext);

  return (
    <section
      className={`MainArea border flex flex-col items-center p-4 mx-8 h-auto w-auto max-w-[90vw] overflow-overlay`}
    >
      <div className={`flex flex-col gap-4`}>
        <SearchForm />
        <ResultSummary />
      </div>
      <div className="mt-4">
        <DataTable />
      </div>
    </section>
  );
};

export default MainArea;
