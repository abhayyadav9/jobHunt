// import React, { useState } from "react";
// import { Button } from "../ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import { Label } from "@radix-ui/react-label";
// import { Input } from "../ui/input";
// import Navbar from "../shared/Navbar";
// import { useSelector } from "react-redux";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import axios from "axios";
// import { JOB_API_END_POINT } from "../utils/constant";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

// const PostJob = () => {
//   const [input, setInput] = useState({
//     title: "",
//     description: "",
//     salary: "",
//     requirements: "",
//     location: "",
//     position: "",
//     experience: "",
//     jobType: "",
//     companyId: "",
//   });
//   const { companies } = useSelector((store) => store.company);
//   const [loading, setLoading] = useState(false); // Fixed this line

//   const ChangeEventHandler = (e) => {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const navigate = useNavigate();

//   const selectChangeHandler = (value) => {
//     const selectedCompany = companies.find(
//       (company) => company.name.toLowerCase() === value
//     );
//     if (selectedCompany) {
//       setInput({
//         ...input,
//         companyId: selectedCompany._id,
//       });
//     }
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault(); // Prevent default form submission
//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `http://localhost:8000/api/v1/job/post`,
//         input,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         navigate("/admin/jobs");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.error || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="p-6 bg-gray-100 min-h-screen">
//         <div className="flex justify-between items-center mb-8">
//           <Button onClick={() => navigate("/admin/jobs")}>Back</Button>
//           <h1 className="text-2xl font-semibold text-gray-800">
//             Create A New Job
//           </h1>
//         </div>

//         <form onSubmit={submitHandler}>
//           <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
//             <div className="grid grid-cols-2 gap-6">
//               <div>
//                 <Label htmlFor="title" className="text-gray-700">
//                   Title
//                 </Label>
//                 <Input
//                   id="title"
//                   type="text"
//                   name="title"
//                   placeholder="Enter Job Title"
//                   value={input.title}
//                   onChange={ChangeEventHandler}
//                   className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="description" className="text-gray-700">
//                   Description
//                 </Label>
//                 <Input
//                   id="description"
//                   type="text"
//                   name="description"
//                   placeholder="Enter Job Description"
//                   value={input.description}
//                   onChange={ChangeEventHandler}
//                   className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="salary" className="text-gray-700">
//                   Salary
//                 </Label>
//                 <Input
//                   id="salary"
//                   type="number"
//                   name="salary"
//                   placeholder="Enter Salary"
//                   value={input.salary}
//                   onChange={ChangeEventHandler}
//                   className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="requirements" className="text-gray-700">
//                   Requirement
//                 </Label>
//                 <Input
//                   id="requirements"
//                   type="text"
//                   name="requirements"
//                   placeholder="Enter Requirements"
//                   value={input.requirements}
//                   onChange={ChangeEventHandler}
//                   className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="location" className="text-gray-700">
//                   Location
//                 </Label>
//                 <Input
//                   id="location"
//                   type="text"
//                   name="location"
//                   placeholder="Enter Location"
//                   value={input.location}
//                   onChange={ChangeEventHandler}
//                   className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="position" className="text-gray-700">
//                   No. of Position
//                 </Label>
//                 <Input
//                   id="position"
//                   type="number"
//                   name="position"
//                   placeholder="Enter Position"
//                   value={input.position}
//                   onChange={ChangeEventHandler}
//                   className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="experience" className="text-gray-700">
//                   Experience
//                 </Label>
//                 <Input
//   id="experience"
//   type="number"
//   name="experience"
//   placeholder="Enter Experience Level (Years)"
//   value={input.experienceLevel}
//   onChange={ChangeEventHandler}
//   className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
// />

//               </div>
//               <div>
//                 <Label htmlFor="jobType" className="text-gray-700">
//                   Job Type
//                 </Label>
//                 <Input
//                   id="jobType"
//                   type="text"
//                   name="jobType"
//                   placeholder="Enter Job Type"
//                   value={input.jobType}
//                   onChange={ChangeEventHandler}
//                   className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               <div className="flex flex-col items-start w-full max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow-md">
//                 <label className="text-gray-700 font-medium mb-2">
//                   Select Company
//                 </label>
//                 <Select onValueChange={selectChangeHandler}>
//                   <SelectTrigger className="w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
//                     <SelectValue placeholder="Select Company" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                     {companies.map((company, index) => (
//                       <SelectItem
//                         key={index}
//                         value={company.name.toLowerCase()}
//                       >
//                         {company.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="mt-8 flex justify-end">
//               {loading ? (
//                 <Button
//                   className="w-full hover:bg-blue-600 font-semibold py-2 px-4 rounded"
//                   disabled
//                 >
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 </Button>
//               ) : (
//                 <Button
//                   type="submit"
//                   className="w-full bg-[#6A38C2] hover:bg-blue-600 font-semibold py-2 px-4 rounded"
//                 >
//                   Post Job
//                 </Button>
//               )}
//             </div>
//           </div>

//           {companies.length === 0 && (
//             <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-md my-4">
//               <div className="text-center text-gray-700">
//                 <p className="text-lg font-semibold mb-2">
//                   No company registered yet.
//                 </p>
//                 <p className="text-sm mb-4">
//                   Please register your company first to access the features.
//                 </p>
//                 <Link
//                   to="/register-company"
//                   className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200"
//                 >
//                   Register Company
//                 </Link>
//               </div>
//             </div>
//           )}
//         </form>
//       </div>
//     </>
//   );
// };

// export default PostJob;

import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { JOB_API_END_POINT } from '../utils/constant';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex items-center justify-center py-10">
                <form onSubmit={submitHandler} className="p-10 max-w-3xl w-full border border-gray-300 shadow-lg rounded-lg bg-white">
                    <div className="flex justify-between items-center mb-6">
                        <Button variant="ghost" onClick={() => navigate(-1)}>
                            <ArrowLeft className="h-5 w-5 mr-1" /> Back
                        </Button>
                        <h2 className="text-xl font-semibold text-gray-700">Post a New Job</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["Title", "Description", "Requirements", "Salary", "Location", "Job Type", "Experience Level", "No of Positions"].map((label, index) => (
                            <div key={index}>
                                <Label>{label}</Label>
                                <Input
                                    type={label === "No of Positions" ? "number" : "text"}
                                    name={label.toLowerCase().replace(/ /g, "")}
                                    value={input[label.toLowerCase().replace(/ /g, "")]}
                                    onChange={changeEventHandler}
                                    className="focus-visible:ring-2 focus-visible:ring-indigo-500 focus:outline-none my-1"
                                />
                            </div>
                        ))}
                        {companies.length > 0 && (
                            <div className="col-span-2">
                                <Label>Company</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-indigo-500">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company.name.toLowerCase()}>{company.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                    <div className="mt-6">
                        {loading ? (
                            <Button className="w-full bg-indigo-500 text-white">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                Post New Job
                            </Button>
                        )}
                    </div>
                    {companies.length === 0 && (
                        <p className="text-sm text-red-600 font-semibold text-center mt-4">
                            *Please register a company first before posting a job.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;
