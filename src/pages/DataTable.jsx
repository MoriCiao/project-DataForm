import React, { Fragment, useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import Pagination from "../components/Pagination";

const th_style = "px-4 border bg-[--theme-Secondary]";
const td_style = "px-4 py-1 border border-white/50 bg-[--bg] whitespace-nowrap";

const ITEMS_PER_PAGE = 20;

const DataTable = () => {
  const { state } = useContext(DataContext);
  // const x = state.data[0].createdAt;
  // console.log(x.length);
  const allProducts = state.filtered.length !== 0 ? state.filtered : state.data;
  // console.log(allProducts);
  // 分頁
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);

  // 每頁分頁資料的 起始Index
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = allProducts.slice(startIndex, endIndex);

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div className="dataTable overflow-x-auto h-[85vh] max-w-[1000px] ">
        <table className={`border w-fit mix-w-[800px]`}>
          <thead className={`sticky top-0`}>
            <tr className="">
              <th className={`${th_style}`}>No.</th>
              <th className={`${th_style}`}>
                <input type="checkbox" />
              </th>
              <th className={`${th_style} sticky left-0 `}>ID</th>
              <th className={`${th_style} sticky left-[100px]`}>Name</th>
              <th className={`${th_style}`}>Brand</th>
              <th className={`${th_style}`}>Category</th>
              <th className={`${th_style}`}>Price</th>
              <th className={`${th_style}`}>Date</th>
              <th className={`${th_style}`}>Status</th>
              <th className={`${th_style}`}>Stock</th>
              <th className={`${th_style} w-[20rem]`}>tags</th>
            </tr>
          </thead>
          <tbody className={``}>
            {currentItems.map((p, index) => {
              return (
                <Fragment key={index}>
                  <tr className="text-center h-[1.5rem]">
                    <td className={`${td_style}`}>{p.id.slice(3, 8)}</td>
                    <td className={`${td_style} `}>
                      <input type="checkbox" />
                    </td>
                    <td className={`${td_style} sticky left-0`}>{p.id}</td>
                    <td className={`${td_style} sticky left-[100px]`}>
                      {p.name}
                    </td>
                    <td className={`${td_style} `}>{p.brand}</td>
                    <td className={`${td_style}`}>{p.category}</td>
                    <td className={`${td_style}`}>${p.price}</td>
                    <td className={`${td_style}`}>{p.createdAt}</td>
                    <td className={`${td_style}`}>{p.status}</td>
                    <td className={`${td_style}`}>{p.stock}</td>
                    <td className={`${td_style}`}>{p.tags.join(" ")}</td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 分頁按鈕 */}
      <Pagination
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default DataTable;
