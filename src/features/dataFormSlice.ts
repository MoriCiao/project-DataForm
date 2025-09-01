import { createSlice , createAsyncThunk , PayloadAction } from "@reduxjs/toolkit";
// "id":"P-10001","name":"家電商品1","category":"居家生活","price":2285,"stock":141,"status":"上架中","createdAt":"2024-07-17","brand":"Adidas","tags":["廚房","燈具"]}
const url = "/product_data_2000.json"
// API 資料仔入

type Product = {
    id: string;
    name: string;
    category: "居家生活" | "文具用品" | "電子產品" | "運動用品" | "食品飲料"
    price: number;
    stock: number;
    status: "上架中" | '下架' | "缺貨中"
    createdAt: string
    tag?: string[]
}

type Products = Product[]

type status = "idle" | "loading" | "succeeded" | "failed"

type DataFormState = {
    data : Products;
    status : status;
    error : string | null
}

const initialState :DataFormState = {
        data : [],
        status : "idle", 
        error: null
}


const fetchData = createAsyncThunk<Products, void, { rejectValue: string }>(
    "dataForm/fetchDataForm",    
    async(_, {rejectWithValue}) => {
        const res = await fetch(url)
        if(!res.ok) {
            const text = await res.text()
            console.log(text)
            return rejectWithValue("資料連結失敗 ," + text)
        }
        return res.json()
    }
)


// Slice 
const dataFormSlice = createSlice({
    name : "dataForm",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
    // pending
        .addCase(fetchData.pending, (state) => {
            state.status = "loading";
            state.error = null
        })
    // fulfiiled
        .addCase(fetchData.fulfilled, (state, action: PayloadAction<Products>)=>{
            state.status = "succeeded";
            state.data = action.payload
            
        })
    // rejected
        .addCase(fetchData.rejected, (state , action) => {
            state.status = "failed";
            state.error = action.payload  ?? action.error.message ?? "未知錯誤"
        })

    }
})


export default dataFormSlice.reducer