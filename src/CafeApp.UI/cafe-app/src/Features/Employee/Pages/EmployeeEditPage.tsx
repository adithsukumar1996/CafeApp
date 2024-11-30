import React from "react";
import { useParams } from "react-router";
import EmployeeForm from "../Components/EmployeeForm";

const EmployeeEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <EmployeeForm id={id} />
    </>
  );
};

export default EmployeeEditPage;
