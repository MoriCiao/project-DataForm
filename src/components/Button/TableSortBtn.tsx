import React, { useContext } from 'react'
import { DataContext } from '../../context/DataContext';

type TableProps = {
  name: string;
  className? : string | null
  onClick : () => void
}

export default function TableSortBtn({name}: TableProps) {
  const { state, dispatch } = useContext(DataContext);
  return (
    <button className=' w-auto h-full' onClick={()=>dispatch({
      type: "PER_PROPS_SORT",
      payload: {
        name: name,
        checked: state.props_sort_condition[name]}
      })}>
      ↕️
    </button>
  )
}
