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
    <section className="searchForm-area flex flex-wrap gap-4 text-black w-full">
      <div className="flex gap-4 md:items-center md:justify-center">
        <input
          className="indent-[0.5rem] w-[10rem]"
          type="text"
          placeholder="Keyword ..."
          value={state.keyword}
          onChange={(e) => {
            dispatch({ type: "SEARCH_DATA", payload: e.target.value });
          }}
        />

        <input
          type="date"
          className="indent-[0.5rem] w-[10rem]"
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
          className="indent-[0.5rem] w-[10rem]"
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
      <div className="flex gap-4 md:items-center md:justify-center">
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
