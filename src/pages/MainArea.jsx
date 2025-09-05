import React, { useContext, useState } from "react";
import SearchForm from "./SearchForm";
import ResultSummary from "./ResultSummary";
import DataTable from "./DataTable";
import { DataContext } from "../context/DataContext";

const MainArea = () => {
  return (
    <>
      <div className={`flex flex-col gap-4 w-full`}>
        <SearchForm />
        <ResultSummary />
      </div>
      <div className="mt-4 w-full h-full">
        <DataTable />
      </div>
    </>
  );
};

export default MainArea;
