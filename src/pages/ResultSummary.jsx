import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { RaiseBtn, DecreaseBtn } from "../components/SortBtn";

const CheckBox = ({ value, name, dispatch_type, condition_type }) => {
  const { state, dispatch } = useContext(DataContext);

  return (
    <div className="check_id inline-block pr-2">
      <input
        id={value}
        value={value}
        type="checkbox"
        checked={state[condition_type][value]}
        onChange={(e) =>
          dispatch({
            type: dispatch_type,
            payload: { key: value, checked: e.target.checked },
          })
        }
      />
      <label className="pl-1" htmlFor={value}>
        {name}
      </label>
    </div>
  );
};

const ResultSummary = () => {
  return (
    <section className="resultSummary flex">
      <details>
        <summary className="cursor-pointer select-none">快速篩選</summary>
        <div className="flex flex-wrap gap-4">
          <div className="status-area border p-2">
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
          <div className="category-area border p-2">
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
          <div className="border p-2 flex gap-2">
            <RaiseBtn />
            <DecreaseBtn />
          </div>
        </div>
      </details>
    </section>
  );
};

export default ResultSummary;
