import React from "react";
import SearchForm from "./SearchForm";
import ResultSummary from "./ResultSummary";

import DataTable from "./DataTable";
import Pagination from "../components/Pagination";
const MainArea = () => {
  return (
    <section
      className={`MainArea relative border flex flex-col items-center p-4 h-[90vh] w-[80vw]`}
    >
      <div className={`flex flex-col gap-4`}>
        <SearchForm />
        <ResultSummary />
      </div>
      <div>
        <DataTable />
        <Pagination />
      </div>
    </section>
  );
};

export default MainArea;
