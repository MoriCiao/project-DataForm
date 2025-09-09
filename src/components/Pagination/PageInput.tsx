import React from 'react'
import {  motion } from "framer-motion";
import Button from '../Button/Button';
export default function PageInput({totalPages, changePage, setChangePage ,handlePage}) {
  return (
    <>
        <motion.input
                whileFocus={{ backgroundColor: "#F1F5F9", color: "#0F172A" }}
                transition={{ duration: 0.3 }}
                type="number"
                className={`md:w-[8rem] sm:w-[4rem] text-center bg-transparent indent-[0.5rem] `}
                placeholder="請輸入頁數..."
                step="1"
                min="1"
                max={totalPages}
                value={changePage}
                onChange={(e) => {
                setChangePage(e.target.value);
            }}
            onKeyDown={(e) => {
            if (e.key === "Enter") {
                handlePage();
            }
            }}
        />

        <Button 
            type="button"
            label='Go'
            className={`border-0`}
            onClick={handlePage}
            disable={changePage === ""}
        />
    
    
    </>
  )
}
