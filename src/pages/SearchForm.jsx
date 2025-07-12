import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import AddPage from "../components/AddPage";
import DelPage from "../components/DelPage";
import RevisePage from "../components/RevisePage";

import {
  AddBtn,
  DelBtn,
  SaveBtn,
  ReLoadingBtn,
  ToDelPage,
  ExoportBtn,
} from "../components/SearchBtn";
// 主要搜尋 id, name , category
const SearchForm = () => {
  const { state, dispatch } = useContext(DataContext);
  // console.log(state.dateRange);
  // console.log(state.conditions);
  // console.log(state.cate_Condition);
  return (
    <section className="searchForm-area flex flex-wrap items-center justify-center sm:gap-8 text-black w-full">
      <div className="w-full md:flex md:gap-4 md:flex-row sm:items-center sm:justify-center  sm:grid sm:gap-4 ">
        <input
          className="indent-[0.5rem] w-[10rem] md:w-[12rem] md:h-[3rem] sm:w-[20rem] sm:h-[2rem]"
          type="text"
          placeholder="Keyword ..."
          value={state.keyword}
          onChange={(e) => {
            dispatch({ type: "SEARCH_DATA", payload: e.target.value });
          }}
        />

        <input
          type="date"
          className="indent-[0.5rem] w-[10rem] md:w-[12rem] md:h-[3rem] sm:w-[20rem] sm:h-[2.5rem]"
          value={state.dateRange.start || ""}
          onChange={(e) => {
            dispatch({
              type: "DATE_SORT",
              payload: {
                start: e.target.value,
                end: state.dateRange.end || "",
              },
            });
          }}
        />
        <input
          type="date"
          className="indent-[0.5rem] w-[10rem] md:w-[12rem] md:h-[3rem] sm:w-[20rem] sm:h-[2rem]"
          value={state.dateRange.end || ""}
          onChange={(e) => {
            dispatch({
              type: "DATE_SORT",
              payload: {
                end: e.target.value,
                start: state.dateRange.start || "",
              },
            });
          }}
        />
      </div>
      <div className="md:grid-cols-6 md:gap-4 sm:grid sm:grid-cols-3 sm:gap-8 sm:items-center sm:justify-between sm:w-auto">
        <AddBtn />
        <DelBtn />
        <SaveBtn />
        <ToDelPage />
        <ReLoadingBtn />
        <ExoportBtn />
      </div>

      {state.addPage && <AddPage />}
      {state.delPage && <DelPage />}
      {state.revisePage.isOpen && <RevisePage />}
    </section>
  );
};

export default SearchForm;
