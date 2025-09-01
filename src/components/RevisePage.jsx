import React, { Fragment, useContext } from "react";
import { DataContext } from "../context/DataContext";

const Reviseitem = ({ label, name, prevData, type }) => {
  const { state, dispatch } = useContext(DataContext);
  return (
    <div className="grid grid-cols-6 gap-2 justify-betweem">
      <span className="col-start-1 w-[10rem]">{label} :</span>
      <div className="col-start-2 col-span-2 flex justify-center w-[10rem]">
        <p>{prevData}</p>
        <span>{`=>`}</span>
      </div>
      <input
        className="col-start-4 col-span-4 w-full indent-[1rem] text-black text-center"
        placeholder={`請輸入要修改的 ${label}`}
        type={type}
        value={state.newDetail?.[name] || ""}
        onChange={(e) =>
          dispatch({ type: "NEW_DETAIL", payload: { [name]: e.target.value } })
        }
      />
    </div>
  );
};
const ReviseNum = ({ label, name, prevData, type }) => {
  const { state, dispatch } = useContext(DataContext);
  return (
    <div className="grid grid-cols-6 gap-2 justify-betweem">
      <span className="col-start-1 w-[10rem]">{label} :</span>
      <div className="col-start-2 col-span-2 flex justify-center w-[10rem]">
        <p>{prevData}</p>
        <span>{`=>`}</span>
      </div>
      <input
        className="col-start-4 col-span-4 w-full indent-[1rem] text-black text-center"
        placeholder={`請輸入要修改的 ${label}`}
        type={type}
        min={"0"}
        step={"1"}
        value={state.newDetail?.[name] || ""}
        onChange={(e) =>
          dispatch({ type: "NEW_DETAIL", payload: { [name]: e.target.value } })
        }
      />
    </div>
  );
};
const ReviseSelect = ({ label, name, prevData }) => {
  const { state, dispatch } = useContext(DataContext);
  const opt = ["", "上架中", "下架", "缺貨中"];
  return (
    <div className="grid grid-cols-6 gap-2 justify-betweem">
      <span className="col-start-1 w-[10rem]">{label} :</span>
      <div className="col-start-2 col-span-2 flex justify-center w-[10rem]">
        <p>{prevData}</p>
        <span>{`=>`}</span>
      </div>
      <select
        className="col-start-4 col-span-4 w-full indent-[1rem] text-black text-center"
        value={state.newDetail?.[name] || ""}
        onChange={(e) =>
          dispatch({
            type: "NEW_DETAIL",
            payload: { [name]: e.target.value || "" },
          })
        }
        required
      >
        {opt.map((op, index) => {
          return (
            <Fragment key={index}>
              <option value={op}>{op}</option>;
            </Fragment>
          );
        })}
      </select>
    </div>
  );
};

const RevisePage = () => {
  const { state, dispatch } = useContext(DataContext);
  const reviseData = state.revisePage.reviseItem;

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
        {/* ID */}

        <p className="border w-full text-center py-2 text-[1.5rem]">
          目前操作的商品 ID ：
          <span className="text-red-500">{reviseData.id}</span>
        </p>
        {/* Name */}
        <Reviseitem
          label={"Name"}
          name={"name"}
          prevData={reviseData.name}
          type={"text"}
        />
        <hr className="border border-white/50 w-full" />
        {/* 修改 Brand */}
        <Reviseitem
          label={"Brand"}
          name={"brand"}
          prevData={reviseData.brand}
          type={"text"}
        />
        <hr className="border border-white/50 w-full" />
        {/* Category */}
        <Reviseitem
          label={"Category"}
          name={"category"}
          prevData={reviseData.category}
          type={"text"}
        />
        <hr className="border border-white/50 w-full" />
        {/* Price */}
        <Reviseitem
          label={"Price"}
          name={"price"}
          prevData={reviseData.price}
          type={"text"}
        />
        <hr className="border border-white/50 w-full" />
        {/* Date */}
        <Reviseitem
          label={"Date"}
          name={"createdAt"}
          prevData={reviseData.createdAt}
          type={"date"}
        />
        <hr className="border border-white/50 w-full" />
        {/* Status */}
        <ReviseSelect
          label={"Status"}
          name={"status"}
          prevData={reviseData.status}
        />
        <hr className="border border-white/50 w-full" />
        {/* Stock */}
        <ReviseNum
          label={"Stock"}
          name={"stock"}
          prevData={reviseData.stock}
          type={"number"}
        />
        <hr className="border border-white/50 w-full" />
        {/* Tags */}
        <Reviseitem
          label={"Tags"}
          name={"tags"}
          prevData={reviseData.tags.join(" ")}
          type={"text"}
        />
        <hr className="border border-white/50 w-full" />
      </div>

      <button
        className="border rounded-full px-2"
        onClick={() => dispatch({ type: "CONFIRM_OF_REVISION" })}
      >
        Confirm
      </button>
    </div>
  );
};

export default RevisePage;
