import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css"; // 例如 material_green 主題

const SearchBtn = () => {
  const { state, dispatch } = useContext(DataContext);

  return (
    <button
      type="button"
      className={`border border-white px-2 rounded-full text-white`}
    >
      Search
    </button>
  );
};

// 主要搜尋 id, name , category
const SearchForm = () => {
  const { dispatch } = useContext(DataContext);
  const RaiseBtn = () => {
    return (
      <button
        type="button"
        className={`border px-2 rounded-sm text-white`}
        onClick={() => dispatch({ type: "RAISE_SORT" })}
      >
        Price🔼
      </button>
    );
  };
  const DecreaseBtn = () => {
    return (
      <button
        type="button"
        className={`border px-2 rounded-sm text-white`}
        onClick={() => dispatch({ type: "DECREASE_SORT" })}
      >
        Price🔽
      </button>
    );
  };

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
      <select name="" id="" className="w-[10rem] text-black">
        <option value="all">ALL</option>
        <option value="name">Name</option>
        <option value="categroy">Categroy</option>
        <option value="price">Price</option>
        <option value="brand">Brand</option>
      </select>

      <Flatpickr
        className="indent-[0.5rem]"
        placeholder="日期篩選"
        onChange={(selecctedDates) =>
          dispatch({ type: "DATE_SORT", payload: selecctedDates[0] })
        }
        options={{ dateForm: "Y-m-d" }}
      />
      <RaiseBtn />
      <DecreaseBtn />
      {/* <SearchBtn /> */}
    </section>
  );
};

export default SearchForm;
