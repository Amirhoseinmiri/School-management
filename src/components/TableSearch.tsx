"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const TableSearch = () => {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (e.currentTarget[0] as HTMLInputElement).value;
    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    console.log(
      `${window.location.pathname}?${params}`,
      "window.location.pathname"
    );
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto flex gap-2 items-center text-xs rounded-full ring-[1.5px] ring-gray-300 px-2 h-10"
    >
      <Image src={"/search.png"} alt="" width={14} height={14} />
      <input
        type="text"
        placeholder="search..."
        className="outline-none w-[200px] bg-transparent p-2"
      />
    </form>
  );
};

export default TableSearch;
