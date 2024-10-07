import CountChart from "@/components/CountChart";
import UserCard from "@/components/UserCard";
import React from "react";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex justify-between flex-wrap gap-2">
          <UserCard type="parent" />
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="staff" />
        </div>
        {/* Middle Chart */}
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]"></div>
        </div>
        {/* Bottom Chart */}
        <div></div>
      </div>
      <div className="w-full lg:w-1/3">r</div>
    </div>
  );
};

export default AdminPage;