import React, { useContext, useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Select from "../Select/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleRevisePage,
  confirmRevision,
} from "../../features/dataFormSlice";
import useLockedScroll from "../../hook/useLockedScroll";
import { Zoom } from "react-awesome-reveal";
import { DataContext } from "../../context/DataContext";

const Reviseitem = ({ label, name, prevData, type, setReviseData, value }) => {
  const handleChange = (e) => {
    setReviseData((prev) => ({ ...prev, [name]: e.target.value }));
  };
  return (
    <div className="flex w-full items-center justify-end">
      <span className="w-[10rem] flex-1 text-center">{label} :</span>
      <div className="flex w-[10rem] flex-1 justify-center">
        <p>{prevData}</p>
        <span>{`=>`}</span>
      </div>
      <div className="w-full flex-1">
        <Input
          type={type}
          value={value}
          className={`flex justify-center text-center text-black`}
          placeholder={prevData}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};
const ReviseNum = ({ label, name, prevData, type, setReviseData, value }) => {
  const handleChange = (e) => {
    setReviseData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <div className="flex w-full items-center justify-end">
      <span className="col-start-1 w-[10rem] text-center">{label} :</span>
      <div className="col-span-2 col-start-2 flex w-[10rem] justify-center">
        <p>{prevData}</p>
        <span>{`=>`}</span>
      </div>
      <Input
        type={type}
        value={value}
        min={"0"}
        step={"1"}
        className={`text-center text-black`}
        placeholder={prevData}
        onChange={handleChange}
        required
      />
    </div>
  );
};
const ReviseSelect = ({ label, name, prevData, setReviseData, value }) => {
  const handleChange = (e) => {
    setReviseData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <div className="flex w-full items-center justify-end">
      <span className="col-start-1 w-[10rem] text-center">{label} :</span>
      <div className="col-span-2 col-start-2 flex w-[10rem] justify-center">
        <p>{prevData}</p>
        <span>{`=>`}</span>
      </div>
      <Select
        name={name}
        value={value}
        className={"flex items-center text-center text-black"}
        onChange={handleChange}
        required
      />
    </div>
  );
};

const RevisePage = () => {
  const { revisePage } = useSelector((state) => state.dataForm);
  const { setOpenModal } = useContext(DataContext);
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
    setOpenModal({
      isOpen: true,
      title: "Revise Confirm",
      text: `資料已更新，請重新查詢確認。`,
    });
  };

  return (
    <section className="revisePage fixed top-0 left-0 z-[10] flex h-[100vh] w-[100vw] items-center justify-center backdrop-blur-sm">
      <Zoom duration={500}>
        <div className="absolute top-[50%] left-[50%] z-[10] flex h-auto w-auto -translate-x-[50%] -translate-y-[50%] flex-col items-center gap-4 bg-black/90 p-4 px-8 text-white backdrop-blur-sm">
          <div className="revise-top flex w-full items-center justify-between">
            <p className="">Revise Page</p>
            <span
              className="cursor-pointer select-none"
              onClick={() => {
                dispath_redux(toggleRevisePage());
              }}
            >
              ❌
            </span>
          </div>

          <div className="flex h-full flex-col items-center justify-start gap-2 py-2">
            {/* ID */}

            <p className="w-full border py-2 text-center text-[1.5rem]">
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

            <hr className="w-full border border-white/50" />
            {/* 修改 Brand */}
            <Reviseitem
              label={"Brand"}
              name={"brand"}
              prevData={prevData.brand}
              type={"text"}
              value={reviseData.brand}
              setReviseData={setReviseData}
            />
            <hr className="w-full border border-white/50" />
            {/* Category */}
            <ReviseSelect
              label={"Category"}
              name={"category"}
              prevData={prevData.category}
              value={reviseData.category}
              setReviseData={setReviseData}
            />
            <hr className="w-full border border-white/50" />
            {/* Price */}
            <ReviseNum
              label={"Price"}
              name={"price"}
              prevData={prevData.price}
              type={"number"}
              value={reviseData.price}
              setReviseData={setReviseData}
            />
            <hr className="w-full border border-white/50" />
            {/* Date */}
            <Reviseitem
              label={"Date"}
              name={"createdAt"}
              prevData={prevData.createdAt}
              type={"date"}
              value={reviseData.createdAt}
              setReviseData={setReviseData}
            />
            <hr className="w-full border border-white/50" />
            {/* Status */}
            <ReviseSelect
              label={"Status"}
              name={"status"}
              prevData={prevData.status}
              value={reviseData.status}
              setReviseData={setReviseData}
            />
            <hr className="w-full border border-white/50" />
            {/* Stock */}
            <ReviseNum
              label={"Stock"}
              name={"stock"}
              prevData={prevData.stock}
              type={"number"}
              value={reviseData.stock}
              setReviseData={setReviseData}
            />
            <hr className="w-full border border-white/50" />
            {/* Tags */}
            <Reviseitem
              label={"Tags"}
              name={"tags"}
              prevData={prevData.tags}
              type={"text"}
              value={reviseData.tags}
              setReviseData={setReviseData}
            />
            <hr className="w-full border border-white/50" />
          </div>

          <Button label={"Confirm"} type="button" onClick={handleSubmit} />
        </div>
      </Zoom>
    </section>
  );
};

export default RevisePage;
