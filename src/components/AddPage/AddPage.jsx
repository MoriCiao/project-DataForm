import React, { useContext, useEffect, useRef, useState } from "react";
import { easeInOut, motion } from "framer-motion";
import { DataContext } from "../../context/DataContext";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Button from "../Button/Button";

const AddPage = () => {
  const { state, dispatch } = useContext(DataContext);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`Add-page fixed z-[10] top-[50%] left-[50%] bg-black/50 backdrop-blur-sm w-auto h-auto -translate-x-[50%] -translate-y-[50%] px-4 py-2 rounded`}
    >
      <div className=" flex items-center justify-between">
        <p className="text-white">AddPage</p>
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
        className="Add-container flex flex-col gap-4 items-center p-4 "
      >
        {/* ADD ID */}
        <div className="w-full flex gap-12 items-center justify-end text-white">
          <Input
            ref={inputRef}
            label="ID"
            name="id"
            type="text"
            className={"w-full border border-white text-black"}
            placeholder={`請輸入商品 ID 資訊 `}
            value={state.newItem.id}
            onChange={(e) =>
              dispatch({ type: "ADD_NEW_ITEM", payload: e.target })
            }
          />
        </div>

        {/* ADD Name */}
        <div className="w-full flex gap-12 items-center justify-end text-white">
          <Input
            label="Name"
            name="name"
            type="text"
            className={"w-full border border-white text-black"}
            placeholder={`請輸入商品 Name 資訊 `}
            value={state.newItem.name}
            onChange={(e) =>
              dispatch({ type: "ADD_NEW_ITEM", payload: e.target })
            }
          />
        </div>

        {/* ADD Brand */}

        <div className="w-full flex gap-12 items-center justify-end text-white">
          <Input
            label="Brand"
            name="brand"
            type="text"
            className={"w-full border border-white text-black"}
            placeholder={`請輸入商品 Brand 資訊 `}
            value={state.newItem.brand}
            onChange={(e) =>
              dispatch({ type: "ADD_NEW_ITEM", payload: e.target })
            }
          />
        </div>

        {/* ADD Category */}
        <div className="w-full flex gap-12 items-center justify-end text-white">
          <Select
            label="Category"
            name="category"
            value={state.newItem.category}
            className={"w-full border border-white text-black text-center"}
            placeholder={`請輸入商品 Category 資訊 `}
            onChange={(e) =>
              dispatch({ type: "ADD_NEW_ITEM", payload: e.target })
            }
          />
        </div>

        {/* ADD Price */}
        <div className="w-full flex gap-12 items-center justify-end text-white">
          <Input
            label="Price"
            name="price"
            type="number"
            className={"w-full border border-white text-black"}
            placeholder={`請輸入商品 Price 資訊 `}
            value={state.newItem.price}
            onChange={(e) =>
              dispatch({ type: "ADD_NEW_ITEM", payload: e.target })
            }
          />
        </div>

        {/* ADD Date */}

        <div className="w-full flex gap-12 items-center justify-end text-white">
          <Input
            label="Date"
            name="createdAt"
            type="date"
            className={"w-full border border-white text-black flex justify-end"}
            placeholder={`請輸入商品 Date 資訊 `}
            value={state.newItem.createdAt || ""}
            onChange={(e) =>
              dispatch({ type: "ADD_NEW_ITEM", payload: e.target })
            }
          />
        </div>

        {/* ADD Status */}
        <div className="w-full flex gap-12 items-center justify-end text-white">
          <Select
            label="Status"
            name="status"
            value={state.newItem.status || ""}
            className={"w-full border border-white text-black text-center"}
            placeholder={`請輸入商品 Status 資訊 `}
            onChange={(e) =>
              dispatch({ type: "ADD_NEW_ITEM", payload: e.target })
            }
          />
        </div>

        {/* ADD Stock */}
        <div className="w-full flex gap-12 items-center justify-end text-white">
          <Input
            label="Stock"
            name="stock"
            type="number"
            className={"w-full border border-white text-black"}
            placeholder={`請輸入商品 Stock 資訊 `}
            value={state.newItem.stock}
            onChange={(e) =>
              dispatch({ type: "ADD_NEW_ITEM", payload: e.target })
            }
          />
        </div>

        {/* ADD tags */}

        <div className="w-full flex gap-12 items-center justify-end text-white">
          <Input
            label="Tags"
            name="tags"
            type="text"
            className={"w-full border border-white text-black"}
            placeholder={`逗號( , )區隔, 請輸入商品 Tags 資訊`}
            value={state.newItem.tags}
            onChange={(e) =>
              dispatch({ type: "ADD_NEW_ITEM", payload: e.target })
            }
          />
        </div>

        <Button
          label="ADD"
          type="submit"
          onClick={() => {
            dispatch({ type: "ADD_DATA" });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch({ type: "ADD_DATA" });
            }
          }}
        />
      </form>
    </motion.section>
  );
};

export default AddPage;
