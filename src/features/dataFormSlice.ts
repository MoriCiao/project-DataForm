import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {Product, Products, status, DataFormState} from "./dataFormSliceType" 
// 延遲載入
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const url = "/project-DataForm/product_data_2000.json";

const initialState: DataFormState = {
  data: [],
  status: "idle",
  error: null,
  filtered: [],
  selected: [],
  del_data: [],
  newItem: {
    id: "",
    name: "",
    category: "",
    price: 0,
    createdAt: "",
    stock: 0,
    status: "",
    brand: "",
    tags: "",
  },
  keyword: "",
  dateRange: {
    start: "",
    end: "",
  },
  selectAll: false,
  // 判定目前抓取的資料是否為篩選的資料
  filter: false, // 判定目前是否正在過濾資料
  loading: false,

  addPage: false, // 是否開啟新增Item頁面
  delPage: false, // 是否開啟垃圾桶頁面
  revisePage: {
    // 是否開啟修改頁面
    isOpen: false,
    reviseItem: {
      id: "",
      name: "",
      brand: "",
      category: "",
      price: 0,
      createdAt: "",
      status: "",
      stock: 0,
      tags: "",
    },
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

export const fetchData = createAsyncThunk<
  Products,
  void,
  { rejectValue: string }
>("dataForm/fetchDataForm", async (_, { rejectWithValue }) => {
  try {
    await sleep(2000);
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      return rejectWithValue("資料連結失敗 ," + text);
    }
    return res.json();
  } catch (err) {
    return rejectWithValue("資料連結失敗");
  }
});
// Slice
const dataFormSlice = createSlice({
  name: "dataForm",
  initialState,
  reducers: {
    // 將AJAX 獲得的資料轉入進 store.data
    // "SET_DATA"
    setData(state, action) {
      return {
        ...state,
        data: action.payload,
        filtered: [],
        selected: [],
        del_data: [],
        addPage: false,
        delPage: false,
      };
    },
    // "SEARCH_DATA"
    searchFromKey(state, action) {
      // 時間篩選
      const startDate = state.dateRange.start
        ? new Date(state.dateRange.start)
        : "";
      const endDate = state.dateRange.end ? new Date(state.dateRange.end) : "";
      const PassStatus = Object.values(state.conditions).some(
        (item) => item === true,
      );
      // 目前是否為cate-Codition篩選情況
      const PassCategory = Object.values(state.cate_Condition).some(
        (item) => item === true,
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
          (state.cate_Condition.electronics && item.category === "電子產品") ||
          (state.cate_Condition.sporting_goods &&
            item.category === "運動用品") ||
          (state.cate_Condition.food_and_beverage &&
            item.category === "食品飲料");
        // ----------------------------------------------------
        // createdAt Sort
        const itemDate = new Date(item.createdAt as string);
        const afterStart = state.dateRange.start ? itemDate >= startDate : true;
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
    },
    searchFromDate(state, action) {
      // 取得目前開始及結束的日期
      const { start, end } = action.payload;
      // 目前是否為coditions篩選情況
      const PassStatus = Object.values(state.conditions).some(
        (item) => item === true,
      );
      // 目前是否為cate-Codition篩選情況
      const PassCategory = Object.values(state.cate_Condition).some(
        (item) => item === true,
      );
      // 目前是否為篩選
      const isFiltered = PassStatus || PassCategory || Boolean(start || end);
      // 將時間轉換為 Date物件比較
      const startDate: Date | undefined = start ? new Date(start) : undefined;
      const endDate: Date | undefined = end ? new Date(end) : undefined;
      const updateData = state.data.filter((item) => {
        const itemDate = new Date(item.createdAt as string);

        // 符合在兩個區間內的資料將其留下來
        const afterStart = startDate ? itemDate >= startDate : true;
        const beforeEnd = endDate ? itemDate <= endDate : true;
        // -----------------------------------------------------------------------------------------
        const STATUS_MAPPING = {
          "上架中": "On_Sale",
          "下架": "Off_Sale", 
          "缺貨中": "Out_of_Stock"
        } as const;
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
          (state.cate_Condition.electronics && item.category === "電子產品") ||
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
          beforeEnd &&
          PassCodition &&
          PassCate_Category
        );
      });

      return {
        ...state,
        filter: isFiltered,
        filtered: updateData,
        dateRange: { start, end },
      };
    },
    //  "PRICE_RAISE_SORT"
    priceSort(state, action) {
      const actionType = action.payload;
      const isFiltered = state.filter;
      const currentData: Products = isFiltered ? state.filtered : state.data;
      const sortData = [...currentData].sort((a, b) => {
        if (actionType === "UpToDown") {
          return b.price - a.price;
        } else if (actionType === "DownToUp") {
          return a.price - b.price;
        }
        return 0;
      });
      isFiltered ? (state.filtered = sortData) : (state.data = sortData);
    },
    // "PER_PROPS_SORT"

    perSort(state, action) {
      const { name, checked } = action.payload;
      const ToggleChecked = !checked;
      const PassStatus = Object.values(state.conditions).some(
        (v) => v === true,
      );
      const PassCategory = Object.values(state.cate_Condition).some(
        (v) => v === true,
      );
      // status 和 category 和  Date & keyword
      const isFiltered =
        PassStatus ||
        PassCategory ||
        Boolean(state.dateRange.start || state.dateRange.end) ||
        state.keyword.length !== 0;
      // 確定當前使用的資料
      const currentData = isFiltered ? state.filtered : state.data;

      let updateData;
      if (ToggleChecked) {
        updateData = currentData.sort((a, b) => {
              const id_a = a.id.slice(-5);
              const id_b = b.id.slice(-5);
             switch(name){
               case "ID": return id_b.localeCompare(id_a);
               case "Name": return b.name.localeCompare(a.name);
               case "Brand": return b.brand.localeCompare(a.brand);
               case "Category": return b.category.localeCompare(a.category);
               case "Stock": return b.stock - a.stock;
               case "Price": return b.price - a.price;
               default : return 0
          }
        });
      } else {
        updateData = currentData.sort((a, b) => {
            const id_a = a.id.slice(-5);
            const id_b = b.id.slice(-5);
            switch(name){
              case "ID": return id_a.localeCompare(id_b)
              case "Name": return a.name.localeCompare(b.name);
              case "Brand": return a.brand.localeCompare(b.brand);
              case "Category": return a.category.localeCompare(b.category);
              case "Stock": return a.stock - b.stock;
              case "Price": return a.price - b.price;
              default : return 0
            }
        })
      }
      isFiltered ? (state.filtered = updateData) : (state.data = updateData);
      state.props_sort_condition = {
        ...state.props_sort_condition,
        [name]: ToggleChecked,
      };
    },
    // Select All
    selectAllData(state, action) {
      state.selectAll = action.payload;
      state.selected = state.selectAll ? state.data : [];
    },
    selectSingleData(state, action) {
      const { item, checked } = action.payload;
      let updateData;
      if (checked) {
        updateData = [...state.selected, item];
      } else {
        updateData = state.selected.filter((i) => i.id !== item.id);
      }
      return {
        ...state,
        selected: updateData,
        selectAll: updateData.length === state.data.length,
      };
    },
    deletSelect(state, action) {
      const selectedData = action.payload.item;

      const selectedIds = selectedData.map((item: any) => item.id);
      // 保留刪除資料
      const deletedData = state.data.filter((item) =>
        selectedIds.includes(item.id),
      );
      // 選擇刪除資料為空的，直接返回 無動作
      if (deletedData.length === 0) return;
      // 更新刪除過後的資料
      const updatedData = state.data.filter(
        (item) => !selectedIds.includes(item.id),
      );
      return {
        ...state,
        data: updatedData,
        filtered: updatedData,
        del_data: [...state.del_data, ...deletedData],
        selected: [],
        // 將所有篩選重製
        keyword: "",
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
      };
    },
    addItem(state, action) {
      const { name, value } = action.payload;
      // tags 要轉變成 array
      state.newItem = {
        ...state.newItem,
        [name]: name === "tags" ? value.split(",").map((i :string) => i.trim()) : value,
      };
    },
    addData(state) {
      state.data = [...state.data, state.newItem];
      // 新增資料後，將新增頁面設為預設值
      state.newItem = {
        id: "",
        name: "",
        status: "",
        category: "",
        price: 0,
        createdAt: "",
        stock: 0,
        brand: "",
        tags: "",
      },
      // 關閉AddPage
      state.addPage = false;
    },
    undo(state, action) {
      const deletedData = action.payload;
      if (deletedData.length === 0) {
        return { ...state };
      } else {
        const updateData = state.data.concat(deletedData);
        state.data = updateData;
        state.del_data = [];
      }
    },
    confirmDeletData(state) {
      state.del_data = [];
    },
    // 修正頁面開闔
    toggleRevisePage(state, action) {
      const data = action.payload;
      state.revisePage = {
        isOpen: !state.revisePage.isOpen,
        reviseItem: data || {},
      };
    },
    // 確認修改
    confirmRevision(state, action) {
      const reviseData = action.payload;

      const targetIndex: number = state.data.findIndex(
        (item) => item.id === reviseData.id,
      );
      // 覆蓋資料，先拷貝一份總資料，將其對應的 index 用修改好的資料作覆蓋
      const newData = [...state.data];
      // 將修改後的資料傳回總 data
      newData[targetIndex] = reviseData;
      // -----------------------------------------
      const reset_conditions = {
        On_Sale: false,
        Off_Sale: false,
        Out_of_Stock: false,
      };
      const reset_cate_Condition = {
        house: false,
        stationery: false,
        electronics: false,
        sporting_goods: false,
        food_and_beverage: false,
      };

      state.filter = false;
      state.data = newData;
      state.keyword = "";
      state.dateRange = { start: "", end: "" };
      state.conditions = reset_conditions;
      state.cate_Condition = reset_cate_Condition;
      state.revisePage = {
        isOpen: false,
        reviseItem: {
          id: "",
          name: "",
          brand: "",
          category: "",
          price: 0,
          createdAt: "",
          status: "",
          stock: 0,
          tags: "",
        },
      };
    },
    // open AddPage
    toggleAddPage(state) {
      state.addPage = !state.addPage;
    },
    toggleTrash(state) {
      state.delPage = !state.delPage;
    },
    toggleFilterStatus(state, action) {
      // 進入快速篩選 1
      const { key, checked } = action.payload;
      const newConditions = {
        ...state.conditions,
        [key]: checked,
      };
      // 把快速篩選 category 刪除
      const unCheckCategory = {
        house: false,
        stationery: false,
        electronics: false,
        sporting_goods: false,
        food_and_beverage: false,
      };
      // createdAt
      const startDate = state.dateRange.start
        ? new Date(state.dateRange.start)
        : "";

      const endDate = state.dateRange.end ? new Date(state.dateRange.end) : "";

      const hasStatusFilter = Object.values(newConditions).some(
        (item) => item === true,
      );
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
        const itemDate = new Date(item.createdAt as string);
        const afterStart = state.dateRange.start ? itemDate >= startDate : true;
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
    },
    toggleFilterCategory(state, action) {
      // 進入快速篩選 2
      const { key, checked } = action.payload;
      const newCate_Condition = { ...state.cate_Condition, [key]: checked };

      // 把快速篩選 condition 刪除
      const unCheckStatus = {
        On_Sale: false, // 上架中
        Off_Sale: false, // 下架
        Out_of_Stock: false, // 缺貨
      };

      // createdAt
      const startDate = state.dateRange.start
        ? new Date(state.dateRange.start)
        : "";

      const endDate = state.dateRange.end ? new Date(state.dateRange.end) : "";

      const hasCategoryFilter = Object.values(newCate_Condition).some(Boolean);
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
          (newCate_Condition.sporting_goods && item.category === "運動用品") ||
          (newCate_Condition.food_and_beverage && item.category === "食品飲料");
        // -------------------DateBoolean--------------------
        const itemDate = new Date(item.createdAt as string);
        const afterStart = state.dateRange.start ? itemDate >= startDate : true;
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
    },
    toggleVisible(state, action) {
      // 先取得目前操作的欄位
      const { key, checked } = action.payload;
      return {
        ...state,
        isVisible: { ...state.isVisible, [key]: checked },
      };
    },
    exporToJson(state) {
      const blob = new Blob([JSON.stringify(state.data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "myData.json";
      link.click();
      URL.revokeObjectURL(url);
    },
    saveData(state) {
      localStorage.setItem("my_dataForm", JSON.stringify(state.data));
    },
  },
  extraReducers: (builder) => {
    builder
      // pending
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // fulfiiled
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<Products>) => {
          state.status = "succeeded";
          state.data = action.payload;
        },
      )
      // rejected
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "未知錯誤";
      });
  },
});

export const {
  setData,
  searchFromKey,
  searchFromDate,
  priceSort,
  perSort,
  selectAllData,
  selectSingleData,
  deletSelect,
  addItem,
  addData,
  undo,
  confirmDeletData,
  toggleRevisePage,
  confirmRevision,
  toggleAddPage,
  toggleTrash,
  toggleFilterStatus,
  toggleFilterCategory,
  toggleVisible,
  exporToJson,
  saveData,
} = dataFormSlice.actions;
export default dataFormSlice.reducer;
