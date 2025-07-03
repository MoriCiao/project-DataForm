import React, { createContext, useEffect, useReducer, useState } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const initialData = {
    data: [],
    filtered: [],
    loading: false,
    conditions: {
      stock: false,
      status_On_Sale: false,
      status_Off_Sale: false,
      status_Out_of_Stock: false,
    },
  };

  //條件設定
  function dataReduce(state, action) {
    switch (action.type) {
      case "SET_DATA": {
        return { ...state, data: action.payload };
      }
      case "SET_LOADING": {
        return { ...state, loading: action.payload };
      }
      case "SEARCH_DATA": {
        const keyword = action.payload.toLowerCase();

        const filteredData = state.data.filter((item) => {
          const id = item.id?.toLowerCase() || "";
          const name = item.name?.toLowerCase() || "";
          const brand = item.brand?.toLowerCase() || "";
          const category = item.category?.toLowerCase() || "";
          const status = item.status?.toLowerCase() || "";
          // tags is Array ，須展開
          const tags = item.tags?.join(" ").toLowerCase() || "";

          return (
            id.includes(keyword) ||
            name.includes(keyword) ||
            brand.includes(keyword) ||
            category.includes(keyword) ||
            status.includes(keyword) ||
            tags.includes(keyword)
          );
        });
        return { ...state, filtered: filteredData };
      }
      case "DATE_SORT": {
        // 代處理
        // const selectedDate = new Date(action.payload);
        // const year = String(selectedDate.getFullYear());
        // const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        // const day = String(selectedDate.getDate()).padStart(2, "0");
        // console.log(year, month, day);
        // const selectedDateStr = `${year}-${month}-${day}`;
        // console.log(selectedDateStr);
        // const filteredData = [...state.data].filter((item) => {
        //   const itemString = item.createdAt;
        //   return itemString === selectedDateStr;
        // });
        // return { ...state, filtered: filteredData };
      }
      case "RAISE_SORT": {
        const raiseData = [...state.data].sort((a, b) => {
          return b.price - a.price;
        });
        return { ...state, filtered: raiseData };
      }
      case "DECREASE_SORT": {
        const decreaseData = [...state.data].sort((a, b) => {
          return a.price - b.price;
        });
        return { ...state, filtered: decreaseData };
      }

      case "CHECK_BOX": {
        const { key, checked } = action.payload;
        console.log(key, checked);
        if (key === "stock") {
          if (checked) {
            const filteredStock = state.data.filter((item) => item.stock > 0);
            return { ...state, filtered: filteredStock };
          } else {
            return { ...state, filtered: state.data };
          }
        }
        if (key === "status_On_Sale") {
          if (checked) {
            const filteredStatus = state.data.filter(
              (item) => item.status === "上架中"
            );
            return { ...state, filtered: filteredStatus };
          } else {
            return { ...state, filtered: state.data };
          }
        }
        if (key === "status_Off_Sale") {
          if (checked) {
            const filteredStatus = state.data.filter(
              (item) => item.status === "下架"
            );
            return { ...state, filtered: filteredStatus };
          } else {
            return { ...state, filtered: state.data };
          }
        }
        if (key === "status_Out_of_Stock") {
          if (checked) {
            const filteredStatus = state.data.filter(
              (item) => item.status === "缺貨中"
            );
            return { ...state, filtered: filteredStatus };
          } else {
            return { ...state, filtered: state.data };
          }
        }

        return { ...state };
      }

      case "ADD_DATA": {
        return { ...state };
      }
      case "DETELTE": {
        return { ...state };
      }
      default: {
        return state;
      }
    }
  }
  // 多條件處理
  const [state, dispatch] = useReducer(dataReduce, initialData);

  // 資料載入....
  const LoadingData = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await fetch("/product_data_2000.json");
      const jsonData = await res.json();
      dispatch({ type: "SET_DATA", payload: jsonData });
    } catch (error) {
      console.log(`Data Loading Fail ..., ${error} `);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    LoadingData();
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
