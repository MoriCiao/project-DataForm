import React, { Fragment, useContext, useState, useEffect } from "react";
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
import useLockedScroll from "../../hook/useLockedScroll";
import { Zoom } from "react-awesome-reveal";

const Reviseitem = ({ label, name, prevData, type, setReviseData, value }) => {
  const handleChange = (e) => {
    setReviseData((prev) => ({ ...prev, [name]: e.target.value }));
  };
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
          value={value}
          className={`text-black text-center flex justify-center`}
          placeholder={prevData}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};
const ReviseNum = ({ label, name, prevData, type, setReviseData, value }) => {
  const { newDetil } = useSelector((state) => state.dataForm);
  const dispath_redux = useDispatch();
  const handleChange = (e) => {
    setReviseData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <div className="flex justify-end items-center  w-full">
      <span className="col-start-1 w-[10rem] text-center">{label} :</span>
      <div className="col-start-2 col-span-2 flex justify-center w-[10rem]">
        <p>{prevData}</p>
        <span>{`=>`}</span>
      </div>
      <Input
        type={type}
        value={value}
        min={"0"}
        step={"1"}
        className={`text-black text-center`}
        placeholder={prevData}
        onChange={handleChange}
        required
      />
    </div>
  );
};
const ReviseSelect = ({ label, name, prevData, setReviseData, value }) => {
  const { newDetil } = useSelector((state) => state.dataForm);
  const dispath_redux = useDispatch();
  const handleChange = (e) => {
    setReviseData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <div className="flex justify-end items-center  w-full">
      <span className="col-start-1 w-[10rem] text-center">{label} :</span>
      <div className="col-start-2 col-span-2 flex justify-center w-[10rem]">
        <p>{prevData}</p>
        <span>{`=>`}</span>
      </div>
      <Select
        name={name}
        value={value}
        className={"text-black text-center flex items-center"}
        onChange={handleChange}
        required
      />
    </div>
  );
};

const RevisePage = () => {
  const { revisePage } = useSelector((state) => state.dataForm);
  useLockedScroll(revisePage.isOpen);
  const dispath_redux = useDispatch();
  const prevData = revisePage.reviseItem;
  const [reviseData, setReviseData] = useState({
    ...prevData,
  });

  const handleSubmit = () => {
    dispath_redux(confirmRevision(reviseData));
    setReviseData({
      id: "",
      name: "",
      brand: "",
      category: "",
      price: 0,
      createdAt: "",
      status: "",
      stock: 0,
      tags: "",
    });
  };

  return (
    <section className="revisePage fixed top-0 left-0 z-[10] w-[100vw] h-[100vh] backdrop-blur-sm flex items-center justify-center">
      <Zoom duration={500}>
        <div className="absolute z-[10] top-[50%] left-[50%] bg-black/90 w-auto h-auto -translate-x-[50%] -translate-y-[50%] p-4 px-8 backdrop-blur-sm  text-white flex flex-col gap-4 items-center">
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
              <span className="text-red-500">{prevData.id}</span>
            </p>
            {/* Name */}
            <Reviseitem
              label={"Name"}
              name={"name"}
              prevData={prevData.name}
              type={"text"}
              value={reviseData.name}
              setReviseData={setReviseData}
            />

            <hr className="border border-white/50 w-full" />
            {/* 修改 Brand */}
            <Reviseitem
              label={"Brand"}
              name={"brand"}
              prevData={prevData.brand}
              type={"text"}
              value={reviseData.brand}
              setReviseData={setReviseData}
            />
            <hr className="border border-white/50 w-full" />
            {/* Category */}
            <ReviseSelect
              label={"Category"}
              name={"category"}
              prevData={prevData.category}
              value={reviseData.category}
              setReviseData={setReviseData}
            />
            {/* <Reviseitem
          label={"Category"}
          name={"category"}
          prevData={prevData.category}
          type={"text"}
          value={reviseData.category}
          setReviseData={setReviseData}
        /> */}
            <hr className="border border-white/50 w-full" />
            {/* Price */}
            <ReviseNum
              label={"Price"}
              name={"price"}
              prevData={prevData.price}
              type={"number"}
              value={reviseData.price}
              setReviseData={setReviseData}
            />
            <hr className="border border-white/50 w-full" />
            {/* Date */}
            <Reviseitem
              label={"Date"}
              name={"createdAt"}
              prevData={prevData.createdAt}
              type={"date"}
              value={reviseData.createdAt}
              setReviseData={setReviseData}
            />
            <hr className="border border-white/50 w-full" />
            {/* Status */}
            <ReviseSelect
              label={"Status"}
              name={"status"}
              prevData={prevData.status}
              value={reviseData.status}
              setReviseData={setReviseData}
            />
            <hr className="border border-white/50 w-full" />
            {/* Stock */}
            <ReviseNum
              label={"Stock"}
              name={"stock"}
              prevData={prevData.stock}
              type={"number"}
              value={reviseData.stock}
              setReviseData={setReviseData}
            />
            <hr className="border border-white/50 w-full" />
            {/* Tags */}
            <Reviseitem
              label={"Tags"}
              name={"tags"}
              prevData={prevData.tags}
              type={"text"}
              value={reviseData.tags}
              setReviseData={setReviseData}
            />
            <hr className="border border-white/50 w-full" />
          </div>

          <Button label={"Confirm"} type="button" onClick={handleSubmit} />
        </div>
      </Zoom>
    </section>
  );
};

export default RevisePage;
