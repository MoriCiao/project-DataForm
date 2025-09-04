import React, { Fragment, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Select from "../Select/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleRevisePage,
  setDetil,
  confirmRevision,
} from "../../features/dataFormSlice";

const Reviseitem = ({ label, name, prevData, type }) => {
  const { newDetil } = useSelector((state) => state.dataForm);
  const dispath_redux = useDispatch();

  return (
    <div className="flex justify-end items-center  w-full">
      <span className="flex-1 w-[10rem] text-center">{label} :</span>
      <div className="flex-1 flex justify-center w-[10rem]">
        <p>{prevData}</p>
        <span>{`=>`}</span>
      </div>
      <div className=" flex-1 w-full ">
        <Input
          type={type}
          value={newDetil?.[name] || ""}
          className={`text-black text-start flex justify-center`}
          placeholder={`請輸入要修改的 ${name}`}
          onChange={(e) => dispath_redux(setDetil({ [name]: e.target.value }))}
        />
      </div>
    </div>
  );
};
const ReviseNum = ({ label, name, prevData, type }) => {
  const { newDetil } = useSelector((state) => state.dataForm);
  const dispath_redux = useDispatch();

  return (
    <div className="flex justify-end items-center  w-full">
      <span className="col-start-1 w-[10rem] text-center">{label} :</span>
      <div className="col-start-2 col-span-2 flex justify-center w-[10rem]">
        <p>{prevData}</p>
        <span>{`=>`}</span>
      </div>
      <Input
        type={type}
        value={newDetil?.[name] || ""}
        min={"0"}
        step={"1"}
        className={`text-black text-start`}
        placeholder={`請輸入要修改的 ${name}`}
        onChange={(e) => dispath_redux(setDetil({ [name]: e.target.value }))}
      />
    </div>
  );
};
const ReviseSelect = ({ label, name, prevData }) => {
  const { newDetil } = useSelector((state) => state.dataForm);
  const dispath_redux = useDispatch();
  return (
    <div className="flex justify-end items-center  w-full">
      <span className="col-start-1 w-[10rem] text-center">{label} :</span>
      <div className="col-start-2 col-span-2 flex justify-center w-[10rem]">
        <p>{prevData}</p>
        <span>{`=>`}</span>
      </div>
      <Select
        name={"status"}
        value={newDetil?.[name] || ""}
        className={"text-black text-center flex items-center"}
        onChange={(e) => dispath_redux(setDetil({ [name]: e.target.value }))}
      />
    </div>
  );
};

const RevisePage = () => {
  const { revisePage } = useSelector((state) => state.dataForm);
  const dispath_redux = useDispatch();
  const reviseData = revisePage.reviseItem;

  return (
    <div className="fixed z-[10] top-[50%] left-[50%] bg-black/60 w-auto h-auto -translate-x-[50%] -translate-y-[50%] p-4 px-8 backdrop-blur-sm  text-white flex flex-col gap-4 items-center">
      <div className="revise-top w-full flex items-center justify-between">
        <p className="">Revise Page</p>
        <span
          className="select-none cursor-pointer"
          onClick={() => {
            dispath_redux(toggleRevisePage());
          }}
        >
          ❌
        </span>
      </div>

      <div className="flex flex-col gap-2 py-2 h-full justify-start items-center">
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
          type={"number"}
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

      <Button
        label={"Confirm"}
        type="button"
        onClick={() => dispath_redux(confirmRevision())}
      />
    </div>
  );
};

export default RevisePage;
