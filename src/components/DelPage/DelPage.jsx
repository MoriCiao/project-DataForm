import { Fragment, useContext, useEffect, useRef } from "react";
import { Zoom } from "react-awesome-reveal";
import { DataContext } from "../../context/DataContext";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleTrash,
  undo,
  confirmDeletData,
} from "../../features/dataFormSlice";
import useLockedScroll from "../../hook/useLockedScroll";
import Button from "../Button/Button";

const th_style = "border border-white/50 bg-[--theme-Secondary] px-4";
const td_style = "border border-white/50 bg-[--bg] px-4 py-1 whitespace-nowrap";

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
      className="Del-page fixed top-0 left-0 z-[10] flex h-[100vh] w-[100vw] items-center justify-center backdrop-blur-sm"
    >
      <Zoom duration={500}>
        <div
          className={`flex h-[80vh] min-h-[50vh] w-[80vw] flex-col justify-around rounded bg-black/90 px-4 py-2 text-white`}
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="">Del_Page</p>
            <span
              className="cursor-pointer select-none"
              onClick={() => dispath_redux(toggleTrash())}
            >
              ❌
            </span>
          </div>
          {del_data.length === 0 ? (
            <div className="flex h-[80%] items-center justify-center rounded border border-white/50 p-4 text-center text-[1.5rem]">
              目前垃圾桶沒有任何資料...
            </div>
          ) : (
            <div className="dataTable h-full min-h-[30vh] w-full overflow-x-auto rounded px-4">
              <table className={`w-fit min-w-[800px] border-collapse`}>
                <thead className={``}>
                  <tr className={`sticky top-0 border bg-black`}>
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
                        <tr className="h-[1.5rem] text-center">
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
          <div className="mt-2 flex items-center justify-center gap-8">
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
