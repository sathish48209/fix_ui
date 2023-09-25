import React, { useEffect, useState } from "react";
import { DataModel } from "../types/Filters";

const FilteredItems: React.FC<{
  data: DataModel[];
}> = ({ data }) => {
  const [cols, setCols] = useState([]);

  useEffect(() => {
    console.log("Filter Data value is ", data);
    mapDynamicColumns();
  }, [data]);
  console.log("Without useeffect", data);

  const thStyle: React.CSSProperties = {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
    textTransform: "capitalize",
  };

  const mapDynamicColumns = (): any => {
    let columns: any = [];
    data.forEach((result) => {
      Object.keys(result).forEach((col) => {
        if (!columns.includes(col)) {
          columns.push(col);
        }
      });
      setCols(columns);
    });
  };

  const mapTableColumns = () => {
    return cols.map((col) => {
      return (
        <th
          style={thStyle}
          key={col}
          scope="col"
          className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          {col}
        </th>
      );
      // }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "3rem",
      }}
    >
      <table>
        <tr>
          <td>Account Group</td>
          <td>Account name</td>
          <td>APIR Code</td>
        </tr>
        {data.map((val) => {
          return (
            <>
              <tr>
                <td>{val.accountGroup}</td>
                <td>{val.accountName}</td>
                <td>{val.apirCode}</td>
              </tr>
            </>
          );
        })}
      </table>
    </div>
  );
};

export default FilteredItems;
