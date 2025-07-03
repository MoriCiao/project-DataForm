import React from "react";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Loading = () => {
  const { state } = useContext(DataContext);

  const isloading = state.loading;

  return (
    <>
      {isloading && (
        <div className="absolute z-[99]  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black/50 rounded-full w-[10rem] h-[10rem] flex items-center justify-center">
          <h1 className="text-white text-xl">Loading...</h1>
        </div>
      )}
    </>
  );
};

export default Loading;
