"use client";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();
  const changePage = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        onClick={() => changePage(page - 1)}
        disabled={page === 1}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from({ length: Math.ceil(count / ITEMS_PER_PAGE) }, (_, i) => {
          const pageNumber = i + 1;
          return (
            <button
              key={i}
              onClick={() => changePage(pageNumber)}
              className={`px-2 rounded-sm text-sm ${
                pageNumber === page ? "bg-lamaSky" : "bg-slate-200"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => changePage(page + 1)}
        disabled={page === Math.ceil(count / ITEMS_PER_PAGE)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
