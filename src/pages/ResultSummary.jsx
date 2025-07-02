import React from "react";

const CheckBox = ({ parameter, name }) => {
  return (
    <div className="check_id inline-block pr-2 ">
      <input id={parameter} value={parameter} type="checkbox" />
      <label className="pl-1" htmlFor={parameter}>
        {name}
      </label>
    </div>
  );
};

const ResultSummary = () => {
  return (
    <section className="resultSummary flex flex-wrap gap-4">
      <CheckBox parameter="stock" name="Stock" />
      <CheckBox parameter="status" name="Status" />
      <CheckBox parameter="tags" name="Tags" />
    </section>
  );
};

export default ResultSummary;
