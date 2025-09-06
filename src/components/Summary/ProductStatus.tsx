import React from 'react'
import { CheckBox } from '../CheckBox'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Zoom } from 'react-awesome-reveal';


export default function ProductStatus() {
  const { conditions } = useSelector((state :RootState) => state.dataForm);
  return (
    <Zoom
      duration={500}
      cascade
      damping={0.5}
      triggerOnce={true}
    >
        <CheckBox
            value="On_Sale"
            name="上架中"
            condition_type={conditions}
            selcetReducer="status"
            
        />
        <CheckBox
            value="Off_Sale"
            name="下架中"
            condition_type={conditions}
            selcetReducer="status"
        />
        <CheckBox
            value="Out_of_Stock"
            name="缺貨中"
            condition_type={conditions}
            selcetReducer="status"
        />
    </Zoom>
  )
}
