import React from 'react'
import { CheckBox } from '../CheckBox'

export default function ProductStatus() {
  return (
    <>
        <CheckBox
            value="On_Sale"
            name="上架中"
            condition_type="conditions"
            dispatch_type="TOGGLE_FILTER_CONDITION_STATUS"
        />
        <CheckBox
            value="Off_Sale"
            name="下架中"
            condition_type="conditions"
            dispatch_type="TOGGLE_FILTER_CONDITION_STATUS"
        />
        <CheckBox
            value="Out_of_Stock"
            name="缺貨中"
            condition_type="conditions"
            dispatch_type="TOGGLE_FILTER_CONDITION_STATUS"
        />
    </>
  )
}
