import React, { Fragment } from "react";

export default function Select({
  label,
  name,
  value,
  onChange,
  className,
  required = true,
}) {
  let opt: string[] = [];
  if (name === "status") {
    opt = ["", "上架中", "下架", "缺貨中"];
  } else if (name === "category") {
    opt = ["", "居家生活", "文具用品", "電子產品", "運動用品", "食品飲料"];
  }

  return (
    <>
      {label && <label htmlFor="">{label}</label>}
      <select
        name={name}
        id={`item-${name}`}
        className={`rounded bg-white sm:h-[2rem] sm:w-[20rem] md:h-[2.5rem] md:w-[12rem] ${className}`}
        value={value}
        onChange={onChange}
        required={required}
      >
        {opt.map((op, index) => {
          return (
            <Fragment key={index}>
              <option value={op}>{op}</option>;
            </Fragment>
          );
        })}
      </select>
    </>
  );
}
