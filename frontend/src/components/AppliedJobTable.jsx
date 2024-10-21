import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

const AppliedJobTable = () => {
  return (
    <div className="max-w-7xl mx-auto p-5 bg-white shadow-lg rounded-lg">
      <Table>
        <TableCaption>A list of Your Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            { date: "17-07-2024", role: "Frontend Developer", company: "Google", status: "Selected" },
            { date: "18-07-2024", role: "Backend Developer", company: "Amazon", status: "Interview" },
            { date: "19-07-2024", role: "Fullstack Developer", company: "Microsoft", status: "Rejected" },
            { date: "20-07-2024", role: "UI/UX Designer", company: "Apple", status: "Pending" },
          ].map((job, index) => (
            <TableRow key={index} className="hover:bg-gray-100 transition duration-300">
              <TableCell>{job.date}</TableCell>
              <TableCell>{job.role}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell className="text-right">
                <Badge className={getBadgeClass(job.status)}>
                  {job.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Function to get the badge class based on job status
const getBadgeClass = (status) => {
  switch (status) {
    case "Selected":
      return "bg-green-500 text-white";
    case "Interview":
      return "bg-blue-500 text-white";
    case "Rejected":
      return "bg-red-500 text-white";
    case "Pending":
      return "bg-yellow-500 text-white";
    default:
      return "bg-gray-400 text-white";
  }
};

export default AppliedJobTable;
