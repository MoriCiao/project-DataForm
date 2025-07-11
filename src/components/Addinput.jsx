import React, { Fragment } from "react";

export const AddInputText = ({ label, name, value, onChange, placeholder }) => {
  return (
    <div className="w-auto flex border">
      <label
        htmlFor={`item-${name}`}
        className="block pt-1 w-[5rem] h-[2rem] text-center bg-[--bg] text-[--text]"
      >
        {label}
      </label>
      <input
        id={`item-${name}`}
        name={name}
        type={"text"}
        className="w-[20rem] indent-[0.5rem] text-black rounded-sm h-[2rem]"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export const AddInputNumber = ({
  label,
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="w-auto flex border">
      <label
        htmlFor={`item-${name}`}
        className="block pt-1 w-[5rem] h-[2rem] text-center bg-[--bg] text-[--text]"
      >
        {label}
      </label>
      <input
        id={`item-${name}`}
        name={name}
        type={"number"}
        step={"1"}
        min={"0"}
        className="w-[20rem] indent-[0.5rem] text-black rounded-sm h-[2rem]"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};
export const AddInputDate = ({ label, name, value, onChange, placeholder }) => {
  return (
    <div className="w-auto flex border">
      <label
        htmlFor={`item-${name}`}
        className="block pt-1 w-[5rem] h-[2rem] text-center bg-[--bg] text-[--text]"
      >
        {label}
      </label>
      <input
        id={`item-${name}`}
        name={name}
        type={"date"}
        min={"2025-01-01"}
        max={"2999-12-31"}
        className="w-[20rem] indent-[0.5rem] text-black rounded-sm h-[2rem]"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export const AddInputSelect = ({ label, name, onChange }) => {
  let opt = [];
  if (name === "status") {
    opt = ["", "上架中", "下架", "缺貨中"];
  } else if (name === "category") {
    opt = ["", "居家生活", "文具用品", "電子產品", "運動用品", "食品飲料"];
  }

  return (
    <div className="w-auto flex border">
      <label
        htmlFor={`item-${name}`}
        className="block pt-1 w-[5rem] h-[2rem] text-center bg-[--bg] text-[--text]"
      >
        {label}
      </label>
      <select
        name={name}
        id={`item-${name}`}
        className="w-[20rem] indent-[0.5rem] text-black rounded-sm h-[2rem]"
        onChange={onChange}
        required
      >
        {opt.map((op, index) => {
          return (
            <Fragment key={index}>
              <option value={op}>{op}</option>;
            </Fragment>
          );
        })}
      </select>
    </div>
  );
};

export const AddInputTags = ({ label, name, value, onChange, placeholder }) => {
  return (
    <div className="w-auto flex border">
      <label
        htmlFor={`item-${name}`}
        className="block pt-1 w-[5rem] h-[2rem] text-center bg-[--bg] text-[--text]"
      >
        {label}
      </label>
      <input
        id={`item-${name}`}
        name={name}
        type={"text"}
        className="w-[20rem] indent-[0.5rem] text-black rounded-sm h-[2rem]"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};
