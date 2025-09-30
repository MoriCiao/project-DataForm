export type Product = {
  id: string;
  name: string;
  category: "" | "居家生活" | "文具用品" | "電子產品" | "運動用品" | "食品飲料";
  price: number;
  stock: number;
  brand: string;
  status: "" | "上架中" | "下架" | "缺貨中";
  createdAt: string | null;
  tags?: string;
};

export type Products = Product[];

export type status = "idle" | "loading" | "succeeded" | "failed";

export type DataFormState = {
  data: Products;
  status: status;
  error: string | null;
  filtered: Products;
  selected: Products;
  del_data: Products;
  newItem: Product;
  keyword: string;
  dateRange: {
    start: string;
    end: string;
  };
  selectAll: boolean;
  filter: boolean; // 判定目前是否正在過濾資料
  loading: boolean;
  addPage: boolean; // 是否開啟新增Item頁面
  delPage: boolean; // 是否開啟垃圾桶頁面
  revisePage: {
    // 是否開啟修改頁面
    isOpen: boolean;
    reviseItem: Product;
  };
  // 依照資料表格名稱做排列
  props_sort_condition: {
    No: boolean;
    ID: boolean;
    Name: boolean;
    Brand: boolean;
    Category: boolean;
    Stock: boolean;
  };
  conditions: {
    On_Sale: boolean; // 上架中
    Off_Sale: boolean; // 下架
    Out_of_Stock: boolean; // 缺貨
  };
  cate_Condition: {
    house: boolean;
    stationery: boolean;
    electronics: boolean;
    sporting_goods: boolean;
    food_and_beverage: boolean;
  };
  isVisible: {
    ID: boolean;
    Name: boolean;
    Brand: boolean;
    Category: boolean;
    Price: boolean;
    Date: boolean;
    Status: boolean;
    Stock: boolean;
    Tags: boolean;
  };
};
