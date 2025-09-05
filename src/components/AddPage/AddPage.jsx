import React, { useEffect, useRef } from "react";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddPage, addItem, addData } from "../../features/dataFormSlice";
import { Zoom } from "react-awesome-reveal";

const AddPage = () => {
  const { newItem } = useSelector((state) => state.dataForm);
  const dispath_redux = useDispatch();
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Zoom
      duration={500}
      className="fixed z-[10] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm"
    >
      <section
        className={`Add-page bg-black/50 border border-white/50 w-auto h-auto  px-4 py-2 rounded`}
      >
        <div className=" flex items-center justify-between">
          <p className="text-white">AddPage</p>
          <span
            className="select-none cursor-pointer"
            onClick={() => {
              dispath_redux(toggleAddPage());
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
              value={newItem.id}
              onChange={(e) =>
                dispath_redux(
                  addItem({ name: e.target.name, value: e.target.value })
                )
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
              value={newItem.name}
              onChange={(e) =>
                dispath_redux(
                  addItem({ name: e.target.name, value: e.target.value })
                )
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
              value={newItem.brand}
              onChange={(e) =>
                dispath_redux(
                  addItem({ name: e.target.name, value: e.target.value })
                )
              }
            />
          </div>

          {/* ADD Category */}
          <div className="w-full flex gap-12 items-center justify-end text-white">
            <Select
              label="Category"
              name="category"
              value={newItem.category}
              className={"w-full border border-white text-black text-center"}
              placeholder={`請輸入商品 Category 資訊 `}
              onChange={(e) =>
                dispath_redux(
                  addItem({ name: e.target.name, value: e.target.value })
                )
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
              value={newItem.price}
              onChange={(e) =>
                dispath_redux(
                  addItem({ name: e.target.name, value: e.target.value })
                )
              }
            />
          </div>

          {/* ADD Date */}

          <div className="w-full flex gap-12 items-center justify-end text-white">
            <Input
              label="Date"
              name="createdAt"
              type="date"
              className={
                "w-full border border-white text-black flex justify-end"
              }
              placeholder={`請輸入商品 Date 資訊 `}
              value={newItem.createdAt || ""}
              onChange={(e) =>
                dispath_redux(
                  addItem({ name: e.target.name, value: e.target.value })
                )
              }
            />
          </div>

          {/* ADD Status */}
          <div className="w-full flex gap-12 items-center justify-end text-white">
            <Select
              label="Status"
              name="status"
              value={newItem.status || ""}
              className={"w-full border border-white text-black text-center"}
              placeholder={`請輸入商品 Status 資訊 `}
              onChange={(e) =>
                dispath_redux(
                  addItem({ name: e.target.name, value: e.target.value })
                )
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
              value={newItem.stock}
              onChange={(e) =>
                dispath_redux(
                  addItem({ name: e.target.name, value: e.target.value })
                )
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
              value={newItem.tags}
              onChange={(e) =>
                dispath_redux(
                  addItem({ name: e.target.name, value: e.target.value })
                )
              }
            />
          </div>

          <Button
            label="ADD"
            type="submit"
            onClick={() => {
              dispath_redux(addData());
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dispath_redux(addData());
              }
            }}
          />
        </form>
      </section>
    </Zoom>
  );
};

export default AddPage;
