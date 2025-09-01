import React, { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { easeInOut, motion } from "framer-motion";
export const UndoBtn = () => {
  const { state, dispatch } = useContext(DataContext);

  return (
    <motion.button
      whileHover={{
        backgroundColor: "rgb(101, 212, 147)",
        color: "rgb(0, 0, 0)",
        scale: 1.15,
        fontWeight: 900,
      }}
      transition={{ duration: 0.3, ease: easeInOut }}
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
  const { state, dispatch } = useContext(DataContext);

  return (
    <motion.button
      whileHover={{
        backgroundColor: "rgb(0, 42, 255)",
        color: "rgb(0, 0, 0)",
        scale: 1.15,
        fontWeight: 900,
      }}
      transition={{ duration: 0.3, ease: easeInOut }}
      onClick={() => dispatch({ type: "TOGGLE_ADD_PAGE" })}
      type="button"
      className={`border px-2 rounded-sm text-white`}
    >
      Add
    </motion.button>
  );
};
export const DelBtn = () => {
  const { state, dispatch } = useContext(DataContext);

  return (
    <motion.button
      whileHover={{
        backgroundColor: "rgb(255, 70, 70)",
        color: "rgb(253, 255, 160)",
        scale: 1.15,
        fontWeight: 900,
      }}
      transition={{ duration: 0.3, ease: easeInOut }}
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
  const { state, dispatch } = useContext(DataContext);

  const handleSave = () => {
    localStorage.setItem("my_dataForm", JSON.stringify(state.data));
  };
  return (
    <motion.button
      whileHover={{
        backgroundColor: "rgb(243, 255, 70)",
        color: "rgb(0, 0, 0)",
        scale: 1.15,
        fontWeight: 900,
      }}
      transition={{ duration: 0.3, ease: easeInOut }}
      className={`border px-2 rounded-sm text-white`}
      onClick={handleSave}
    >
      Save
    </motion.button>
  );
};
export const ReLoadingBtn = () => {
  const { state, dispatch } = useContext(DataContext);

  const handleReload = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    // 嘗試模仿加載資料
    setTimeout(async () => {
      try {
        const res = await fetch("/project-DataForm/product_data_2000.json");
        const jsonData = await res.json();
        console.log(`目前抓取 ${jsonData.length} 筆資料..`);
        dispatch({ type: "SET_DATA", payload: jsonData });
        localStorage.setItem("my_dataForm", JSON.stringify(jsonData));

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
      whileHover={{
        backgroundColor: "rgb(124, 255, 117)",
        color: "rgb(0, 0, 0)",
        scale: 1.15,
        fontWeight: 900,
      }}
      transition={{ duration: 0.3, ease: easeInOut }}
      className={`border px-2 rounded-sm text-white`}
      onClick={handleReload}
    >
      ReloadData
    </motion.button>
  );
};

export const ToDelPage = () => {
  const { state, dispatch } = useContext(DataContext);
  return (
    <motion.button
      whileHover={{
        backgroundColor: "rgb(255, 0, 0)",
        color: "rgb(253, 255, 160)",
        scale: 1.15,
        fontWeight: 900,
      }}
      transition={{ duration: 0.3, ease: easeInOut }}
      onClick={() => dispatch({ type: "TOGGLE_DEL_PAGE" })}
      type="button"
      className={` border px-2 rounded-sm text-white`}
    >
      <motion.span
        initial={{ fontSize: "1rem" }}
        whileHover={{ fontSize: ["1rem", "1.15rem"] }}
        transition={{ duration: 0.3, ease: easeInOut }}
      >
        🗑️
      </motion.span>
    </motion.button>
  );
};

export const CurrentDelBtn = () => {
  const { state, dispatch } = useContext(DataContext);
  return (
    <motion.button
      whileHover={{
        backgroundColor: "rgb(255, 0, 0)",
        color: "rgb(251, 255, 0)",
        scale: 1.15,
        fontWeight: 900,
      }}
      transition={{ duration: 0.3, ease: easeInOut }}
      onClick={() => {
        dispatch({ type: "CURRENT_DEL_DATA" });
      }}
      className={`border px-2 rounded-sm text-white`}
    >
      Delete !
    </motion.button>
  );
};

export const ExoportBtn = () => {
  const { state } = useContext(DataContext);
  // 匯出函式
  const exportToJson = (data, filename = "myData.json") => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <motion.button
      whileHover={{
        backgroundColor: "rgb(134, 251, 255)",
        color: "rgb(0, 0, 0)",
        scale: 1.15,
        fontWeight: 900,
      }}
      transition={{ duration: 0.3, ease: easeInOut }}
      className={`border px-2 rounded-sm text-white`}
      onClick={() => {
        exportToJson(state.data, "myData.json");
      }}
    >
      Export Data
    </motion.button>
  );
};
