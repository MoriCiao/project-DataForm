import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
const CheckBox = ({ value, name }) => {
  const { state, dispatch } = useContext(DataContext);

  return (
    <div className="check_id inline-block pr-2">
      <input
        id={value}
        value={value}
        type="checkbox"
        onChange={(e) =>
          dispatch({
            type: "CHECK_BOX",
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
    <section className="resultSummary flex flex-wrap gap-4">
      <CheckBox value="stock" name="庫存" />
      <CheckBox value="status_On_Sale" name="上架中" />
      <CheckBox value="status_Off_Sale" name="下架中" />
      <CheckBox value="status_Out_of_Stock" name="缺貨中" />
      <CheckBox value="tags" name="Tags" />
    </section>
  );
};

export default ResultSummary;
