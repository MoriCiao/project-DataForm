
import React from 'react'

type ButtoProps = {
    label: string;
    type: "button" | "submit" | "reset"
    className? :string | null;
    onClick: () => void;
}

export default function Button({label, type, className, onClick }: ButtoProps) {
  return (
    <button 
        type={type}
        className ={`relative cursor-pointer  border rounded-md text-white px-4 hover:text-sky-500 hover:bg-black/50 hover:z-10 transition-all duration-500 ${className}`}
        onClick={onClick}>
            {label}
    </button>
  )
}
