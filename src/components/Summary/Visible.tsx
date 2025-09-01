import React from 'react'
import { CheckBox } from '../CheckBox'

export default function Visible() {
  return (
    <>
        <span className="px-2  sm:col-start-1 sm:col-span-2 sm:col-span-1 text-center text-[1.15rem]">
            Visible :
        </span>
        <div className="sm:col-start-3 sm:col-span-10 sm:grid sm:grid-cols-4 sm:col-start-2 xl:grid-cols-9 md:flex  justify-around sm:gap-4 md:gap-2 w-fit items-center  p-2">
            <CheckBox
            value="ID"
            name="ID"
            condition_type="isVisible"
            dispatch_type="COL_IS_VISIBLE"
            />
            <CheckBox
            value="Name"
            name="Name"
            condition_type="isVisible"
            dispatch_type="COL_IS_VISIBLE"
            />
            <CheckBox
            value="Brand"
            name="Brand"
            condition_type="isVisible"
            dispatch_type="COL_IS_VISIBLE"
            />
            <CheckBox
            value="Category"
            name="Category"
            condition_type="isVisible"
            dispatch_type="COL_IS_VISIBLE"
            />
            <CheckBox
            value="Price"
            name="Price"
            condition_type="isVisible"
            dispatch_type="COL_IS_VISIBLE"
            />
            <CheckBox
            value="Date"
            name="Date"
            condition_type="isVisible"
            dispatch_type="COL_IS_VISIBLE"
            />
            <CheckBox
            value="Status"
            name="Status"
            condition_type="isVisible"
            dispatch_type="COL_IS_VISIBLE"
            />
            <CheckBox
            value="Stock"
            name="Stock"
            condition_type="isVisible"
            dispatch_type="COL_IS_VISIBLE"
            />
            <CheckBox
            value="Tags"
            name="Tags"
            condition_type="isVisible"
            dispatch_type="COL_IS_VISIBLE"
            />
        </div>
    </>
  )
}
