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

const STYLE = {
  delPage_mask: `delPage_mask fixed top-0 left-0 z-[10] flex h-[100vh] w-[100vw] items-center justify-center backdrop-blur-sm`,

  delPage_container: `delPage_container flex h-[80vh] min-h-[50vh] w-[80vw] flex-col justify-around rounded bg-black/90 px-4 py-2 text-white`,

  delPage_empty: `delPage_empty flex h-[80%] items-center justify-center rounded border border-white/50 p-4 text-center text-[1.5rem]`,

  delPage_content: `delPage_content h-full min-h-[30vh] w-full overflow-x-auto rounded px-4`,

  delPage_th: "border border-white/50 bg-[--theme-Secondary] px-4",

  delPage_td: "border border-white/50 bg-[--bg] px-4 py-1 whitespace-nowrap",
};

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
    <section ref={focusRef} className={STYLE.delPage_mask}>
      <Zoom duration={500}>
        <div className={STYLE.delPage_container}>
          <div className="mb-4 flex items-center justify-between">
            <p className="">移除商品</p>
            <span
              className="cursor-pointer select-none"
              onClick={() => dispath_redux(toggleTrash())}
            >
              ❌
            </span>
          </div>
          {del_data.length === 0 ? (
            <div className={STYLE.delPage_empty}>目前垃圾桶沒有任何資料...</div>
          ) : (
            <div className={STYLE.delPage_content}>
              <table className={`w-fit min-w-[800px] border-collapse`}>
                <thead className={``}>
                  <tr className={`sticky top-0 border bg-black`}>
                    <th className={STYLE.delPage_th}>No.</th>
                    <th className={STYLE.delPage_th}>ID</th>
                    <th className={STYLE.delPage_th}>Name</th>
                    <th className={STYLE.delPage_th}>Brand</th>
                    <th className={STYLE.delPage_th}>Category</th>
                    <th className={STYLE.delPage_th}>Price</th>
                    <th className={STYLE.delPage_th}>Date</th>
                    <th className={STYLE.delPage_th}>Status</th>
                    <th className={STYLE.delPage_th}>Stock</th>
                    <th className={`${STYLE.delPage_th} w-[20rem]`}>tags</th>
                  </tr>
                </thead>
                <tbody className={``}>
                  {del_data.map((del_d) => {
                    return (
                      <Fragment key={del_d.id}>
                        <tr className="h-[1.5rem] text-center">
                          <td className={STYLE.delPage_td}>
                            {del_d.id.slice(-5)}
                          </td>
                          <td className={STYLE.delPage_td}>{del_d.id}</td>
                          <td className={STYLE.delPage_td}>{del_d.name}</td>
                          <td className={STYLE.delPage_td}>{del_d.brand}</td>
                          <td className={STYLE.delPage_td}>{del_d.category}</td>
                          <td className={STYLE.delPage_td}>${del_d.price}</td>
                          <td className={STYLE.delPage_td}>
                            {del_d.createdAt}
                          </td>
                          <td className={STYLE.delPage_td}>{del_d.status}</td>
                          <td className={STYLE.delPage_td}>{del_d.stock}</td>
                          <td className={STYLE.delPage_td}>{del_d.tags}</td>
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
