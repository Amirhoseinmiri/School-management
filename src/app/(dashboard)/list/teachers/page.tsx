import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export type Teacher = {
  id: number;
  photo: string;
  name: string;
  email: string;
  info: string;
  teacherId: string;
  subjects: string[];
  classes: string[];
  phone: string;
  address: string;
};

const columns = [
  {
    Header: "Info",
    accessor: "info",
  },
  {
    Header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    Header: "Subject",
    accessor: "subject",
    className: "hidden md:table-cell",
  },
  {
    Header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    Header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    Header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];
const TeacherPage = () => {
  const renderRow = (data: Teacher) => {
    return (
      <tr
        key={data.teacherId}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
      >
        <td>
          <Image
            src={data.photo}
            alt=""
            width={40}
            height={40}
            className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
          />
          <div className="">
            <h3 className="font-semibold">{data.name}</h3>
            <p className="text-xs text-gray-500">{data.email}</p>
          </div>
        </td>
        <td className="hidden md:table-cell">{data.teacherId}</td>
        <td className="hidden md:table-cell">{data.subjects.join(", ")}</td>
        <td className="hidden md:table-cell">{data.classes.join(", ")}</td>
        <td className="hidden md:table-cell">{data.phone}</td>
        <td className="hidden md:table-cell">{data.address}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link href={`/list/teachers/${data.teacherId}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                <Image src={"/view.png"} alt="" width={16} height={16} />
              </button>
            </Link>
            {role === "admin" && (
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
                <Image src={"/delete.png"} alt="" width={16} height={16} />
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-lg font-semibold">All Teacher</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full">
              <Image src={"/filter.png"} alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full">
              <Image src={"/sort.png"} alt="" width={14} height={14} />
            </button>
            {role && (
              <button className="w-8 h-8 flex items-center justify-center rounded-full">
                <Image src={"/plus.png"} alt="" width={14} height={14} />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={teachersData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default TeacherPage;
