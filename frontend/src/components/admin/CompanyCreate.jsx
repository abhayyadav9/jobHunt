import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const CompanyCreate = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Company Name</h1>
        <p className="text-gray-400 ">
          {" "}
          What would you like to give Your Company Name? You can change this
          later{" "}
        </p>
        <Label>Company Nmae</Label>
        <Input
        type="text"
        placeholder="Company Name"
        className="my-3"
        />
      </div>
    </div>
  );
};

export default CompanyCreate;
