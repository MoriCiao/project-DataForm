import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";

export const RaiseBtn = () => {
  const { state, dispatch } = useContext(DataContext);
  return (
    <button
      type="button"
      className={` rounded-sm text-white`}
      onClick={() => dispatch({ type: "RAISE_SORT" })}
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
      onClick={() => dispatch({ type: "DECREASE_SORT" })}
    >
      Price🔽
    </button>
  );
};
