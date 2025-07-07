import React, { useContext } from "react";
import SearchForm from "./SearchForm";
import ResultSummary from "./ResultSummary";
import DataTable from "./DataTable";
import { DataContext } from "../context/DataContext";

const MainArea = () => {
  const { state, dispatch } = useContext(DataContext);
  return (
    <section
      className={`MainArea relative border flex flex-col items-center p-4 mx-8 h-auto w-full max-w-[90vw] overflow-overlay`}
    >
      <p className="md:hidden xl:block absolute top-[-2rem] left-[-2rem] p-2 bg-white/25 rounded-md text-center text-[1.2rem]">
        --目前是否為篩選資料
        <span className="text-orange-500 font-bold px-2">
          {state.filter ? "True" : "False"}
        </span>
        <br />, 使用的資料為{" "}
        <span className="text-orange-500 font-bold px-2">
          {state.filter ? "state.filtered" : "state.data"}
        </span>
        --
      </p>
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
