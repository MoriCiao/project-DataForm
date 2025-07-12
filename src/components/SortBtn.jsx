import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { easeInOut, motion } from "framer-motion";
export const RaiseBtn = () => {
  const { state, dispatch } = useContext(DataContext);
  return (
    <motion.button
      whileHover={{
        backgroundColor: "rgb(241, 245, 249)",
        color: "rgb(0,0,0)",
      }}
      transition={{ duration: 0.3, ease: easeInOut }}
      type="button"
      className={`border px-4 sm:h-[2rem] md:w-[6rem] text-[1.15rem] rounded-md text-white`}
      onClick={() => dispatch({ type: "PRICE_RAISE_SORT" })}
    >
      Price🔼
    </motion.button>
  );
};

export const DecreaseBtn = () => {
  const { state, dispatch } = useContext(DataContext);
  return (
    <motion.button
      whileHover={{
        backgroundColor: "rgb(241, 245, 249)",
        color: "rgb(0,0,0)",
      }}
      transition={{ duration: 0.3, ease: easeInOut }}
      type="button"
      className={`border px-4 sm:h-[2rem] md:w-[6rem] text-[1.15rem] rounded-md text-white`}
      onClick={() => dispatch({ type: "PRICE_DECREASE_SORT" })}
    >
      Price🔽
    </motion.button>
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
