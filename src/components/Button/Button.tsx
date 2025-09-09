
import React from 'react'

type ButtoProps = {
    label: string;
    type: "button" | "submit" | "reset"
    className? :string | null;
    onClick: () => void;
    disable? : boolean
}

export default function Button({label, type, className, onClick ,disable = false}: ButtoProps) {
  return (
    <button 
        type={type}
        className ={`relative border rounded-md text-white px-4 hover:text-sky-500 hover:bg-black/50 hover:z-10 transition-all duration-500 ${disable ? "cursor-not-allowed" : "cursor-pointer"}  ${className}`}
        onClick={onClick}
        disabled={disable}
        >
            {label}
    </button>
  )
}
