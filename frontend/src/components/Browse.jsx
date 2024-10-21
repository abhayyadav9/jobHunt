import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";

const randomJobs = [1, 2, 3,1,5,6,7,8,9,]; // Replace this with actual job data as needed

const Browse = () => {
  const {allJobs} = useSelector((store)=>store.job)
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 ml-6">
        <h1 className="text-2xl font-bold">
          Search Result ({allJobs.length})
        </h1>
        <div className="grid grid-cols-3  gap-4 mt-5">
          {allJobs.map((job) => (
            <Job key={job}  job={job}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
