import React, { useContext } from "react";
import { easeInOut, motion } from "framer-motion";
import { DataContext } from "../context/DataContext";
import { RaiseBtn, DecreaseBtn } from "../components/SortBtn";

const CheckBox = ({ value, name, dispatch_type, condition_type }) => {
  const { state, dispatch } = useContext(DataContext);

  return (
    <div className="check_id text-center">
      <motion.input
        animate={{ scale: state[condition_type][value] ? 1.5 : 1.25 }}
        transition={{ duration: 0.3 }}
        id={value}
        value={value}
        type="checkbox"
        checked={state[condition_type][value]}
        className="scale-125 mr-2"
        onChange={(e) =>
          dispatch({
            type: dispatch_type,
            payload: { key: value, checked: e.target.checked },
          })
        }
      />
      <label className="" htmlFor={value}>
        {name}
      </label>
    </div>
  );
};

const ResultSummary = () => {
  return (
    <section className="resultSummary flex">
      <details className="w-full">
        <summary className="cursor-pointer select-none pb-2">快速篩選</summary>

        <div className="md:grid md:grid-cols-8 sm:grid gap-4">
          <div className="status-area border flex flex-wrap p-2 md:col-span-2 md:col-start-1 gap-2 justify-center items-center">
            <CheckBox
              value="On_Sale"
              name="上架中"
              condition_type="conditions"
              dispatch_type="TOGGLE_FILTER_CONDITION_STATUS"
            />
            <CheckBox
              value="Off_Sale"
              name="下架中"
              condition_type="conditions"
              dispatch_type="TOGGLE_FILTER_CONDITION_STATUS"
            />
            <CheckBox
              value="Out_of_Stock"
              name="缺貨中"
              condition_type="conditions"
              dispatch_type="TOGGLE_FILTER_CONDITION_STATUS"
            />
          </div>
          <div className="category-area xl:flex xl:flex-wrap border p-2 md:col-span-4 md:col-start-3 xl:gap-4 md:grid md:grid-cols-3 md:gap-2 sm:grid sm:grid-cols-3 justify-center items-center">
            <CheckBox
              value="house"
              name="居家生活"
              condition_type="cate_Condition"
              dispatch_type="TOGGLE_FILTER_CONDITION_CATEGORY"
            />
            <CheckBox
              value="stationery"
              name="文具用品"
              condition_type="cate_Condition"
              dispatch_type="TOGGLE_FILTER_CONDITION_CATEGORY"
            />
            <CheckBox
              value="electronics"
              name="電子產品"
              condition_type="cate_Condition"
              dispatch_type="TOGGLE_FILTER_CONDITION_CATEGORY"
            />
            <CheckBox
              value="sporting_goods"
              name="運動用品"
              condition_type="cate_Condition"
              dispatch_type="TOGGLE_FILTER_CONDITION_CATEGORY"
            />
            <CheckBox
              value="food_and_beverage"
              name="食品飲料"
              condition_type="cate_Condition"
              dispatch_type="TOGGLE_FILTER_CONDITION_CATEGORY"
            />
          </div>
          <div className="border p-2 xl:flex  xl:gap-2 md:flex md:gap-4 md:p-2 sm:gap-12 sm:grid sm:grid-cols-2 sm:p-6 md:col-span-5 md:col-start-7 gap-2 justify-center items-center">
            <RaiseBtn />
            <DecreaseBtn />
          </div>
        </div>
        <hr className="my-4 border-white/25" />
        <div className="xl:flex md:grid md:grid-cols-8 sm:grid sm:grid-cols-12 gap-2 items-center justify-center border py-2">
          <span className="px-2  sm:col-start-1 sm:col-span-2 sm:col-span-1 text-center text-[1.15rem]">
            Visible :
          </span>
          <div className="sm:col-start-3 sm:col-span-10 sm:grid sm:grid-cols-4 sm:col-start-2 xl:grid-cols-9 md:flex  justify-around sm:gap-4 md:gap-2 w-fit items-center  p-2">
            <CheckBox
              value="ID"
              name="ID"
              condition_type="isVisible"
              dispatch_type="COL_IS_VISIBLE"
            />
            <CheckBox
              value="Name"
              name="Name"
              condition_type="isVisible"
              dispatch_type="COL_IS_VISIBLE"
            />
            <CheckBox
              value="Brand"
              name="Brand"
              condition_type="isVisible"
              dispatch_type="COL_IS_VISIBLE"
            />
            <CheckBox
              value="Category"
              name="Category"
              condition_type="isVisible"
              dispatch_type="COL_IS_VISIBLE"
            />
            <CheckBox
              value="Price"
              name="Price"
              condition_type="isVisible"
              dispatch_type="COL_IS_VISIBLE"
            />
            <CheckBox
              value="Date"
              name="Date"
              condition_type="isVisible"
              dispatch_type="COL_IS_VISIBLE"
            />
            <CheckBox
              value="Status"
              name="Status"
              condition_type="isVisible"
              dispatch_type="COL_IS_VISIBLE"
            />
            <CheckBox
              value="Stock"
              name="Stock"
              condition_type="isVisible"
              dispatch_type="COL_IS_VISIBLE"
            />
            <CheckBox
              value="Tags"
              name="Tags"
              condition_type="isVisible"
              dispatch_type="COL_IS_VISIBLE"
            />
          </div>
        </div>
      </details>
    </section>
  );
};

export default ResultSummary;
