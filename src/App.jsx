import { useState } from "react";
import Header from "./pages/Header";
import MainArea from "./pages/MainArea";

import "./style/style.css";

function App() {
  return (
    <div
      className={`APP-area bg-[--bg] text-[--text] flex flex-col w-full items-center`}
    >
      <Header />
      <MainArea />
    </div>
  );
}

export default App;
