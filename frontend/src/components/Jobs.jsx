import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { FilterCard } from "./FilterCard";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 flex h-[calc(100vh-4rem)]">
        <div className="flex-shrink-0 w-64 bg-white rounded-md shadow-md p-4 fixed h-[calc(100vh-4rem)] ">
          <FilterCard />
        </div>

        {/* Job cards */}
        <div className="flex-1 ml-64 p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"> 
          {allJobs?.length <= 0 ? (
            <span>Job Not Found</span>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {allJobs?.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
