import React from 'react'
import { CheckBox } from '../CheckBox'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function ProductCategory() {
    const { cate_Condition } = useSelector((state :RootState) => state.dataForm);
  return (
    <>
        <CheckBox
            value="house"
            name="居家生活"
            condition_type={cate_Condition}
            selcetReducer="category"
        />
        <CheckBox
            value="stationery"
            name="文具用品"
            condition_type={cate_Condition}
            selcetReducer="category"
        />
        <CheckBox
            value="electronics"
            name="電子產品"
            condition_type={cate_Condition}
            selcetReducer="category"
        />
        <CheckBox
            value="sporting_goods"
            name="運動用品"
            condition_type={cate_Condition}
            selcetReducer="category"
        />
        <CheckBox
            value="food_and_beverage"
            name="食品飲料"
            condition_type={cate_Condition}
            selcetReducer="category"
        />
    </>
  )
}
