import { DataProvider } from "./context/DataContext";
import { useEffect, useReducer, useState } from "react";
import Header from "./pages/Header";
import MainArea from "./pages/MainArea";
import Loading from "./components/Loading";
import "./style/style.css";

function App() {
  return (
    <DataProvider>
      <Loading />
      <div
        className={`APP-area bg-[--bg] text-[--text] flex flex-col h-screen w-full items-center`}
      >
        <Header />
        <MainArea />
      </div>
    </DataProvider>
  );
}

export default App;
