
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
        className ={`cursor-pointer border rounded-md text-white px-4 ${className}`}
        onClick={onClick}>
            {label}
    </button>
  )
}
