import React, { Fragment, useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import Pagination from "../components/Pagination";
import { PropsSortBtn } from "../components/SortBtn";
const th_style = "px-4 border bg-[--theme-Secondary]";
const td_style = "px-4 py-1 border border-white/50 bg-[--bg] whitespace-nowrap";

const ITEMS_PER_PAGE = 20;

const DataTable = () => {
  const { state, dispatch } = useContext(DataContext);
  // console.log("state.filter", state.filter);

  const allProducts = state.filter ? state.filtered : state.data;

  // console.log("目前選取的資料有：", state.selected);
  // console.log("目前刪除的資料有：", state.del_data);
  // const x = state.data[0].createdAt;
  // console.log(x.length);
  // console.log("allProducts is ,", allProducts);
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
              <th className={`${th_style} flex justify-center`}>
                No. <PropsSortBtn propsName={"No"} />
              </th>
              <th className={`${th_style} sticky left-[0px]`}>
                <input
                  type="checkbox"
                  className="scale-125"
                  onClick={() =>
                    dispatch({ type: "SELECT_ALL", payload: !state.selectAll })
                  }
                />
              </th>

              <th
                className={`${th_style} ${
                  state.isVisible.ID ? "" : "hidden"
                } sticky left-[2rem] flex`}
              >
                ID
                <PropsSortBtn propsName={"ID"} />
              </th>

              <th
                className={`${th_style} ${
                  state.isVisible.Name ? "" : "hidden"
                } sticky left-[7rem]`}
              >
                Name
                <PropsSortBtn propsName={"Name"} />
              </th>
              <th
                className={`${th_style} ${
                  state.isVisible.Brand ? "" : "hidden"
                }`}
              >
                Brand
                <PropsSortBtn propsName={"Brand"} />
              </th>
              <th
                className={`${th_style} ${
                  state.isVisible.Category ? "" : "hidden"
                }`}
              >
                Category
                <PropsSortBtn propsName={"Category"} />
              </th>
              <th
                className={`${th_style} ${
                  state.isVisible.Price ? "" : "hidden"
                }`}
              >
                Price
              </th>
              <th
                className={`${th_style} ${
                  state.isVisible.Date ? "" : "hidden"
                }`}
              >
                Date
              </th>
              <th
                className={`${th_style} ${
                  state.isVisible.Status ? "" : "hidden"
                }`}
              >
                Status
              </th>
              <th
                className={`${th_style} ${
                  state.isVisible.Stock ? "" : "hidden"
                }`}
              >
                Stock
                <PropsSortBtn propsName={"Stock"} />
              </th>
              <th
                className={`${th_style} ${
                  state.isVisible.Tags ? "" : "hidden"
                } w-[20rem]`}
              >
                tags
              </th>
            </tr>
          </thead>
          <tbody className={``}>
            {currentItems &&
              currentItems.map((p, index) => {
                return (
                  <Fragment key={index}>
                    <tr className="text-center h-[1.5rem]">
                      <td className={`${td_style}`}>{p.id.slice(3, 8)}</td>
                      <td className={`${td_style} sticky left-[0px]`}>
                        <input
                          type="checkbox"
                          className="scale-125"
                          // 確保單筆資料在操作時，此資料位置的checkbox狀態會取消
                          checked={state.selected.some((i) => i.id === p.id)}
                          onChange={(e) => {
                            dispatch({
                              type: "SELECT_SINGLE",
                              payload: { item: p, checked: e.target.checked },
                            });
                          }}
                        />
                      </td>

                      <td
                        className={`${td_style} ${
                          state.isVisible.ID ? "" : "hidden"
                        } sticky left-[2rem] `}
                      >
                        {p.id}
                      </td>
                      <td
                        className={`${td_style} ${
                          state.isVisible.Name ? "" : "hidden"
                        } sticky left-[7rem]`}
                      >
                        {p.name}
                      </td>
                      <td
                        className={`${td_style} ${
                          state.isVisible.Brand ? "" : "hidden"
                        }`}
                      >
                        {p.brand}
                      </td>
                      <td
                        className={`${td_style} ${
                          state.isVisible.Category ? "" : "hidden"
                        }`}
                      >
                        {p.category}
                      </td>
                      <td
                        className={`${td_style} ${
                          state.isVisible.Price ? "" : "hidden"
                        }`}
                      >
                        ${p.price}
                      </td>
                      <td
                        className={`${td_style} ${
                          state.isVisible.Date ? "" : "hidden"
                        }`}
                      >
                        {p.createdAt}
                      </td>
                      <td
                        className={`${td_style} ${
                          state.isVisible.Status ? "" : "hidden"
                        }`}
                      >
                        {p.status}
                      </td>
                      <td
                        className={`${td_style} ${
                          state.isVisible.Stock ? "" : "hidden"
                        }`}
                      >
                        {p.stock}
                      </td>
                      <td
                        className={`${td_style} ${
                          state.isVisible.Tags ? "" : "hidden"
                        }`}
                      >
                        {p.tags.join(" ")}
                      </td>
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
