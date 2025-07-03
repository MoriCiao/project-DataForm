import React, { useContext, useState } from "react";

const Pagination = ({
  goToPrevPage,
  goToNextPage,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
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
        className={`absolute left-0 rounded-sm bg-white/50 text-white border `}
      >
        <input
          type="number"
          className={`w-[5rem] text-center bg-transparent indent-[0.5rem] `}
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
      <button onClick={goToPrevPage} className="border px-4 rounded-full">
        Prev
      </button>
      <span>
        {currentPage} page / {totalPages} pages
      </span>
      <button onClick={goToNextPage} className="border px-4 rounded-full">
        Next
      </button>
    </div>
  );
};

export default Pagination;
