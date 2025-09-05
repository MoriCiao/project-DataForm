import React, { Fragment, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import Button from "../Button/Button";
import {
  toggleTrash,
  undo,
  confirmDeletData,
} from "../../features/dataFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { Zoom } from "react-awesome-reveal";

const th_style = "px-4 border border-white/50 bg-[--theme-Secondary]";
const td_style = "px-4 py-1 border border-white/50 bg-[--bg] whitespace-nowrap";

const DelPage = () => {
  const { data, keyword, dateRange, revisePage, addPage, delPage, del_data } =
    useSelector((state) => state.dataForm);
  const dispath_redux = useDispatch();
  console.log(del_data);
  const { state, dispatch } = useContext(DataContext);
  // const del_data = state.del_data;

  return (
    <Zoom
      duration={500}
      className="fixed z-[10] top-1/2 left-1/2-translate-x-1/2 -translate-y-1/2 backdrop-blur-sm"
    >
      <section
        className={`Del-page  bg-black/90 w-[80vw] h-[80vh] flex flex-col justify-around  rounded min-h-[50vh]  px-4 py-2 text-white`}
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
                        <td className={`${td_style}`}>{del_d.id.slice(-5)}</td>
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
            onClick={() => dispath_redux(undo(del_data))}
          />
          <Button
            type="button"
            label="Delete !"
            onClick={() => {
              dispath_redux(confirmDeletData());
            }}
          />
        </div>
      </section>
    </Zoom>
  );
};

export default DelPage;
