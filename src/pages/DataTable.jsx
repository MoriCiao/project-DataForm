import React from "react";

const th_style = "p-4";

const DataTable = () => {
  return (
    <div className="w-full">
      <form action="" className="text-center w-full">
        <table className={`border `}>
          <thead className={`border `}>
            <tr>
              <th className={`${th_style}`}>ID</th>
              <th className={`${th_style}`}>Name</th>
              <th className={`${th_style}`}>Brand</th>
              <th className={`${th_style}`}>Category</th>
              <th className={`${th_style}`}>Price</th>
              <th className={`${th_style}`}>Date</th>
            </tr>
          </thead>
          <tbody className={`border `}>
            <tr>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
            </tr>
            <tr>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
            </tr>
            <tr>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
            </tr>
            <tr>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
            </tr>
            <tr>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
            </tr>
            <tr>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
              <td>123</td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default DataTable;
