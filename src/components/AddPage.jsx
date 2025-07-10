import React, { useContext, useEffect, useState } from "react";
import { easeInOut, motion } from "framer-motion";
import { DataContext } from "../context/DataContext";
import {
  AddInputText,
  AddInputNumber,
  AddInputDate,
  AddInputSelect,
} from "./Addinput";

const AddPage = () => {
  const { state, dispatch, BtnAnimateHover } = useContext(DataContext);

  // useEffect(() => {
  //   console.log(state.newItem);
  // }, [state.newItem]);
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`Add-page fixed z-[10] top-[50%] left-[50%] bg-black/90 w-auto h-auto -translate-x-[50%] -translate-y-[50%] px-4 py-2 text-white`}
    >
      <div className=" flex items-center justify-between">
        <p className="">AddPage</p>
        <span
          className="select-none cursor-pointer"
          onClick={() => {
            dispatch({ type: "TOGGLE_ADD_PAGE" });
          }}
        >
          ❌
        </span>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="Add-container flex flex-col gap-4 items-center p-4"
      >
        {/* ADD ID */}
        <AddInputText
          label="ID"
          name="id"
          value={state.newItem.id}
          onChange={(e) =>
            dispatch({ type: "ADD_NEW_ITEM", payload: e.target })
          }
          placeholder={`請輸入商品 ID 資訊 `}
        />

        {/* ADD Name */}
        <AddInputText
          label="Name"
          name="name"
          value={state.newItem.name}
          onChange={(e) =>
            dispatch({ type: "ADD_NEW_ITEM", payload: e.target })
          }
          placeholder={`請輸入商品 Name 資訊 `}
        />

        {/* ADD Brand */}
        <AddInputText
          label="Brand"
          name="brand"
          value={state.newItem.brand}
          onChange={(e) =>
            dispatch({ type: "ADD_NEW_ITEM", payload: e.target })
          }
          placeholder={`請輸入商品 Brand 資訊 `}
        />

        {/* ADD Category */}
        <AddInputSelect
          label="Category"
          name="category"
          value={state.newItem.category}
          onChange={(e) =>
            dispatch({ type: "ADD_NEW_ITEM", payload: e.target })
          }
          placeholder={`請輸入商品 Category 資訊 `}
        />

        {/* ADD Price */}
        <AddInputNumber
          label="Price"
          name="price"
          value={state.newItem.price}
          onChange={(e) =>
            dispatch({ type: "ADD_NEW_ITEM", payload: e.target })
          }
          placeholder={`請輸入商品 Price 資訊 `}
        />

        {/* ADD Date */}
        <AddInputDate
          label="Date"
          name="createdAt"
          value={state.newItem.createdAt || ""}
          onChange={(e) =>
            dispatch({ type: "ADD_NEW_ITEM", payload: e.target })
          }
          placeholder={`請輸入商品 Date 資訊 `}
        />

        {/* ADD Status */}
        <AddInputSelect
          label="Status"
          name="status"
          value={state.newItem.status || ""}
          onChange={(e) =>
            dispatch({ type: "ADD_NEW_ITEM", payload: e.target })
          }
          placeholder={`請輸入商品 Status 資訊 `}
        />

        {/* ADD Stock */}
        <AddInputNumber
          label="Stock"
          name="stock"
          value={state.newItem.stock}
          onChange={(e) =>
            dispatch({ type: "ADD_NEW_ITEM", payload: e.target })
          }
          placeholder={`請輸入商品 Stock 資訊 `}
        />

        {/* ADD tags */}
        <AddInputText
          label="Tags"
          name="tags"
          value={state.newItem.tags}
          onChange={(e) =>
            dispatch({
              type: "ADD_NEW_ITEM",
              payload: e.target,
            })
          }
          placeholder={`逗號( , )區隔, 請輸入商品 Tags 資訊 `}
        />

        <motion.button
          whileHover={{ ...BtnAnimateHover }}
          onClick={() => {
            dispatch({ type: "ADD_DATA" });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch({ type: "ADD_DATA" });
            }
          }}
          type="submit"
          className=" border px-2 rounded-full"
        >
          ADD
        </motion.button>
      </form>
    </motion.section>
  );
};

export default AddPage;
