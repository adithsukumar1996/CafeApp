import React from "react";
import { useParams } from "react-router";
import EmployeeForm from "../Components/EmployeeForm";

const EmployeeEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <div className="container mx-auto p-4">
        <h6 className="text-xl font-semibold mb-4">
          {id ? "Edit Employee" : "Add Employee"}
        </h6>
        <EmployeeForm id={id} />
      </div>
    </>
  );
};

export default EmployeeEditPage;
