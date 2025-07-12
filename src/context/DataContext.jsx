import { scale, easeInOut } from "framer-motion";
import React, { createContext, useEffect, useReducer } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const initialData = {
    data: [], // 全部資料
    filtered: [], // 篩選結果
    selected: [], // 商品被 checked 後的暫存區
    del_data: [], // 商品被 Del 後的暫存區
    // 判定目前抓取的資料是否為篩選的資料
    filter: false, // 判定目前是否正在過濾資料
    loading: false,
    addPage: false, // 是否開啟新增Item頁面
    delPage: false, // 是否開啟垃圾桶頁面
    revisePage: {
      // 是否開啟修改頁面
      isOpen: false,
      reviseItem: {},
    },
    // 商品細項修改內容
    newDetail: {
      name: "",
      brand: "",
      status: "",
      category: "",
      price: "",
      createdAt: "",
      status: "",
      stock: "",
      tags: "",
    },
    selectAll: false,
    dateRange: {
      start: "",
      end: "",
    },
    // 依照資料表格名稱做排列
    props_sort_condition: {
      No: false,
      ID: false,
      Name: false,
      Brand: false,
      Category: false,
      Stock: false,
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
    keyword: "",
    // 新增商品進資料的暫存區
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
    isVisible: {
      ID: true,
      Name: true,
      Brand: true,
      Category: true,
      Price: true,
      Date: true,
      Status: true,
      Stock: true,
      Tags: true,
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
        // 時間篩選
        const startDate = state.dateRange.start
          ? new Date(state.dateRange.start)
          : null;
        const endDate = state.dateRange.end
          ? new Date(state.dateRange.end)
          : null;

        const PassStatus = Object.values(state.conditions).some(
          (item) => item === true
        );
        // 目前是否為cate-Codition篩選情況
        const PassCategory = Object.values(state.cate_Condition).some(
          (item) => item === true
        );

        const keyword = action.payload.toLowerCase();
        const keyBoolean = keyword.length !== 0;
        // 判定是否進入篩選狀態
        const isFiltered =
          Object.values(state.conditions).some((item) => item === true) ||
          Object.values(state.cate_Condition).some((item) => item === true) ||
          keyBoolean;

        // 篩選出與目前資料裡包含 keyword 的資料
        const filtered = state.data.filter((item) => {
          // ----------------------------------------------------
          const PassCodiitions =
            !PassStatus ||
            (state.conditions.On_Sale && item.status === "上架中") ||
            (state.conditions.Off_Sale && item.status === "下架") ||
            (state.conditions.Out_of_Stock && item.status === "缺貨中");
          // ----------------------------------------------------
          const PassCateCodition =
            !PassCategory ||
            (state.cate_Condition.house && item.category === "居家生活") ||
            (state.cate_Condition.stationery && item.category === "文具用品") ||
            (state.cate_Condition.electronics &&
              item.category === "電子產品") ||
            (state.cate_Condition.sporting_goods &&
              item.category === "運動用品") ||
            (state.cate_Condition.food_and_beverage &&
              item.category === "食品飲料");
          // ----------------------------------------------------
          // createdAt Sort
          const itemDate = new Date(item.createdAt);
          const afterStart = state.dateRange.start
            ? itemDate >= startDate
            : true;
          const beforeEnd = state.dateRange.end ? itemDate <= endDate : true;
          // ------------------keyWordBoolean---------------------
          const id = item.id?.toLowerCase() || "";
          const name = item.name?.toLowerCase() || "";
          const brand = item.brand?.toLowerCase() || "";
          const category = item.category?.toLowerCase() || "";
          const status = item.status?.toLowerCase() || "";
          const tags = item.tags || "";

          const keyWordBoolean =
            id.includes(keyword) ||
            name.includes(keyword) ||
            brand.includes(keyword) ||
            category.includes(keyword) ||
            status.includes(keyword) ||
            tags.includes(keyword);
          return (
            keyWordBoolean &&
            PassCodiitions &&
            PassCateCodition &&
            afterStart &&
            beforeEnd
          );
        });
        return {
          ...state,
          filter: isFiltered,
          filtered: filtered,
          keyword: keyword,
        };
      }
      // 日期篩選
      case "DATE_SORT": {
        // 取得目前開始及結束的日期
        const { start, end } = action.payload;
        // 目前是否為coditions篩選情況
        const PassStatus = Object.values(state.conditions).some(
          (item) => item === true
        );
        // 目前是否為cate-Codition篩選情況
        const PassCategory = Object.values(state.cate_Condition).some(
          (item) => item === true
        );

        // 目前是否為篩選
        const isFiltered = PassStatus || PassCategory || Boolean(start || end);
        // 將時間轉換為 Date物件比較
        const startDate = start ? new Date(start) : null;
        const endDate = end ? new Date(end) : null;

        const updateData = state.data.filter((item) => {
          const itemDate = new Date(item.createdAt);
          // 符合在兩個區間內的資料將其留下來
          const afterStart = start ? itemDate >= startDate : true;
          const beforeEnd = end ? itemDate <= endDate : true;
          // -----------------------------------------------------------------------------------------
          const PassCodition =
            !PassStatus ||
            (state.conditions.On_Sale && item.status === "上架中") ||
            (state.conditions.Off_Sale && item.status === "下架") ||
            (state.conditions.Out_of_Stock && item.status === "缺貨中");
          // -----------------------------------------------------------------------------------------

          const PassCate_Category =
            !PassCategory ||
            (state.cate_Condition.house && item.category === "居家生活") ||
            (state.cate_Condition.stationery && item.category === "文具用品") ||
            (state.cate_Condition.electronics &&
              item.category === "電子產品") ||
            (state.cate_Condition.sporting_goods &&
              item.category === "運動用品") ||
            (state.cate_Condition.food_and_beverage &&
              item.category === "食品飲料");

          // ------------------keyWordBoolean---------------------
          const id = item.id?.toLowerCase() || "";
          const name = item.name?.toLowerCase() || "";
          const brand = item.brand?.toLowerCase() || "";
          const category = item.category?.toLowerCase() || "";
          const status = item.status?.toLowerCase() || "";
          const tags = item.tags || "";

          const keyWordBoolean =
            id.includes(state.keyword) ||
            name.includes(state.keyword) ||
            brand.includes(state.keyword) ||
            category.includes(state.keyword) ||
            status.includes(state.keyword) ||
            tags.includes(state.keyword);

          return (
            keyWordBoolean &&
            afterStart &&
            beforeEnd & PassCodition & PassCate_Category
          );
        });

        return {
          ...state,
          filter: isFiltered,
          filtered: updateData,
          dateRange: { start, end },
        };
      }
      // 依價格去排列
      case "PRICE_RAISE_SORT": {
        // console.log("RAISE...");
        const isFiltered = state.filter;
        // console.log(isFiltered);
        const currentData = isFiltered ? state.filtered : state.data;
        const raiseData = currentData.sort((a, b) => {
          return b.price - a.price;
        });
        return {
          ...state,
          ...(isFiltered ? { filtered: raiseData } : { data: raiseData }),
        };
      }
      case "PRICE_DECREASE_SORT": {
        // console.log("DECREASE");

        const isFiltered = state.filter;
        // console.log(isFiltered);
        const currentData = isFiltered ? state.filtered : state.data;
        const decreaseData = currentData.sort((a, b) => {
          return a.price - b.price;
        });
        return {
          ...state,
          ...(isFiltered ? { filtered: decreaseData } : { data: decreaseData }),
        };
      }
      // 依選擇的屬性去排列
      case "PER_PROPS_SORT": {
        const { name, checked } = action.payload;
        const ToggleChecked = !checked;
        // console.log("目前選取的 PropsName is ", name, checked);

        const PassStatus = Object.values(state.conditions).some(
          (v) => v === true
        );

        const PassCategory = Object.values(state.cate_Condition).some(
          (v) => v === true
        );

        // 需要判定目前是否有在篩選
        // status 和 category 和  Date & keyword
        const isFiltered =
          PassStatus ||
          PassCategory ||
          Boolean(state.dateRange.start || state.dateRange.end) ||
          state.keyword.length !== 0;
        // console.log(isFiltered);
        // 確定當前使用的資料
        const currentData = isFiltered ? state.filtered : state.data;

        let updateData;

        if (ToggleChecked) {
          // console.log(name, "大到小 篩選中...");
          updateData = currentData.sort((a, b) => {
            const id_a = a.id.slice(-5);
            const id_b = b.id.slice(-5);
            if (name === "ID") {
              // props_sort_condition : ID
              return id_b - id_a;
            } else if (name === "Name") {
              //  props_sort_condition : Name
              return b.name.localeCompare(a.name);
            } else if (name === "Brand") {
              //  props_sort_condition : Brand
              return b.brand.localeCompare(a.brand);
            } else if (name === "Category") {
              // props_sort_condition : Category
              return b.category.localeCompare(a.category);
            } else if (name === "Stock") {
              //  props_sort_condition : Stock
              return b.stock - a.stock;
            } else if (name === "Price") {
              return b.price - a.price;
            }
            // 都沒相符條件則順序不變
            return 0;
          });
        } else {
          // console.log(name, "小到大 篩選中...");
          updateData = currentData.sort((a, b) => {
            const id_a = a.id.slice(-5);
            const id_b = b.id.slice(-5);
            if (name === "ID") {
              // props_sort_condition : ID
              return id_a - id_b;
            } else if (name === "Name") {
              //  props_sort_condition : Name
              return a.name.localeCompare(b.name);
            } else if (name === "Brand") {
              //  props_sort_condition : Brand
              return a.brand.localeCompare(b.brand);
            } else if (name === "Category") {
              // props_sort_condition : Category
              return a.category.localeCompare(b.category);
            } else if (name === "Stock") {
              //  props_sort_condition : Stock
              return a.stock - b.stock;
            } else if (name === "Price") {
              return a.price - b.price;
            }
          });
        }
        // console.log(state.props_sort_condition);
        // console.log("isFiltered : ", isFiltered);
        return {
          ...state,
          ...(isFiltered ? { filtered: updateData } : { data: updateData }),
          props_sort_condition: {
            ...state.props_sort_condition,
            [name]: ToggleChecked,
          },
        };
      }
      // 上架中、下架、缺貨
      case "TOGGLE_FILTER_CONDITION_STATUS": {
        // 進入快速篩選 1
        const { key, checked } = action.payload;
        // console.log(action.payload);
        const newConditions = {
          ...state.conditions,
          [key]: checked,
        };
        // 把快速篩選 category 刪除
        const unCheckCategory = {
          ...state.cate_Condition,
          house: false,
          stationery: false,
          electronics: false,
          sporting_goods: false,
          food_and_beverage: false,
        };
        // createdAt
        const startDate = state.dateRange.start
          ? new Date(state.dateRange.start)
          : null;

        const endDate = state.dateRange.end
          ? new Date(state.dateRange.end)
          : null;

        const hasStatusFilter = Object.values(newConditions).some(
          (item) => item === true
        );
        // console.log(hasStatusFilter);
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
          //  ---------------------------------------------------------
          // createdAT Sort
          const itemDate = new Date(item.createdAt);
          const afterStart = state.dateRange.start
            ? itemDate >= startDate
            : true;
          const beforeEnd = state.dateRange.end ? itemDate <= endDate : true;

          // ------------------keyWordBoolean---------------------
          const id = item.id?.toLowerCase() || "";
          const name = item.name?.toLowerCase() || "";
          const brand = item.brand?.toLowerCase() || "";
          const category = item.category?.toLowerCase() || "";
          const status = item.status?.toLowerCase() || "";
          const tags = item.tags || "";

          const keyWordBoolean =
            id.includes(state.keyword) ||
            name.includes(state.keyword) ||
            brand.includes(state.keyword) ||
            category.includes(state.keyword) ||
            status.includes(state.keyword) ||
            tags.includes(state.keyword);

          return (
            PassStatus &&
            PassCategory &&
            afterStart &&
            beforeEnd &&
            keyWordBoolean
          );
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
      // Category Condition 篩選
      case "TOGGLE_FILTER_CONDITION_CATEGORY": {
        // 進入快速篩選 2
        const { key, checked } = action.payload;
        // console.log(action.payload);
        const newCate_Condition = { ...state.cate_Condition, [key]: checked };

        // 把快速篩選 condition 刪除
        const unCheckStatus = {
          ...state.conditions,
          On_Sale: false, // 上架中
          Off_Sale: false, // 下架
          Out_of_Stock: false, // 缺貨
        };

        // createdAt
        const startDate = state.dateRange.start
          ? new Date(state.dateRange.start)
          : null;

        const endDate = state.dateRange.end
          ? new Date(state.dateRange.end)
          : null;

        const hasCategoryFilter =
          Object.values(newCate_Condition).some(Boolean);
        // console.log(hasCategoryFilter);
        const hasStatusFilter = false;

        const isFilter = hasCategoryFilter || hasStatusFilter;

        const filtered = state.data.filter((item) => {
          // ---------------PassStatus--------------------------
          const PassStatus =
            (!unCheckStatus.On_Sale &&
              !unCheckStatus.Off_Sale &&
              !unCheckStatus.Out_of_Stock) ||
            (unCheckStatus.On_Sale && item.status === "上架中") ||
            (unCheckStatus.Off_Sale && item.status === "下架") ||
            (unCheckStatus.Out_of_Stock && item.status === "缺貨中");
          // ---------------PassCategory--------------------------
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
          // -------------------DateBoolean--------------------
          const itemDate = new Date(item.createdAt);
          const afterStart = state.dateRange.start
            ? itemDate >= startDate
            : true;
          const beforeEnd = state.dateRange.end ? itemDate <= endDate : true;
          // ------------------keyWordBoolean---------------------
          const id = item.id?.toLowerCase() || "";
          const name = item.name?.toLowerCase() || "";
          const brand = item.brand?.toLowerCase() || "";
          const category = item.category?.toLowerCase() || "";
          const status = item.status?.toLowerCase() || "";
          const tags = item.tags || "";

          const keyWordBoolean =
            id.includes(state.keyword) ||
            name.includes(state.keyword) ||
            brand.includes(state.keyword) ||
            category.includes(state.keyword) ||
            status.includes(state.keyword) ||
            tags.includes(state.keyword);

          return (
            PassStatus &&
            PassCategory &&
            afterStart &&
            beforeEnd &&
            keyWordBoolean
          );
        });

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
        // console.log("ADD PAGE 開啟...");
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
          // 把 checked 商品加進 selected 裡
          updata = [...state.selected, item];
        } else {
          // 當單一商品取消checjed 時，把資料從 selected 刪除...
          updata = state.selected.filter((i) => i.id !== item.id);
        }
        return {
          ...state,
          selected: updata,
          // 當所選取的資料與data 一樣時 selectAll 才是　true
          selectAll: updata.length === state.data.length,
        };
      }
      // 選擇所有資料
      case "SELECT_ALL": {
        const checked = action.payload;

        return {
          ...state,
          selected: checked ? [...state.data] : [],
          selectAll: checked,
        };
      }
      // 將選取的資料放進垃圾桶
      case "DEL_SELECTED": {
        const selectedData = action.payload.item; //iterable
        // console.log(selectedData);
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
        const deletedData = action.payload.item;

        if (deletedData.length === 0) {
          console.log("deletedData.length 長度為 0");
          console.log("總資料長度為:", state.data.length);
          return { ...state };
        } else {
          console.log("目前在垃圾桶裡的資料有", deletedData);
          const updateData = state.data.concat(deletedData);
          // console.log(updateData.length);

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
        // 判定目前新增資料內容是否有空白的
        const hasEmptyData = Object.values(state.newItem).some((v) => v === "");
        if (hasEmptyData) {
          alert("新增資料失敗....，您輸入資料內容有空值，請從新增資料。");
        }

        return {
          ...state,
          data: hasEmptyData ? state.data : [...state.data, updateData],
          // 新增資料後，將新增頁面重製
          newItem: {
            id: "",
            name: "",
            status: "",
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
      // 隱藏欄
      case "COL_IS_VISIBLE": {
        // 先取得目前操作的欄位
        const { key, checked } = action.payload;
        return {
          ...state,
          // 對 對應的 isVisible的key 做boolean值得變換
          isVisible: { ...state.isVisible, [key]: checked },
        };
      }
      // 開啟修改頁面
      case "TOGGLE_REVISE_PAGE": {
        // 開啟 修正PAGE，當前的商品資料帶入進來
        const data = action.payload;

        console.log("REVISE_ITEM_PAGE");

        return {
          ...state,
          revisePage: {
            isOpen: !state.revisePage.isOpen,
            reviseItem: data || {},
          },
        };
      }
      // 修改資料
      case "NEW_DETAIL": {
        console.log(action.payload);
        // 之後修改時對應相應的 id 做修正
        const original = state.revisePage?.reviseItem || {};
        const payload = action.payload;

        // 自動根據 payload 欄位，選擇要保留原本值或新值
        const updatedFields = Object.fromEntries(
          Object.entries(payload).map(([key, value]) => [
            key,
            value.trim?.() === "" ? original[key] : value,
          ])
        );

        return {
          ...state,
          newDetail: {
            ...state.newDetail,
            id: original.id, // 保留原始 ID
            ...updatedFields,
          },
        };
      }
      // 將修改的資料內容返還給data
      case "CONFIRM_OF_REVISION": {
        // 目前已填寫的 newDetail 帶入
        const newDetail = state.newDetail;
        console.log(newDetail);
        // 先找到對應的 index
        const targetIndex = state.data.findIndex(
          (item) => item.id === newDetail.id
        );
        // console.log(targetIndex);
        // 獲取總資料裡對應的 index
        const originalData = state.data[targetIndex];
        // console.log(originalData);

        // 更新資料， 如果newDetail裡有未填寫 空白等資料，則會用原本資料裡對應的值
        const update = Object.fromEntries(
          Object.entries(originalData).map(([key, value]) => [
            key,
            newDetail[key]?.toString().trim() !== "" ? newDetail[key] : value,
          ])
        );
        // console.log(update);
        // 覆蓋資料，先拷貝一份總資料，將其對應的 index 用修改好的資料作覆蓋
        const newData = [...state.data];
        newData[targetIndex] = update;

        // -----------------------------------------
        const reset_conditions = {
          ...state.conditions,
          On_Sale: false,
          Off_Sale: false,
          Out_of_Stock: false,
        };
        const reset_cate_Condition = {
          ...state.cate_Condition,
          house: false,
          stationery: false,
          electronics: false,
          sporting_goods: false,
          food_and_beverage: false,
        };

        alert("資料已更新....請重新查詢確認...");
        return {
          ...state,
          filter: false,
          data: newData,
          keyword: "",
          dateRange: { start: "", end: "" },
          conditions: reset_conditions,
          cate_Condition: reset_cate_Condition,

          // 修改資料送出後，將頁面關閉及清空
          newDetail: {
            name: "",
            brand: "",
            category: "",
            price: "",
            createdAt: "",
            status: "",
            stock: "",
            tags: "",
          },
          revisePage: { isOpen: false, reviseItem: {} },
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
          const res = await fetch("/project-DataForm/product_data_2000.json");
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
