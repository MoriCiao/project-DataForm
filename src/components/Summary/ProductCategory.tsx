import React from 'react'
import { CheckBox } from '../CheckBox'

export default function ProductCategory() {
  return (
    <>
        <CheckBox
            value="house"
            name="居家生活"
            condition_type="cate_Condition"
            dispatch_type="TOGGLE_FILTER_CONDITION_CATEGORY"
        />
        <CheckBox
            value="stationery"
            name="文具用品"
            condition_type="cate_Condition"
            dispatch_type="TOGGLE_FILTER_CONDITION_CATEGORY"
        />
        <CheckBox
            value="electronics"
            name="電子產品"
            condition_type="cate_Condition"
            dispatch_type="TOGGLE_FILTER_CONDITION_CATEGORY"
        />
        <CheckBox
            value="sporting_goods"
            name="運動用品"
            condition_type="cate_Condition"
            dispatch_type="TOGGLE_FILTER_CONDITION_CATEGORY"
        />
        <CheckBox
            value="food_and_beverage"
            name="食品飲料"
            condition_type="cate_Condition"
            dispatch_type="TOGGLE_FILTER_CONDITION_CATEGORY"
        />
    </>
  )
}
