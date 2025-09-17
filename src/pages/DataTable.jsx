import React, { Fragment, useContext, useEffect } from "react";
import { easeInOut, motion } from "framer-motion";
import { DataContext } from "../context/DataContext";
import Pagination from "../components/Pagination";
import TableSortBtn from "../components/Button/TableSortBtn";
import Button from "../components/Button/Button";
import {
  fetchData,
  selectAllData,
  selectSingleData,
  toggleRevisePage,
} from "../features/dataFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { Fade } from "react-awesome-reveal";
import LoadingModal from "../components/Loading/LoadingModal";
import ErrorModal from "../components/Error/ErrorModal";

const th_style = "px-12 h-full border  bg-[--theme-Secondary]";
const td_style = "px-4 py-1 border border-white/50 whitespace-nowrap";

const ITEMS_PER_PAGE = 20;

const DataTable = () => {
  const {
    data,
    filtered,
    filter,
    status,
    error,
    selected,
    selectAll,
    isVisible,
  } = useSelector((state) => state.dataForm);
  const dispath_redux = useDispatch();
  const { currentPage, setCurrentPage } = useContext(DataContext);

  const allProducts = filter ? filtered : data;

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
  useEffect(() => {}, [allProducts]);
  useEffect(() => {
    dispath_redux(fetchData());
  }, [dispath_redux]);

  if (status === "loading") return <LoadingModal />;

  if (status === "failed") return <ErrorModal />;

  if (status === "succeeded") {
    return (
      <>
        {/* <LoadingModal /> */}
        <Fade className="dataTable max-h-auto mb-4 w-full overflow-x-auto xl:max-w-full">
          <table
            className={`mix-w-[800px] h-full w-full table-auto border-collapse`}
          >
            <thead className={`sticky top-0 h-10 items-center justify-center`}>
              <tr className="">
                <th className={`${th_style} flex items-center justify-center`}>
                  No.
                </th>
                <th className={`${th_style} sticky`}>
                  <motion.input
                    animate={{
                      scale: selectAll ? 1.5 : 1.25,
                    }}
                    transition={{ duration: 0.3 }}
                    type="checkbox"
                    checked={selectAll}
                    className="scale-125"
                    onChange={(e) =>
                      dispath_redux(selectAllData(e.target.checked))
                    }
                  />
                </th>
                <th
                  className={`${th_style} ${
                    isVisible.ID ? "" : "hidden"
                  } sticky`}
                >
                  <p className="flex">
                    ID
                    <TableSortBtn name="ID" />
                  </p>
                </th>

                <th
                  className={`${th_style} ${
                    isVisible.Name ? "" : "hidden"
                  } sticky`}
                >
                  <p className="flex">
                    Name
                    <TableSortBtn name="Name" />
                  </p>
                </th>
                <th
                  className={`${th_style} ${isVisible.Brand ? "" : "hidden"}`}
                >
                  <p className="flex">
                    Brand
                    <TableSortBtn name="Brand" />
                  </p>
                </th>
                <th
                  className={`${th_style} ${
                    isVisible.Category ? "" : "hidden"
                  }`}
                >
                  <p className="flex">
                    Category
                    <TableSortBtn name="Category" />
                  </p>
                </th>
                <th
                  className={`${th_style} ${isVisible.Price ? "" : "hidden"}`}
                >
                  <p className="flex">
                    Price
                    <TableSortBtn name="Price" />
                  </p>
                </th>
                <th className={`${th_style} ${isVisible.Date ? "" : "hidden"}`}>
                  Date
                </th>
                <th
                  className={`${th_style} ${isVisible.Status ? "" : "hidden"}`}
                >
                  Status
                </th>
                <th
                  className={`${th_style} ${isVisible.Stock ? "" : "hidden"}`}
                >
                  <p className="flex">
                    Stock
                    <TableSortBtn name="Stock" />
                  </p>
                </th>
                <th
                  className={`${th_style} ${
                    isVisible.Tags ? "" : "hidden"
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
                        className="h-[1.5rem] text-center"
                      >
                        <td className={`${td_style}`}>{index + 1}</td>
                        <td className={`${td_style} sticky`}>
                          <motion.input
                            animate={{
                              scale: selected.some((i) => i.id === p.id)
                                ? 1.5
                                : 1.25,
                            }}
                            transition={{ duration: 0.3 }}
                            type="checkbox"
                            className="scale-125"
                            // 確保單筆資料在操作時，此資料位置的checkbox狀態會取消
                            checked={selected.some((i) => i.id === p.id)}
                            onChange={(e) => {
                              dispath_redux(
                                selectSingleData({
                                  item: p,
                                  checked: e.target.checked,
                                }),
                              );
                            }}
                          />
                        </td>

                        <td
                          className={`${td_style} ${
                            isVisible.ID ? "" : "hidden"
                          } sticky`}
                        >
                          {p.id}
                        </td>
                        <td
                          className={`${td_style} ${
                            isVisible.Name ? "" : "hidden"
                          } sticky`}
                        >
                          {p.name}
                        </td>
                        <td
                          className={`${td_style} ${
                            isVisible.Brand ? "" : "hidden"
                          }`}
                        >
                          {p.brand}
                        </td>
                        <td
                          className={`${td_style} ${
                            isVisible.Category ? "" : "hidden"
                          }`}
                        >
                          {p.category}
                        </td>
                        <td
                          className={`${td_style} ${
                            isVisible.Price ? "" : "hidden"
                          }`}
                        >
                          ${p.price}
                        </td>
                        <td
                          className={`${td_style} ${
                            isVisible.Date ? "" : "hidden"
                          }`}
                        >
                          {p.createdAt}
                        </td>
                        <td
                          className={`${td_style} ${
                            isVisible.Status ? "" : "hidden"
                          }`}
                        >
                          {p.status}
                        </td>
                        <td
                          className={`${td_style} ${
                            isVisible.Stock ? "" : "hidden"
                          }`}
                        >
                          {p.stock}
                        </td>
                        <td
                          className={`${td_style} ${
                            isVisible.Tags ? "" : "hidden"
                          }`}
                        >
                          {p.tags}
                        </td>
                        <td className={`${td_style}`}>
                          <Button
                            type="button"
                            label="📝"
                            className={"border-0"}
                            onClick={() => dispath_redux(toggleRevisePage(p))}
                          />
                        </td>
                      </motion.tr>
                    </Fragment>
                  );
                })}
            </tbody>
          </table>
          <Pagination
            goToPrevPage={goToPrevPage}
            goToNextPage={goToNextPage}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </Fade>
      </>
    );
  }
};

export default DataTable;
