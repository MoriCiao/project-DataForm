import React from "react";

const SearchBox = ({ parameter, name }) => {
  return (
    <div className="check_id block ">
      <label className="pr-2" htmlFor="">
        {name}
      </label>
      <br />
      <input id={parameter} value={parameter} type="text" />
    </div>
  );
};

const SearchBtn = () => {
  return (
    <buton className={`border border-white px-2 rounded-full `}>Search</buton>
  );
};
// 主要搜尋 id, name , category
const SearchForm = () => {
  return (
    <section className="searchForm-area flex gap-4">
      <input
        className="indent-[0.5rem] w-[10rem]"
        type="text"
        placeholder="Keyword ..."
      />
      <select name="" id="" className="w-[10rem] text-black">
        <option value=""></option>
        <option value="name">Name</option>
        <option value="categroy">Categroy</option>
        <option value="price">Price</option>
        <option value="brand">Brand</option>
      </select>
      <input
        className="indent-[0.5rem] w-[10rem]"
        type="text"
        placeholder="Start Date..."
      />
      <SearchBtn />
    </section>
  );
};

export default SearchForm;
