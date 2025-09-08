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
  const dispath_redux = useDispatch();

  const handleReload = () => {
    dispath_redux(fetchData());
  };

  return (
    <section className="searchForm-area flex flex-wrap items-center justify-center sm:gap-8 text-black w-full">
      <div className="w-full md:flex md:gap-4 md:flex-row sm:items-center sm:justify-center  sm:grid sm:gap-4 ">
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
              })
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
              })
            )
          }
        />
      </div>
      <div className="md:grid-cols-6 md:gap-4 sm:grid sm:grid-cols-3 sm:gap-8 sm:items-center sm:justify-between sm:w-auto">
        <Button
          label="ADD"
          type="button"
          onClick={() => dispath_redux(toggleAddPage())}
        />
        <Button
          label="DEL"
          type="button"
          onClick={() => dispath_redux(deletSelect({ item: selected }))}
        />
        <Button
          label="SAVE"
          type="button"
          onClick={
            () => dispath_redux(saveData(data))
            // dispatch({ type: "SAVE_DATA", payload: data })
          }
        />
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
