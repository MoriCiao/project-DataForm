import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { div } from "framer-motion/client";

const Reviseitem = ({ label, prevData, type }) => {
  return (
    <div className="grid grid-cols-6 gap-2 justify-betweem">
      <span className="col-start-1 w-[10rem]">{label} :</span>
      <div className="col-start-2 col-span-2 flex justify-center w-[10rem]">
        <p>{prevData}</p>
        <span>{`=>`}</span>
      </div>
      <input
        className="col-start-4 col-span-4 w-full indent-[1rem] text-black"
        placeholder={`請輸入要修改的 ${label}`}
        type={type}
      />
    </div>
  );
};
const ReviseNum = ({ label, prevData, type }) => {
  return (
    <div className="grid grid-cols-6 gap-2 justify-betweem">
      <span className="col-start-1 w-[10rem]">{label} :</span>
      <div className="col-start-2 col-span-2 flex justify-center w-[10rem]">
        <p>{prevData}</p>
        <span>{`=>`}</span>
      </div>
      <input
        className="col-start-4 col-span-4 w-full indent-[1rem] text-black"
        placeholder={`請輸入要修改的 ${label}`}
        type={type}
        min={"0"}
        step={"1"}
      />
    </div>
  );
};

const RevisePage = () => {
  const { state, dispatch, BtnAnimateHover } = useContext(DataContext);
  const reviseData = state.revisePage.item;
  return (
    <div className="fixed z-[10] top-[50%] left-[50%] bg-black/90 w-auto h-auto -translate-x-[50%] -translate-y-[50%] px-4 py-2 text-white flex flex-col justify-center items-center">
      <div className="revise-top w-full flex items-center justify-between">
        <p className="">Revise Page</p>
        <span
          className="select-none cursor-pointer"
          onClick={() => {
            dispatch({ type: "TOGGLE_REVISE_PAGE" });
          }}
        >
          ❌
        </span>
      </div>

      <div className="flex flex-col gap-2 py-2 justify-center items-center">
        {/* Name */}
        <Reviseitem label={"Name"} prevData={reviseData.name} type={"text"} />
        <hr className="border border-white/50 w-full" />
        {/* 修改 Brand */}
        <Reviseitem label={"Brand"} prevData={reviseData.brand} type={"text"} />
        <hr className="border border-white/50 w-full" />
        {/* Category */}
        <Reviseitem
          label={"Category"}
          prevData={reviseData.category}
          type={"text"}
        />
        <hr className="border border-white/50 w-full" />
        {/* Price */}
        <Reviseitem label={"Price"} prevData={reviseData.price} type={"text"} />
        <hr className="border border-white/50 w-full" />
        {/* Date */}
        <Reviseitem
          label={"Date"}
          prevData={reviseData.createdAt}
          type={"date"}
        />
        <hr className="border border-white/50 w-full" />
        {/* Status */}
        <Reviseitem
          label={"Status"}
          prevData={reviseData.status}
          type={"text"}
        />
        <hr className="border border-white/50 w-full" />
        {/* Stock */}
        <ReviseNum
          label={"Stock"}
          prevData={reviseData.stock}
          type={"number"}
        />
        <hr className="border border-white/50 w-full" />
        {/* Tags */}
        <Reviseitem
          label={"Tags"}
          prevData={reviseData.tags.join(" ")}
          type={"text"}
        />
        <hr className="border border-white/50 w-full" />
      </div>

      <button className="border rounded-full px-2">Confirm</button>
    </div>
  );
};

export default RevisePage;
