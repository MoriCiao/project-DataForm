import React, { Fragment, useContext, useEffect, useRef } from "react";
import { DataContext } from "../../context/DataContext";
import Button from "../Button/Button";
import {
  toggleTrash,
  undo,
  confirmDeletData,
} from "../../features/dataFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { Zoom } from "react-awesome-reveal";
import useLockedScroll from "../../hook/useLockedScroll";

const th_style = "px-4 border border-white/50 bg-[--theme-Secondary]";
const td_style = "px-4 py-1 border border-white/50 bg-[--bg] whitespace-nowrap";

const DelPage = () => {
  const { del_data, delPage } = useSelector((state) => state.dataForm);
  const { setOpenModal } = useContext(DataContext);
  const dispath_redux = useDispatch();
  const focusRef = useRef(null);
  useLockedScroll(delPage);

  const handleUndo = () => {
    if (del_data.length === 0) return;
    dispath_redux(undo(del_data));
    setOpenModal({
      isOpen: true,
      title: "Undo Data",
      text: `資料已還原至主檔。`,
    });
  };

  const hanleConfirmDelete = () => {
    if (del_data.length === 0) return;
    dispath_redux(confirmDeletData());
    setOpenModal({
      isOpen: true,
      title: "Delete Data",
      text: `資料已移除。`,
    });
  };

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  return (
    <section
      ref={focusRef}
      className="Del-page fixed top-0 left-0 z-[10] w-[100vw] h-[100vh] backdrop-blur-sm flex items-center justify-center"
    >
      <Zoom duration={500}>
        <div
          className={`bg-black/90 w-[80vw] h-[80vh] flex flex-col justify-around  rounded min-h-[50vh]  px-4 py-2 text-white`}
        >
          <div className=" flex items-center justify-between mb-4">
            <p className="">Del_Page</p>
            <span
              className="select-none cursor-pointer"
              onClick={() => dispath_redux(toggleTrash())}
            >
              ❌
            </span>
          </div>
          {del_data.length === 0 ? (
            <div className="text-center text-[1.5rem] h-[80%] flex items-center justify-center border border-white/50 rounded p-4">
              目前垃圾桶沒有任何資料...
            </div>
          ) : (
            <div className="dataTable overflow-x-auto min-h-[30vh] h-full w-full  rounded px-4">
              <table className={`border-collapse w-fit min-w-[800px]`}>
                <thead className={``}>
                  <tr className={`sticky top-0 bg-black border`}>
                    <th className={`${th_style}`}>No.</th>
                    <th className={`${th_style}`}>ID</th>
                    <th className={`${th_style}`}>Name</th>
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
                  {del_data.map((del_d) => {
                    return (
                      <Fragment key={del_d.id}>
                        <tr className="text-center h-[1.5rem]">
                          <td className={`${td_style}`}>
                            {del_d.id.slice(-5)}
                          </td>
                          <td className={`${td_style}`}>{del_d.id}</td>
                          <td className={`${td_style} `}>{del_d.name}</td>
                          <td className={`${td_style} `}>{del_d.brand}</td>
                          <td className={`${td_style}`}>{del_d.category}</td>
                          <td className={`${td_style}`}>${del_d.price}</td>
                          <td className={`${td_style}`}>{del_d.createdAt}</td>
                          <td className={`${td_style}`}>{del_d.status}</td>
                          <td className={`${td_style}`}>{del_d.stock}</td>
                          <td className={`${td_style}`}>{del_d.tags}</td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <div className="flex items-center justify-center gap-8 mt-2">
            <Button
              type="button"
              label="Undo"
              onClick={handleUndo}
              disable={del_data.length === 0}
            />
            <Button
              type="button"
              label="Delete !"
              onClick={hanleConfirmDelete}
              disable={del_data.length === 0}
            />
          </div>
        </div>
      </Zoom>
    </section>
  );
};

export default DelPage;
