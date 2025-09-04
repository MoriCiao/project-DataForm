import { label } from 'framer-motion/client'
import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {

}

export default function Input({ref ,label,name, type, value, onChange, placeholder, className, min, step}): InputProps {

  return (
    <>
    {label && (
        <label htmlFor="">{label}</label>
    )}
    <input
        className={`bg-white rounded indent-[0.5rem]  md:w-[12rem] md:h-[2.5rem] sm:w-[20rem] sm:h-[2rem] text-center ${className}`}
        ref={ref ? ref : null}
        min = {min ? min : null}
        step = {step ? step : null}
        name={name ? name :null}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
    </>
  )
}


