import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import PageInput from "./Pagination/PageInput";
import PageChange from "./Pagination/PageChange";
const Pagination = ({
  goToPrevPage,
  goToNextPage,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const [changePage, setChangePage] = useState("");
  const currentInput = changePage;

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
        className={`absolute md:left-0 sm:left-[-3rem] rounded-md bg-white/50 text-white border `}
      >
        <PageInput
          totalPages={totalPages}
          changePage={changePage}
          setChangePage={setChangePage}
          handlePage={handlePage}
        />
      </div>
      {/* ------------------------------------------------------------------ */}
      <PageChange
        goToPrevPage={goToPrevPage}
        currentPage={currentPage}
        totalPages={totalPages}
        goToNextPage={goToNextPage}
      />
    </div>
  );
};

export default Pagination;
