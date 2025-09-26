import { memo, useCallback, useContext, useEffect, useRef } from "react";
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
import { theadList, STYLE } from "./DelPageStyle";
import { DelTh, DelTr } from "./DelPageItems";

const RenderContent = memo(function RenderContent({ data }) {
  if (data.length === 0) {
    return <div className={STYLE.delPage_empty}>目前垃圾桶沒有任何資料...</div>;
  }
  return (
    <div className={STYLE.delPage_content}>
      <table className={`w-fit w-full min-w-[800px] border-collapse`}>
        <thead>
          <tr className={`sticky top-0 border bg-black`}>
            {theadList.map((th, index) => (
              <DelTh key={index} value={th} />
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((del_d, index) => {
            return <DelTr key={del_d.id} index={index} data={del_d}></DelTr>;
          })}
        </tbody>
      </table>
    </div>
  );
});

const DelOperate = memo(function DelOperate({ onUndo, onDelete, disable }) {
  return (
    <div className="mt-2 flex items-center justify-center gap-8">
      <Button type="button" label="Undo" onClick={onUndo} disable={disable} />
      <Button
        type="button"
        label="Delete !"
        onClick={onDelete}
        disable={disable}
      />
    </div>
  );
});

const DelPage = () => {
  const { del_data, delPage } = useSelector((state) => state.dataForm);
  const { setOpenModal } = useContext(DataContext);
  const dispath_redux = useDispatch();
  const focusRef = useRef(null);
  useLockedScroll(delPage);

  const handleUndo = useCallback(() => {
    if (del_data.length === 0) return;
    dispath_redux(undo(del_data));
    setOpenModal({
      isOpen: true,
      title: "Undo Data",
      text: `資料已還原至主檔。`,
    });
  }, []);

  const hanleConfirmDelete = useCallback(() => {
    if (del_data.length === 0) return;
    dispath_redux(confirmDeletData());
    setOpenModal({
      isOpen: true,
      title: "Delete Data",
      text: `資料已移除。`,
    });
  }, []);

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
          <RenderContent data={del_data} />

          <DelOperate
            onUndo={handleUndo}
            onDelete={hanleConfirmDelete}
            disable={!del_data || del_data.length === 0}
          />
        </div>
      </Zoom>
    </section>
  );
};

export default DelPage;
