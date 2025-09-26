import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  ref,
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
}): InputProps {
  return (
    <>
      {label && <label htmlFor="">{label}</label>}
      <input
        className={`rounded bg-white text-center indent-[0.5rem] sm:h-[2rem] sm:w-[20rem] md:h-[2.5rem] md:w-[12rem] ${className}`}
        ref={ref ? ref : null}
        min={min ? min : null}
        step={step ? step : null}
        name={name ? name : null}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </>
  );
}
