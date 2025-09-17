import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import AddPage from "../components/AddPage/AddPage";
import DelPage from "../components/DelPage/DelPage";
import RevisePage from "../components/Revise/RevisePage";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  searchFromKey,
  searchFromDate,
  fetchData,
  toggleAddPage,
  toggleTrash,
  deletSelect,
  exporToJson,
  saveData,
} from "../features/dataFormSlice";

// 主要搜尋 id, name , category
const SearchForm = () => {
  const { data, keyword, dateRange, revisePage, addPage, delPage, selected } =
    useSelector((state) => state.dataForm);
  const { setOpenModal, setCurrentPage } = useContext(DataContext);
  const dispath_redux = useDispatch();

  const handleSave = () => {
    dispath_redux(saveData(data));
    setOpenModal({
      isOpen: true,
      title: "Save To LocalStorage",
      text: "已將目前資料存儲至 LocalStorage。",
    });
  };

  const handleDel = () => {
    if (selected.length === 0) return;
    dispath_redux(deletSelect({ item: selected }));
    setCurrentPage(1);
    setOpenModal({
      isOpen: true,
      title: "Selected To Trash",
      text: "已將選取資料轉移至垃圾桶，請至垃圾桶再次核對並刪除。",
    });
  };

  const handleReload = () => {
    dispath_redux(fetchData());
  };

  return (
    <section className="searchForm-area flex w-full flex-wrap items-center justify-center text-black sm:gap-8">
      <div className="w-full sm:grid sm:items-center sm:justify-center sm:gap-4 md:flex md:flex-row md:gap-4">
        <Input
          type="text"
          placeholder="Keyword ..."
          value={keyword}
          onChange={(e) => dispath_redux(searchFromKey(e.target.value))}
        />
        <Input
          type="date"
          placeholder="Keyword ..."
          value={dateRange.start || ""}
          className={"flex justify-center"}
          onChange={(e) =>
            dispath_redux(
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
            dispath_redux(
              searchFromDate({
                start: dateRange.start,
                end: e.target.value || "",
              }),
            )
          }
        />
      </div>
      <div className="sm:grid sm:w-auto sm:grid-cols-3 sm:items-center sm:justify-between sm:gap-8 md:grid-cols-6 md:gap-4">
        <Button
          label="ADD"
          type="button"
          onClick={() => dispath_redux(toggleAddPage())}
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
          onClick={() => dispath_redux(toggleTrash())}
        />
        <Button label="Reloading" type="button" onClick={handleReload} />
        <Button
          label="Export"
          type="button"
          onClick={() => dispath_redux(exporToJson())}
        />
      </div>

      {addPage && <AddPage />}
      {delPage && <DelPage />}
      {revisePage.isOpen && <RevisePage />}
    </section>
  );
};

export default SearchForm;
