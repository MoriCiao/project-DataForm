import React, { useContext, useState } from "react";
import { easeInOut, motion } from "framer-motion";
import { DataContext } from "../context/DataContext";
const Pagination = ({
  goToPrevPage,
  goToNextPage,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const { BtnAnimate } = useContext(DataContext);

  const [changePage, setChangePage] = useState("");
  const currentInput = changePage;

  // document.addEventListener("keyDown", (e) => {
  //   console.log(e.key);
  // });

  const handlePage = () => {
    const page = Number(currentInput);
    if (page !== "" && page <= totalPages && page >= 1) {
      setCurrentPage(page);
    } else if (page > totalPages) {
      alert(`輸入的值必須小於 ${totalPages}`);
    } else if (page < 1) {
      alert(`輸入的值必須大於 1`);
    }

    setChangePage("");
  };

  return (
    <div className="relative flex flex-row items-center justify-center gap-4 my-4">
      <div
        className={`absolute md:left-0 sm:left-[-3rem] rounded-sm bg-white/50 text-white border `}
      >
        <motion.input
          whileFocus={{ backgroundColor: "#F1F5F9", color: "#0F172A" }}
          transition={{ duration: 0.3 }}
          type="number"
          className={`md:w-[8rem] sm:w-[4rem] text-center bg-transparent indent-[0.5rem] `}
          placeholder="請輸入頁數..."
          step="1"
          min="1"
          max={totalPages}
          value={changePage}
          onChange={(e) => {
            setChangePage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePage();
            }
          }}
        />
        <button
          className={`border-l border-gray-200 px-2`}
          onClick={handlePage}
        >
          Go
        </button>
      </div>

      {/* ------------------------------------------------------------------ */}
      <motion.button
        whileHover={{
          backgroundColor: "rgb(241, 245, 249)",
          color: "rgb(0,0,0)",
        }}
        transition={{ duration: 0.3, ease: easeInOut }}
        onClick={goToPrevPage}
        className="border px-4 rounded-full"
      >
        Prev
      </motion.button>
      <span>
        {currentPage} page / {totalPages} pages
      </span>
      <motion.button
        whileHover={{
          backgroundColor: "rgb(241, 245, 249)",
          color: "rgb(0,0,0)",
        }}
        transition={{ duration: 0.3, ease: easeInOut }}
        onClick={goToNextPage}
        className="border px-4 rounded-full"
      >
        Next
      </motion.button>
    </div>
  );
};

export default Pagination;
