import React from "react";

const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: {
    Header: string;
    accessor: string;
    className?: string;
  }[];
  renderRow: (data: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-sm text-left text-gray-500">
          {columns.map((column, index) => (
            <th
              key={index}
              className={`py-2 px-4 ${
                column.className ? column.className : ""
              }`}
            >
              {column.Header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item: any) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
