import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";

export const RaiseBtn = () => {
  const { state, dispatch } = useContext(DataContext);
  return (
    <button
      type="button"
      className={` rounded-sm text-white`}
      onClick={() => dispatch({ type: "PRICE_RAISE_SORT" })}
    >
      Price🔼
    </button>
  );
};

export const DecreaseBtn = () => {
  const { state, dispatch } = useContext(DataContext);
  return (
    <button
      type="button"
      className={` rounded-sm text-white`}
      onClick={() => dispatch({ type: "PRICE_DECREASE_SORT" })}
    >
      Price🔽
    </button>
  );
};

export const PropsSortBtn = ({ propsName }) => {
  const { state, dispatch } = useContext(DataContext);
  // console.log(state.props_sort_condition);
  const span_style = "cursor-pointer";
  return (
    <span
      name={propsName}
      className={`${span_style}`}
      onClick={() => {
        dispatch({
          type: "PER_PROPS_SORT",
          payload: {
            name: propsName,
            checked: state.props_sort_condition[propsName],
          },
        });
      }}
    >
      ↕️
    </span>
  );
};
