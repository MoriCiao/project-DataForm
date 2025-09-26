import React from "react";

type InputProps = {
  ref? : React.RefObject<HTMLInputElement>;
  label? :string;
  name? :string;
  type? :string;
  value? :string| number;
  min? :string | number;
  step? :string | number;
  placeholder : string ;
  className? :string;
  onChange : (e :React.ChangeEvent<HTMLInputElement>) => void;
  required : boolean;

};

const STYLE = {
  input_component: `input_component rounded bg-white text-center indent-[0.5rem] sm:h-[2rem] sm:w-[20rem] md:h-[2.5rem] md:w-[12rem]`
}

export default function Input({
  ref ,
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  className,
  min,
  step,
  required = true,
}:InputProps):React.ReactNode {
  return (
    <>
      {label && <label htmlFor="">{label}</label>}
      <input
        className={`${STYLE.input_component} ${className}`}
        ref={ref && ref }
        min={min && min }
        step={step && step}
        name={name && name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </>
  );
}
