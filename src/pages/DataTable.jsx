import React, { Fragment, useContext, useEffect, useState } from "react";
import { easeInOut, motion } from "framer-motion";
import { DataContext } from "../context/DataContext";
import Pagination from "../components/Pagination";
import TableSortBtn from "../components/Button/TableSortBtn";
import Button from "../components/Button/Button";
import { fetchData } from "../features/dataFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { div, p } from "framer-motion/client";
// import { RootState, reduxDispatch } from "../redux/store";

const th_style = "px-12 h-full border  bg-[--theme-Secondary]";
const td_style = "px-4 py-1 border border-white/50 whitespace-nowrap";

const ITEMS_PER_PAGE = 20;

const DataTable = () => {
  const { data, status, error } = useSelector((state) => state.dataForm);
  const dispath_redux = useDispatch();

  const { state, dispatch } = useContext(DataContext);

  const allProducts = state.filter ? state.filtered : state.data;

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

  useEffect(() => {
    dispath_redux(fetchData());
    dispatch({ type: "SET_DATA", payload: data });
  }, [dispath_redux]);

  if (status === "loading") {
    return (
      <div className="absolute top-0 left-0 w-[100vw] h-[100vh] bg-black/80 flex items-center justify-center ">
        <p className=" border-2 border-white/50 w-50 h-50 rounded-full flex items-center justify-center text-xl bg-black/50 ">
          Loading...
        </p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="absolute top-0 left-0 w-[100vw] h-[100vh] bg-black/80 flex items-center justify-center ">
        <p className=" border-2 border-red-500 w-[60%] h-[60%] flex items-center justify-center text-xl bg-black/50 text-red-500 px-8">
          {error}
        </p>
      </div>
    );
  }
  if (status === "succeeded") {
    return (
      <>
        <div className="dataTable overflow-x-auto mb-4 max-h-auto xl:max-w-full w-full">
          <table
            className={`table-auto border-collapse w-full h-full mix-w-[800px]`}
          >
            <thead className={`sticky top-0 h-10 items-center justify-center`}>
              <tr className="">
                <th className={`${th_style} flex justify-center items-center`}>
                  No.
                </th>
                <th className={`${th_style} sticky `}>
                  <motion.input
                    animate={{
                      scale: state.selectAll ? 1.5 : 1.25,
                    }}
                    transition={{ duration: 0.3 }}
                    type="checkbox"
                    checked={state.selectAll}
                    className="scale-125"
                    onChange={(e) =>
                      dispatch({
                        type: "SELECT_ALL",
                        payload: e.target.checked,
                      })
                    }
                  />
                </th>
                <th
                  className={`${th_style} ${
                    state.isVisible.ID ? "" : "hidden"
                  } sticky `}
                >
                  <p className="flex">
                    ID
                    <TableSortBtn name="ID" />
                  </p>
                </th>

                <th
                  className={`${th_style} ${
                    state.isVisible.Name ? "" : "hidden"
                  } sticky`}
                >
                  <p className="flex">
                    Name
                    <TableSortBtn name="Name" />
                  </p>
                </th>
                <th
                  className={`${th_style} ${
                    state.isVisible.Brand ? "" : "hidden"
                  }`}
                >
                  <p className="flex">
                    Brand
                    <TableSortBtn name="Brand" />
                  </p>
                </th>
                <th
                  className={`${th_style} ${
                    state.isVisible.Category ? "" : "hidden"
                  }`}
                >
                  <p className="flex">
                    Category
                    <TableSortBtn name="Category" />
                  </p>
                </th>
                <th
                  className={`${th_style} ${
                    state.isVisible.Price ? "" : "hidden"
                  }`}
                >
                  <p className="flex">
                    Price
                    <TableSortBtn name="Price" />
                  </p>
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
                  <p className="flex">
                    Stock
                    <TableSortBtn name="Stock" />
                  </p>
                </th>
                <th
                  className={`${th_style} ${
                    state.isVisible.Tags ? "" : "hidden"
                  } w-[20rem]`}
                >
                  Tags
                </th>
                <th className={`${th_style} w-[20rem]`}>Revise</th>
              </tr>
            </thead>
            <tbody className={``}>
              {currentItems &&
                currentItems.map((p, index) => {
                  return (
                    <Fragment key={index}>
                      <motion.tr
                        initial={{ backgroundColor: "rgba(0, 0, 0,0)" }}
                        animate={{ backgroundColor: "rgba(0, 0, 0,0)" }}
                        whileHover={{
                          backgroundColor: "rgb(100, 116, 139)",
                        }}
                        transition={{ duration: 0.3, ease: easeInOut }}
                        className="text-center h-[1.5rem]"
                      >
                        <td className={`${td_style}`}>{index + 1}</td>
                        <td className={`${td_style} sticky `}>
                          <motion.input
                            animate={{
                              scale: state.selected.some((i) => i.id === p.id)
                                ? 1.5
                                : 1.25,
                            }}
                            transition={{ duration: 0.3 }}
                            type="checkbox"
                            className="scale-125"
                            // 確保單筆資料在操作時，此資料位置的checkbox狀態會取消
                            checked={state.selected.some((i) => i.id === p.id)}
                            onChange={(e) => {
                              dispatch({
                                type: "SELECT_SINGLE",
                                payload: {
                                  item: p,
                                  checked: e.target.checked,
                                },
                              });
                            }}
                          />
                        </td>

                        <td
                          className={`${td_style} ${
                            state.isVisible.ID ? "" : "hidden"
                          } sticky  `}
                        >
                          {p.id}
                        </td>
                        <td
                          className={`${td_style} ${
                            state.isVisible.Name ? "" : "hidden"
                          } sticky `}
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
                          {p.tags}
                        </td>
                        <td className={`${td_style}`}>
                          <Button
                            type="button"
                            label="📝"
                            className={"border-0"}
                            onClick={() =>
                              dispatch({
                                type: "TOGGLE_REVISE_PAGE",
                                payload: p,
                              })
                            }
                          />
                        </td>
                      </motion.tr>
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
      </>
    );
  }
};

export default DataTable;
