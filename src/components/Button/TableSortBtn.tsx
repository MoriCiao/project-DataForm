import React, { useContext } from 'react'
import { DataContext } from '../../context/DataContext';
import { perSort } from '../../features/dataFormSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
type TableProps = {
  name: string;
  className? : string | null
  onClick : () => void
}

export default function TableSortBtn({name}: TableProps) {
  const { props_sort_condition } = useSelector((state: RootState) => state.dataForm);
  
  const dispath_redux = useDispatch();


  return (
    <button className=' w-auto h-full' onClick={()=>
      dispath_redux(perSort({
        name : name,
        checked : props_sort_condition[name]
      }))
      }>
      ↕️
    </button>
  )
}
