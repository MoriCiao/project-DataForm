import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import AddPage from "../components/AddPage/AddPage";
import DelPage from "../components/DelPage/DelPage";
import RevisePage from "../components/Revise/RevisePage";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

// 主要搜尋 id, name , category
const SearchForm = () => {
  const { state, dispatch } = useContext(DataContext);

  const handleReload = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    // 嘗試模仿加載資料
    setTimeout(async () => {
      try {
        const res = await fetch("/project-DataForm/product_data_2000.json");
        const jsonData = await res.json();
        console.log(`目前抓取 ${jsonData.length} 筆資料..`);
        dispatch({ type: "SET_DATA", payload: jsonData });
        localStorage.setItem("my_dataForm", JSON.stringify(jsonData));

        /*
          居家生活: 407;
          文具用品: 397;
          運動用品: 403;
          電子產品: 386;
          食品飲料: 407;
          */
      } catch (error) {
        console.log(`Data Loading Fail ..., ${error} `);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }, 2000);
  };

  const exportToJson = (data, filename = "myData.json") => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <section className="searchForm-area flex flex-wrap items-center justify-center sm:gap-8 text-black w-full">
      <div className="w-full md:flex md:gap-4 md:flex-row sm:items-center sm:justify-center  sm:grid sm:gap-4 ">
        <Input
          type="text"
          placeholder="Keyword ..."
          value={state.keyword}
          onChange={(e) =>
            dispatch({ type: "SEARCH_DATA", payload: e.target.value })
          }
        />
        <Input
          type="date"
          placeholder="Keyword ..."
          value={state.dateRange.start || ""}
          className={"flex justify-center"}
          onChange={(e) =>
            dispatch({
              type: "DATE_SORT",
              payload: {
                start: e.target.value,
                end: state.dateRange.end || "",
              },
            })
          }
        />
        <Input
          type="date"
          value={state.dateRange.end || ""}
          className={"flex justify-center"}
          onChange={(e) =>
            dispatch({
              type: "DATE_SORT",
              payload: {
                end: e.target.value,
                start: state.dateRange.start || "",
              },
            })
          }
        />
      </div>
      <div className="md:grid-cols-6 md:gap-4 sm:grid sm:grid-cols-3 sm:gap-8 sm:items-center sm:justify-between sm:w-auto">
        <Button
          label="ADD"
          type="button"
          onClick={() => dispatch({ type: "TOGGLE_ADD_PAGE" })}
        />
        <Button
          label="DEL"
          type="button"
          onClick={() =>
            dispatch({
              type: "DEL_SELECTED",
              payload: { item: state.selected },
            })
          }
        />
        <Button
          label="SAVE"
          type="button"
          onClick={() => dispatch({ type: "SAVE_DATA", payload: state.data })}
        />
        <Button
          label="🗑️"
          type="button"
          onClick={() => dispatch({ type: "TOGGLE_DEL_PAGE" })}
        />
        <Button label="Reloading" type="button" onClick={handleReload} />
        <Button
          label="Export"
          type="button"
          onClick={() => exportToJson(state.data, "myData.json")}
        />
      </div>

      {state.addPage && <AddPage />}
      {state.delPage && <DelPage />}
      {state.revisePage.isOpen && <RevisePage />}
    </section>
  );
};

export default SearchForm;
