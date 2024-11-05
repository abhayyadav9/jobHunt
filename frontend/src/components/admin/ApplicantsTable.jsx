import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../utils/constant";

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data || "An error occurred");
    }
  };

  return (
    <div className="my-6 p-5 max-w-full overflow-x-auto">
      <Table className="min-w-full text-black border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <TableCaption className="text-lg font-semibold text-gray-900 p-4 bg-gray-100 border-b border-gray-200">
          A List of Your Recent Applications
        </TableCaption>

        <TableHeader className="bg-blue-500">
          <TableRow>
            <TableHead className="text-white">Full Name</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Contact</TableHead>
            <TableHead className="text-white">Resume</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-right pr-4 text-white">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white text-gray-700">
          {applicants?.applications?.map((item, index) => {
            const rowStatus = item?.status || "Pending";
            const statusColor =
              rowStatus === "Accepted"
                ? "bg-green-100 text-green-700"
                : rowStatus === "Rejected"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700";

            return (
              <TableRow
                key={item._id}
                className={`transition-all ${
                  index % 2 === 0
                    ? "bg-red-400 hover:bg-red-300"
                    : "bg-green-400 hover:bg-green-300"
                } border-b`}
              >
                <TableCell className="py-4 px-6">{item?.applicant?.fullname}</TableCell>
                <TableCell className="py-4 px-6">{item?.applicant?.email}</TableCell>
                <TableCell className="py-4 px-6">{item?.applicant?.phoneNumber}</TableCell>
                <TableCell className="py-4 px-6">
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume.pdf
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell className="py-4 px-6">
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell
                  className={`py-4 px-6 text-right ${statusColor} ${
                    index % 2 === 0
                      ? "bg-red-400 hover:bg-red-300"
                      : "bg-green-400 hover:bg-green-300"
                  } border-b`}
                >
                  <Popover>
                    <PopoverTrigger>
                      <button className="p-2 rounded-full hover:bg-gray-200 transition">
                        <MoreHorizontal className="text-gray-600" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 bg-white text-gray-800 shadow-lg rounded-md p-2">
                      {shortListingStatus.map((status, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer transition"
                          onClick={() => statusHandler(status, item._id)}
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
