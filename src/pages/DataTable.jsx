import { Fragment, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { easeInOut, motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import {
  fetchData,
  selectAllData,
  selectSingleData,
  toggleRevisePage,
} from "../features/dataFormSlice";
import { DataContext } from "../context/DataContext";
import Pagination from "../components/Pagination";
import TheadSortBtn from "../components/Button/TheadSortBtn";
import Button from "../components/Button/Button";
import LoadingModal from "../components/Loading/LoadingModal";
import ErrorModal from "../components/Error/ErrorModal";

const th_style =
  "h-full min-w-[10rem] cursor-pointer border bg-[--theme-Secondary] px-4 transition duration-500 hover:bg-gray-500";
const td_style = "px-4 py-1 border border-white/50 whitespace-nowrap";

const ITEMS_PER_PAGE = 20;

const thMap = [
  "ID",
  "Name",
  "Brand",
  "Category",
  "Price",
  "Date",
  "Status",
  "Stock",
  "Tags",
  "Revise",
];

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
  useEffect(() => {
    dispath_redux(fetchData());
  }, [dispath_redux]);

  if (status === "loading") return <LoadingModal />;

  if (status === "failed") return <ErrorModal />;

  if (status === "succeeded") {
    return (
      <>
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
                {thMap &&
                  thMap.map((th) => {
                    if (th === "Revise")
                      return (
                        <TheadSortBtn
                          key={th}
                          name={th}
                          className={`w-[20rem]`}
                        />
                      );

                    return (
                      <TheadSortBtn
                        key={th}
                        name={th}
                        className={`${isVisible[th] ? "" : "hidden"} sticky`}
                      />
                    );
                  })}
              </tr>
            </thead>
            <tbody>
              {currentItems &&
                currentItems.map((p, index) => {
                  return (
                    <motion.tr
                      key={index}
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
                      {thMap &&
                        thMap.map((td) => {
                          if (td === "Revise")
                            return (
                              <td key={td} className={`${td_style}`}>
                                <Button
                                  type="button"
                                  label="📝"
                                  className={"border-0"}
                                  onClick={() =>
                                    dispath_redux(toggleRevisePage(p))
                                  }
                                />
                              </td>
                            );
                          if (td === "Date")
                            return (
                              <td
                                key={td}
                                className={`${td_style} ${
                                  isVisible.Date ? "" : "hidden"
                                } sticky`}
                              >
                                {p.createdAt}
                              </td>
                            );
                          return (
                            <td
                              key={td}
                              className={`${td_style} ${
                                isVisible[td] ? "" : "hidden"
                              } sticky`}
                            >
                              {p[td.toLowerCase()]}
                            </td>
                          );
                        })}
                    </motion.tr>
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
