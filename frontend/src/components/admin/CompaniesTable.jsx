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
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";

const CompaniesTable = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <Table className="min-w-full">
        <TableCaption className="text-lg font-semibold text-gray-700">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead className="p-4 text-left">Logo</TableHead>
            <TableHead className="p-4 text-left">Name</TableHead>
            <TableHead className="p-4 text-left">Date</TableHead>
            <TableHead className="p-4 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-gray-100 transition duration-150 ease-in-out">
            <TableCell className="p-4">
              <Avatar>
                <AvatarImage
                  src=" "
                  alt="Company Logo"
                  className="rounded-full"
                />
              </Avatar>
            </TableCell>
            <TableCell className="p-4">Company Name</TableCell>
            <TableCell className="p-4">10-10-2020</TableCell>
            <TableCell className="p-4 text-right">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal className="cursor-pointer hover:text-blue-500 transition duration-150 ease-in-out" />
                </PopoverTrigger>
                <PopoverContent className="p-2 w-24 border cursor-pointer hover:bg-slate-200 bg-white shadow-2xl rounded-md">
                  <div className="flex  gap-4">
                    <Edit2 className="" />
                    <span
                      className="text-gray-800 
                    "
                    >
                      {" "}
                      Edit
                    </span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
          {/* Repeat the above TableRow for each company */}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
