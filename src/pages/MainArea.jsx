import React from "react";
import SearchForm from "./SearchForm";
import ResultSummary from "./ResultSummary";
import DataTable from "./DataTable";

const MainArea = () => {
  return (
    <section
      className={`MainArea relative border flex flex-col items-center p-4 mx-8 h-auto w-full max-w-[90vw] overflow-overlay`}
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
