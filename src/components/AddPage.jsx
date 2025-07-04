import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";

const AddPage = () => {
  const { state, dispatch } = useContext(DataContext);

  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    stock: "",
    brand: "",
    tags: "",
  });

  const AddLabel = ({ name, value, onChange }) => {
    return (
      <div className="w-auto flex border ">
        <label className="block pt-1 w-[5rem] h-[2rem] text-center bg-[--bg] text-[--text] ">
          {name}
        </label>
        <input
          name={name}
          className="w-[20rem] indent-[0.5rem] text-black rounded-sm h-[2rem]"
          placeholder={`請輸入商品${name}資訊 `}
          type="text"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section
      className={`Add-page fixed z-[10] top-[40%] left-[50%] bg-black/50 w-[80vw] h-auto -translate-x-[50%] -translate-y-[50%] px-4 py-2 text-white`}
    >
      <div className=" flex items-center justify-between">
        <p className="">AddPage</p>
        <span
          onClick={() => {
            dispatch({ type: "CLOSE_ADD_PAGE" });
          }}
        >
          ❌
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="Add-container flex flex-col gap-4 items-center"
      >
        <AddLabel
          name="id"
          value={newItem.id}
          onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
        />
        <AddLabel
          name="name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <AddLabel
          name="category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        />
        <AddLabel
          name="price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <AddLabel
          name="stock"
          value={newItem.stock}
          onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
        />
        <AddLabel
          name="brand"
          value={newItem.brand}
          onChange={(e) => setNewItem({ ...newItem, brand: e.target.value })}
        />
        <AddLabel
          name="tags"
          value={newItem.tags}
          onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
        />
        <button
          onClick={() => console.log(newItem)}
          type="submit"
          className=" border px-2 rounded-full"
        >
          ADD
        </button>
      </form>
    </section>
  );
};

export default AddPage;
