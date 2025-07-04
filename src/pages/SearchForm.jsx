import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css"; // 例如 material_green 主題
import AddPage from "../components/AddPage";
import { button } from "framer-motion/client";

// 主要搜尋 id, name , category
const SearchForm = () => {
  const { state, dispatch } = useContext(DataContext);

  const AddBtn = () => {
    return (
      <button
        onClick={() => dispatch({ type: "OPEN_ADD_PAGE" })}
        type="button"
        className={`border px-2 rounded-sm text-white`}
      >
        Add
      </button>
    );
  };

  const DelBtn = () => {
    return (
      <button
        onClick={() =>
          dispatch({ type: "DEL_SELECTED", payload: { item: state.selected } })
        }
        type="button"
        className={`border px-2 rounded-sm text-white`}
      >
        Del
      </button>
    );
  };
  const SaveBtn = () => {
    const handleSave = () => {
      console.log("Data 以儲存至 LocalStorage....");
      console.log(state.data);
      localStorage.setItem("my_dataForm", JSON.stringify(state.data));
    };
    return (
      <button
        className={`border px-2 rounded-sm text-white`}
        onClick={handleSave}
      >
        Save
      </button>
    );
  };
  const ReLoadingBtn = () => {
    const handleReload = () => {
      dispatch({ type: "SET_LOADING", payload: true });
      // 嘗試模仿加載資料
      // console.log(JSON.parse(localStorage.getItem("my_dataForm")));
      setTimeout(async () => {
        try {
          const res = await fetch("/product_data_2000.json");
          const jsonData = await res.json();
          console.log(`目前抓取 ${jsonData.length} 筆資料..`);
          dispatch({ type: "SET_DATA", payload: jsonData });
          localStorage.setItem("my_dataForm", JSON.stringify(jsonData));
          // 查詢目前有多少種類的 category
          // const x = jsonData.reduce((acc, cur) => {
          //   acc[cur.category] = (acc[cur.category] || 0) + 1;
          //   return acc;
          // }, {});
          // console.log(x);
          /*
          居家生活: 407;
          文具用品: 397;
          運動用品: 403;
          電子產品: 386;
          食品飲料: 407;
          */
        } catch (error) {
          console.log(`Data Loading Fail ..., ${error} `);
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      }, 2000);
    };
    return (
      <button
        className={`border px-2 rounded-sm text-white`}
        onClick={handleReload}
      >
        ReloadData
      </button>
    );
  };
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
      <Flatpickr
        className="indent-[0.5rem]"
        placeholder="日期篩選"
        onChange={(selecctedDates) =>
          dispatch({ type: "DATE_SORT", payload: selecctedDates[0] })
        }
        options={{ dateForm: "Y-m-d" }}
      />
      <AddBtn />
      <DelBtn />
      <SaveBtn />
      <ReLoadingBtn />
      <RaiseBtn />
      <DecreaseBtn />
      {state.addPage && <AddPage />}
    </section>
  );
};

export default SearchForm;
