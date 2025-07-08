import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { motion } from "framer-motion";
export const UndoBtn = () => {
  const { state, dispatch, BtnAnimateHover } = useContext(DataContext);

  return (
    <motion.button
      whileHover={{ ...BtnAnimateHover }}
      onClick={() =>
        dispatch({
          type: "UNDO_DEL_SELECTED",
          payload: { item: state.del_data },
        })
      }
      type="button"
      className={`border px-2 rounded-sm text-white`}
    >
      Undo
    </motion.button>
  );
};
export const AddBtn = () => {
  const { state, dispatch, BtnAnimateHover } = useContext(DataContext);

  return (
    <motion.button
      whileHover={{ ...BtnAnimateHover }}
      onClick={() => dispatch({ type: "TOGGLE_ADD_PAGE" })}
      type="button"
      className={`border px-2 rounded-sm text-white`}
    >
      Add
    </motion.button>
  );
};
export const DelBtn = () => {
  const { state, dispatch, BtnAnimateHover } = useContext(DataContext);

  return (
    <motion.button
      whileHover={{ ...BtnAnimateHover }}
      onClick={() =>
        dispatch({ type: "DEL_SELECTED", payload: { item: state.selected } })
      }
      type="button"
      className={`border px-2 rounded-sm text-white`}
    >
      Del
    </motion.button>
  );
};
export const SaveBtn = () => {
  const { state, dispatch, BtnAnimateHover } = useContext(DataContext);

  const handleSave = () => {
    console.log("Data 以儲存至 LocalStorage....");
    console.log(state.data);
    localStorage.setItem("my_dataForm", JSON.stringify(state.data));
  };
  return (
    <motion.button
      whileHover={{ ...BtnAnimateHover }}
      className={`border px-2 rounded-sm text-white`}
      onClick={handleSave}
    >
      Save
    </motion.button>
  );
};
export const ReLoadingBtn = () => {
  const { state, dispatch, BtnAnimateHover } = useContext(DataContext);

  const handleReload = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    // 嘗試模仿加載資料
    // console.log(JSON.parse(localStorage.getItem("my_dataForm")));
    setTimeout(async () => {
      try {
        const res = await fetch("/product_data_2000.json");
        const jsonData = await res.json();
        console.log(`目前抓取 ${jsonData.length} 筆資料..`);
        dispatch({ type: "SET_DATA", payload: jsonData });
        localStorage.setItem("my_dataForm", JSON.stringify(jsonData));
        // 查詢目前有多少種類的 category
        // const x = jsonData.reduce((acc, cur) => {
        //   acc[cur.category] = (acc[cur.category] || 0) + 1;
        //   return acc;
        // }, {});
        // console.log(x);
        /*
          居家生活: 407;
          文具用品: 397;
          運動用品: 403;
          電子產品: 386;
          食品飲料: 407;
          */
      } catch (error) {
        console.log(`Data Loading Fail ..., ${error} `);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }, 2000);
  };
  return (
    <motion.button
      whileHover={{ ...BtnAnimateHover }}
      className={`border px-2 rounded-sm text-white`}
      onClick={handleReload}
    >
      ReloadData
    </motion.button>
  );
};

export const ToDelPage = () => {
  const { state, dispatch, BtnAnimateHover } = useContext(DataContext);
  return (
    <motion.button
      whileHover={{ ...BtnAnimateHover }}
      onClick={() => dispatch({ type: "TOGGLE_DEL_PAGE" })}
      type="button"
      className={` border px-2 rounded-sm text-white`}
    >
      🗑️
    </motion.button>
  );
};

export const CurrentDelBtn = () => {
  const { state, dispatch, BtnAnimateHover } = useContext(DataContext);
  return (
    <motion.button
      whileHover={{ ...BtnAnimateHover }}
      onClick={() => {
        dispatch({ type: "CURRENT_DEL_DATA" });
      }}
      className={`border px-2 rounded-sm text-white`}
    >
      Delete !
    </motion.button>
  );
};
