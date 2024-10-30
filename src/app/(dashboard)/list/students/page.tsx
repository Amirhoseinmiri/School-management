// import Pagination from "@/components/Pagination";
// import Table from "@/components/Table";
// import TableSearch from "@/components/TableSearch";
// import { role, studentsData } from "@/lib/data";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// export type StudentType = {
//   id: number;
//   photo: string;
//   name: string;
//   email?: string;
//   studentId: string;
//   grade: number;
//   class: string;
//   phone?: string;
//   address: string;
// };

// const columns = [
//   {
//     Header: "Info",
//     accessor: "info",
//   },
//   {
//     Header: "Student ID",
//     accessor: "studentId",
//     className: "hidden md:table-cell",
//   },
//   {
//     Header: "Grade",
//     accessor: "grade",
//     className: "hidden md:table-cell",
//   },

//   {
//     Header: "Phone",
//     accessor: "phone",
//     className: "hidden lg:table-cell",
//   },
//   {
//     Header: "Address",
//     accessor: "address",
//     className: "hidden lg:table-cell",
//   },
//   {
//     Header: "Action",
//     accessor: "action",
//   },
// ];
// const StudentsList = () => {
//   const renderRow = (data: StudentType) => {
//     return (
//       <tr
//         key={data.studentId}
//         className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
//       >
//         <td>
//           <Image
//             src={data.photo}
//             alt=""
//             width={40}
//             height={40}
//             className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
//           />
//           <div className="">
//             <h3 className="font-semibold">{data.name}</h3>
//             <p className="text-xs text-gray-500">{data.class}</p>
//           </div>
//         </td>
//         <td className="hidden md:table-cell">{data.studentId}</td>
//         <td className="hidden md:table-cell">{data.grade}</td>
//         <td className="hidden md:table-cell">{data.phone}</td>
//         <td className="hidden md:table-cell">{data.address}</td>
//         <td>
//           <div className="flex items-center gap-2">
//             <Link href={`/list/teachers/${data.id}`}>
//               <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
//                 <Image src={"/view.png"} alt="" width={16} height={16} />
//               </button>
//             </Link>
//             {role === "admin" && (
//               <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
//                 <Image src={"/delete.png"} alt="" width={16} height={16} />
//               </button>
//             )}
//           </div>
//         </td>
//       </tr>
//     );
//   };
//   return (
//     <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
//       {/* Top */}
//       <div className="flex justify-between items-center">
//         <h1 className="hidden md:block text-lg font-semibold">All Teacher</h1>
//         <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
//           <TableSearch />
//           <div className="flex items-center gap-4 self-end">
//             <button className="w-8 h-8 flex items-center justify-center rounded-full">
//               <Image src={"/filter.png"} alt="" width={14} height={14} />
//             </button>
//             <button className="w-8 h-8 flex items-center justify-center rounded-full">
//               <Image src={"/sort.png"} alt="" width={14} height={14} />
//             </button>
//             {role === "admin" && (
//               <button className="w-8 h-8 flex items-center justify-center rounded-full">
//                 <Image src={"/plus.png"} alt="" width={14} height={14} />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* List */}
//       <Table columns={columns} renderRow={renderRow} data={studentsData} />
//       {/* PAGINATION */}
//       <Pagination />
//     </div>
//   );
// };

// export default StudentsList;

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, studentsData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { Class, Prisma, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type StudentType = Student & { class: Class };

const columns = [
  {
    Header: "Info",
    accessor: "info",
  },
  {
    Header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    Header: "Grade",
    accessor: "grade",
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
    Header: "Actions",
    accessor: "action",
  },
];

const StudentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.StudentWhereInput = {};

  const renderRow = (item: StudentType) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/noAvatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class.name}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">{item.class.name[0]}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            //   <Image src="/delete.png" alt="" width={16} height={16} />
            // </button>
            <FormModal table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.class = {
              lessons: {
                some: {
                  teacherId: value,
                },
              },
            };
            break;
          case "search": {
            query.name = { contains: value, mode: "insensitive" };
            break;
          }
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.student.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              //   <Image src="/plus.png" alt="" width={14} height={14} />
              // </button>
              <FormModal table="student" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination count={count} page={p} />
    </div>
  );
};

export default StudentListPage;
