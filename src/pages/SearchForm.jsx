import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../context/DataContext";
import { useDispatch, useSelector } from "react-redux";
import {
  searchFromKey,
  searchFromDate,
  fetchData,
  toggleAddPage,
  toggleTrash,
  deletSelect,
  exportToJson,
  saveData,
} from "../features/dataFormSlice";
import AddPage from "../components/AddPage/AddPage";
import DelPage from "../components/DelPage/DelPage";
import RevisePage from "../components/Revise/RevisePage";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

const STYLE = {
  searchForm_input: `searchForm_input w-full sm:grid sm:items-center sm:justify-center sm:gap-4 md:flex md:flex-row md:gap-4`,

  searchForm_operate: `searchForm_operate sm:grid sm:w-auto sm:grid-cols-3 sm:items-center sm:justify-between sm:gap-8 md:grid-cols-6 md:gap-4`,
};

const RenderInputs = () => {
  const { keyword, dateRange } = useSelector((state) => state.dataForm);
  const dispatch_redux = useDispatch();
  return (
    <div className={STYLE.searchForm_input}>
      <Input
        type="text"
        placeholder="Keyword ..."
        value={keyword}
        onChange={(e) => dispatch_redux(searchFromKey(e.target.value))}
      />
      <Input
        type="date"
        placeholder="Keyword ..."
        value={dateRange.start || ""}
        className={"flex justify-center"}
        onChange={(e) =>
          dispatch_redux(
            searchFromDate({
              start: e.target.value,
              end: dateRange.end || "",
            }),
          )
        }
      />
      <Input
        type="date"
        value={dateRange.end || ""}
        className={"flex justify-center"}
        onChange={(e) =>
          dispatch_redux(
            searchFromDate({
              start: dateRange.start,
              end: e.target.value || "",
            }),
          )
        }
      />
    </div>
  );
};

// 主要搜尋 id, name , category
const SearchForm = () => {
  const { data, keyword, dateRange, revisePage, addPage, delPage, selected } =
    useSelector((state) => state.dataForm);
  const { setOpenModal, setCurrentPage } = useContext(DataContext);
  const dispatch_redux = useDispatch();

  const handleSave = useCallback(() => {
    dispatch_redux(saveData(data));
    setOpenModal({
      isOpen: true,
      title: "Save To LocalStorage",
      text: "已將目前資料存儲至 LocalStorage。",
    });
  }, [data, dispatch_redux]);

  const handleDel = useCallback(() => {
    if (selected.length === 0) return;
    dispatch_redux(deletSelect({ item: selected }));
    setCurrentPage(1);
    setOpenModal({
      isOpen: true,
      title: "Selected To Trash",
      text: "已將選取資料轉移至垃圾桶，請至垃圾桶再次核對並刪除。",
    });
  }, [selected, dispatch_redux]);

  const handleReload = useCallback(() => {
    dispatch_redux(fetchData());
  }, [dispatch_redux]);

  const RenderOperate = () => (
    <div className={STYLE.searchForm_operate}>
      <Button
        label="ADD"
        type="button"
        onClick={() => dispatch_redux(toggleAddPage())}
      />

      <Button
        label="DEL"
        type="button"
        onClick={handleDel}
        disable={selected.length === 0}
      />

      <Button label="SAVE" type="button" onClick={handleSave} />
      <Button
        label="🗑️"
        type="button"
        onClick={() => dispatch_redux(toggleTrash())}
      />
      <Button label="Reloading" type="button" onClick={handleReload} />
      <Button
        label="Export"
        type="button"
        onClick={() => dispatch_redux(exportToJson())}
      />
    </div>
  );
  return (
    <section className="searchForm-area flex w-full flex-wrap items-center justify-center text-black sm:gap-8">
      <RenderInputs />

      <RenderOperate />

      {addPage && <AddPage />}
      {delPage && <DelPage />}
      {revisePage.isOpen && <RevisePage />}
    </section>
  );
};

export default SearchForm;
