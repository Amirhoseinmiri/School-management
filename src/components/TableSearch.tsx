import Image from "next/image";
import React from "react";

const TableSearch = () => {
  return (
    <div className="w-full md:w-auto flex gap-2 items-center text-xs rounded-full ring-[1.5px] ring-gray-300 px-2 h-10">
      <Image src={"/search.png"} alt="" width={14} height={14} />
      <input
        type="text"
        placeholder="search..."
        className="outline-none w-[200px] bg-transparent p-2"
      />
    </div>
  );
};

export default TableSearch;
