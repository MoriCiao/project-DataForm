import js from "@eslint/js";
import React, { act, createContext, useEffect, useReducer } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const initialData = {
    data: [], // 全部資料
    filtered: [], // 篩選結果
    selected: [],
    del_data: [],
    loading: false,
    addPage: false,
    selectAll: false,
    conditions: {
      On_Sale: false, // 上架中
      Off_Sale: false, // 下架
      Out_of_Stock: false, // 缺貨
    },
    cate_Condition: {
      house: false,
      stationery: false,
      electronics: false,
      sporting_goods: false,
      food_and_beverage: false,
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
      // Keywords 區域
      case "SEARCH_DATA": {
        // -------------取消所有快速篩選------------------
        const unCheckConditions = {
          ...state.conditions,
          On_Sale: false, // 上架中
          Off_Sale: false, // 下架
          Out_of_Stock: false,
        }; // 缺貨

        const unCheckCategory = {
          ...state.cate_Condition,
          house: false,
          stationery: false,
          electronics: false,
          sporting_goods: false,
          food_and_beverage: false,
        };

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
        return {
          ...state,
          filtered: filteredData,
          conditions: unCheckConditions,
          cate_Condition: unCheckCategory,
        };
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
        const raiseData = (state.filtered || [...state.data]).sort((a, b) => {
          return b.price - a.price;
        });
        return { ...state, filtered: raiseData };
      }
      case "DECREASE_SORT": {
        const decreaseData = (state.filtered || [...state.data]).sort(
          (a, b) => {
            return a.price - b.price;
          }
        );
        return { ...state, filtered: decreaseData };
      }
      // 上架中、下架、缺貨
      case "TOGGLE_FILTER_CONDITION_STATUS": {
        // 把快速篩選 category 刪除
        const unCheckCategory = {
          ...state.cate_Condition,
          house: false,
          stationery: false,
          electronics: false,
          sporting_goods: false,
          food_and_beverage: false,
        };

        const { key, checked } = action.payload;
        console.log(action.payload);
        const newConditions = {
          ...state.conditions,
          [key]: checked,
        };

        const filtered = state.data.filter((item) => {
          const passCategory =
            (!unCheckCategory.house &&
              !unCheckCategory.stationery &&
              !unCheckCategory.electronics &&
              !unCheckCategory.sporting_goods &&
              !unCheckCategory.food_and_beverage) ||
            (unCheckCategory.house && item.category === "居家生活") ||
            (unCheckCategory.stationery && item.category === "文具用品") ||
            (unCheckCategory.electronics && item.category === "電子產品") ||
            (unCheckCategory.sporting_goods && item.category === "運動用品") ||
            (unCheckCategory.food_and_beverage && item.category === "食品飲料");

          // ----------------------------------------------------------
          const passStatus =
            (!newConditions.On_Sale &&
              !newConditions.Off_Sale &&
              !newConditions.Out_of_Stock) ||
            (newConditions.On_Sale && item.status === "上架中") ||
            (newConditions.Off_Sale && item.status === "下架") ||
            (newConditions.Out_of_Stock && item.status === "缺貨中");

          return passStatus && passCategory;
        });
        return {
          ...state,
          filtered: filtered,
          conditions: newConditions,
          cate_Condition: unCheckCategory,
        };
      }
      // Category Condition 篩選case
      case "TOGGLE_FILTER_CONDITION_CATEGORY": {
        // 把快速篩選 condition 刪除
        const unCheckStatus = {
          ...state.conditions,
          On_Sale: false, // 上架中
          Off_Sale: false, // 下架
          Out_of_Stock: false, // 缺貨
        };

        const { key, checked } = action.payload;
        console.log(action.payload);
        const newCate_Condition = { ...state.cate_Condition, [key]: checked };

        const filtered = state.data.filter((item) => {
          const passStatus =
            (!unCheckStatus.On_Sale &&
              !unCheckStatus.Off_Sale &&
              !unCheckStatus.Out_of_Stock) ||
            (unCheckStatus.On_Sale && item.status === "上架中") ||
            (unCheckStatus.Off_Sale && item.status === "下架") ||
            (unCheckStatus.Out_of_Stock && item.status === "缺貨中");
          // -----------------------------------------------------------

          const passCategory =
            (!newCate_Condition.house &&
              !newCate_Condition.stationery &&
              !newCate_Condition.electronics &&
              !newCate_Condition.sporting_goods &&
              !newCate_Condition.food_and_beverage) ||
            (newCate_Condition.house && item.category === "居家生活") ||
            (newCate_Condition.stationery && item.category === "文具用品") ||
            (newCate_Condition.electronics && item.category === "電子產品") ||
            (newCate_Condition.sporting_goods &&
              item.category === "運動用品") ||
            (newCate_Condition.food_and_beverage &&
              item.category === "食品飲料");

          return passStatus && passCategory;
        });
        console.log(newCate_Condition);
        console.log(unCheckStatus);
        return {
          ...state,
          filtered: filtered,
          conditions: unCheckStatus,
          cate_Condition: newCate_Condition,
        };
      }

      case "OPEN_ADD_PAGE": {
        return { ...state, addPage: true };
      }
      case "CLOSE_ADD_PAGE": {
        return { ...state, addPage: false };
      }
      case "SELECT_SINGLE": {
        const { item, checked } = action.payload;
        let updata;
        if (checked) {
          updata = [...state.selected, item];
        } else {
          updata = state.selected.filter((i) => i.id !== item.id);
        }
        return { ...state, selected: updata };
      }
      case "SELECT_ALL": {
        console.log(state.selectAll);

        return { ...state, selectAll: !state.selectAll };
      }

      case "DEL_SELECTED": {
        const selectedData = action.payload.item; //iterable
        const selectedIds = selectedData.map((item) => item.id);
        // 保留刪除資料
        const deletedData = state.data.filter((item) =>
          selectedIds.includes(item.id)
        );
        // 更新刪除過後的資料
        const updatedData = state.data.filter(
          (item) => !selectedIds.includes(item.id)
        );
        return {
          ...state,
          data: updatedData,
          del_data: [...state.del_data, ...deletedData],
          selected: [],
        };
      }
      default: {
        return state;
      }
    }
  }
  // 多條件處理
  const [state, dispatch] = useReducer(dataReduce, initialData);

  // 資料載入....
  const LoadingData = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    // 嘗試模仿加載資料
    // console.log(JSON.parse(localStorage.getItem("my_dataForm")));
    setTimeout(async () => {
      try {
        const localData = localStorage.getItem("my_dataForm");
        // console.log(typeof JSON.parse(localData)); // str
        if (localData) {
          const jsonData = JSON.parse(localData);
          dispatch({ type: "SET_DATA", payload: jsonData });
        } else {
          console.log("抓取資料...");
          const res = await fetch("/product_data_2000.json");
          const jsonData = await res.json();

          dispatch({ type: "SET_DATA", payload: jsonData });
          localStorage.setItem("my_dataForm", JSON.stringify(jsonData));
        }
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
