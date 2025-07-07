import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css"; // 例如 material_green 主題
import AddPage from "../components/AddPage";
import DelPage from "../components/DelPage";
import {
  AddBtn,
  DelBtn,
  SaveBtn,
  ReLoadingBtn,
  ToDelPage,
} from "../components/SearchBtn";
// 主要搜尋 id, name , category
const SearchForm = () => {
  const { state, dispatch } = useContext(DataContext);

  // console.log(state.conditions);
  // console.log(state.cate_Condition);
  return (
    <section className="searchForm-area flex gap-4 text-black w-full">
      <input
        className="indent-[0.5rem] w-[10rem]"
        type="text"
        placeholder="Keyword ..."
        onChange={(e) => {
          dispatch({ type: "SEARCH_DATA", payload: e.target.value });
        }}
      />

      <input
        type="date"
        className="indent-[0.5rem] w-[10rem]"
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
      <AddBtn />
      <DelBtn />
      <SaveBtn />
      <ToDelPage />
      <ReLoadingBtn />
      {state.addPage && <AddPage />}
      {state.delPage && <DelPage />}
    </section>
  );
};

export default SearchForm;
