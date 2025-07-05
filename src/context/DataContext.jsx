import js from "@eslint/js";
import { data } from "autoprefixer";
import React, { act, createContext, useEffect, useReducer } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const initialData = {
    data: [], // 全部資料
    filtered: [], // 篩選結果
    selected: [],
    del_data: [],
    // 判定目前抓取的資料是否為篩選的資料
    filter: false,
    loading: false,
    addPage: false,
    delPage: false,
    selectAll: false,
    dateRange: {
      start: "",
      end: "",
    },
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
    newItem: {
      id: "",
      name: "",
      category: "",
      price: "",
      createdAt: "",
      stock: "",
      brand: "",
      tags: "",
    },
  };

  //條件設定
  function dataReduce(state, action) {
    switch (action.type) {
      case "SET_DATA": {
        return {
          ...state,
          data: action.payload,
          filtered: [],
          selected: [],
          del_data: [],
          addPage: false,
          delPage: false,
        };
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
          Out_of_Stock: false, // 缺貨
        };

        const unCheckCategory = {
          ...state.cate_Condition,
          house: false,
          stationery: false,
          electronics: false,
          sporting_goods: false,
          food_and_beverage: false,
        };

        const keyword = action.payload.toLowerCase();
        // 判定是否進入篩選狀態
        const isFilter = keyword.length !== 0;
        // console.log(isFilter);

        const filtered = state.data.filter((item) => {
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
          filter: isFilter,
          filtered: filtered,
          conditions: unCheckConditions,
          cate_Condition: unCheckCategory,
        };
      }
      // 日期篩選
      case "DATE_SORT": {
        // const { start, end } = action.payload;
        // const isFiltered = Boolean(start || end);
        // const filtered = state.data.filter((item) => {
        //   const itemDate = new Date(item.createdAt);
        //   const startDate = start ? new Date(start) : "";
        //   const endDate = end ? new Date(end) : "";
        //   const afterStart = startDate ? itemDate >= startDate : true;
        //   const beforeEnd = endDate ? itemDate <= endDate : true;
        //   return afterStart && beforeEnd;
        // });
        // return {
        //   ...state,
        //   filter: isFiltered,
        //   filtered: filtered,
        //   dateRange: { start, end },
        // };
      }

      case "RAISE_SORT": {
        console.log("RAISE...");
        // console.log("state.filtered :", state.filtered.length);
        // console.log("state.data: ", state.data.length);
        const raiseData = (
          state.filter ? state.filtered : [...state.data]
        ).sort((a, b) => {
          return b.price - a.price;
        });
        return { ...state, filtered: raiseData };
      }
      case "DECREASE_SORT": {
        console.log("DECREASE");
        // console.log("state.filtered :", state.filtered.length);
        // console.log("state.data: ", state.data.length);
        const decreaseData = (
          state.filter ? state.filtered : [...state.data]
        ).sort((a, b) => {
          return a.price - b.price;
        });
        return { ...state, filtered: decreaseData };
      }
      // 上架中、下架、缺貨
      case "TOGGLE_FILTER_CONDITION_STATUS": {
        // 進入快速篩選 1
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

        const hasStatusFilter = Object.values(newConditions).some(Boolean);
        console.log(hasStatusFilter);
        //  cate_Condition 重製篩選的 category
        const hasCategoryFilter = false;

        const isFiltered = hasStatusFilter || hasCategoryFilter;

        const filtered = state.data.filter((item) => {
          const PassCategory =
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
          const PassStatus =
            (!newConditions.On_Sale &&
              !newConditions.Off_Sale &&
              !newConditions.Out_of_Stock) ||
            (newConditions.On_Sale && item.status === "上架中") ||
            (newConditions.Off_Sale && item.status === "下架") ||
            (newConditions.Out_of_Stock && item.status === "缺貨中");

          return PassStatus && PassCategory;
        });
        return {
          ...state,
          // 判定目前抓取的資料是否為篩選的資料
          filter: isFiltered,
          filtered: filtered,
          conditions: newConditions,
          cate_Condition: unCheckCategory,
        };
      }
      // Category Condition 篩選case
      case "TOGGLE_FILTER_CONDITION_CATEGORY": {
        // 進入快速篩選 2

        // 把快速篩選 condition 刪除

        const unCheckStatus = {
          ...state.conditions,
          On_Sale: false, // 上架中
          Off_Sale: false, // 下架
          Out_of_Stock: false, // 缺貨
        };

        const { key, checked } = action.payload;
        // console.log(action.payload);
        const newCate_Condition = { ...state.cate_Condition, [key]: checked };

        const hasCategoryFilter =
          Object.values(newCate_Condition).some(Boolean);
        // console.log(hasCategoryFilter);
        const hasStatusFilter = false;

        const isFilter = hasCategoryFilter || hasStatusFilter;

        const filtered = state.data.filter((item) => {
          const PassStatus =
            (!unCheckStatus.On_Sale &&
              !unCheckStatus.Off_Sale &&
              !unCheckStatus.Out_of_Stock) ||
            (unCheckStatus.On_Sale && item.status === "上架中") ||
            (unCheckStatus.Off_Sale && item.status === "下架") ||
            (unCheckStatus.Out_of_Stock && item.status === "缺貨中");
          // -----------------------------------------------------------

          const PassCategory =
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

          return PassStatus && PassCategory;
        });
        console.log(newCate_Condition);
        console.log(unCheckStatus);

        return {
          ...state,
          // 判定目前抓取的資料是否為篩選的資料
          filter: isFilter,
          filtered: filtered,
          conditions: unCheckStatus,
          cate_Condition: newCate_Condition,
        };
      }
      // 開啟新增頁面
      case "TOGGLE_ADD_PAGE": {
        console.log("ADD PAGE 開啟...");
        return { ...state, addPage: !state.addPage, delPage: false };
      }
      // 開啟垃圾桶
      case "TOGGLE_DEL_PAGE": {
        return { ...state, delPage: !state.delPage, addPage: false };
      }
      // 單筆資料選取
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
      // 刪除資料放進垃圾桶
      case "DEL_SELECTED": {
        const selectedData = action.payload.item; //iterable
        console.log(selectedData);
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
          filtered: updatedData,
          del_data: [...state.del_data, ...deletedData],
          selected: [],
        };
      }
      // 撤銷垃圾桶要刪除的資料回主資料
      case "UNDO_DEL_SELECTED": {
        const deletedData = state.del_data;

        if (deletedData.length === 0) {
          console.log("deletedData.length 長度為 0");
          console.log("總資料長度為:", state.data.length);
          return { ...state };
        } else {
          console.log("目前在垃圾桶裡的資料有", deletedData);
          const updateData = state.data.concat(deletedData);
          console.log(updateData.length);

          return { ...state, data: updateData, del_data: [] };
        }
      }
      // 刪除目前在垃圾桶裡的資料
      case "CURRENT_DEL_DATA": {
        console.log("Delete List 內資料已清除...");
        console.log(`目前總資料為 : ${state.data.length}`);
        return { ...state, del_data: [] };
      }
      // 輸入新增資料的細項
      case "ADD_NEW_ITEM": {
        const itemDetail = action.payload;
        const { name, value } = itemDetail;

        // console.log(name, value);

        // 因tags 要轉變成 array
        // name === "tags" ? value.split(",").map((i) => i.trim()) : value
        return {
          ...state,
          newItem: {
            ...state.newItem,
            [name]:
              name === "tags" ? value.split(",").map((i) => i.trim()) : value,
          },
        };
      }
      // 新增資料
      case "ADD_DATA": {
        console.log("新資料已加入至 DataBase ....");
        const updateData = state.newItem;
        console.log(updateData);

        return {
          ...state,
          data: [...state.data, updateData],
          // 新增資料後，將新增頁面重製
          newItem: {
            id: "",
            name: "",
            category: "",
            price: "",
            createdAt: "",
            stock: "",
            brand: "",
            tags: "",
          },
          // 關閉AddPage
          addPage: false,
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
