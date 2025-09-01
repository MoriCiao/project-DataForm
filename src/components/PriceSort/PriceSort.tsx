import React, { useContext } from 'react'
import Button from '../Button/Button'
import { DataContext } from '../../context/DataContext';

export default function PriceSort({children}) {
  const { state, dispatch } = useContext(DataContext);
  return (
    <>
      <Button
          type="button"
          label="Price🔼"
          onClick={() => dispatch({ type: "PRICE_RAISE_SORT" })}
        />
      <Button
        type="button"
        label="Price🔽"
        onClick={() => dispatch({ type: "PRICE_DECREASE_SORT" })}
      />
    </>
  )
}
