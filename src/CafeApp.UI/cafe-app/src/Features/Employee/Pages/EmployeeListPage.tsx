import { FC } from "react";
import { useParams } from "react-router-dom";
import EmployeeGrid from "../Components/EmployeeGrid";

export const EmployeeListPage: FC = () => {
  const { cafe } = useParams<{ cafe: string | undefined }>();
  return (
    <>
      <h6> Employees</h6>
      <EmployeeGrid filters={{ cafe: cafe }} showActions={true} />
    </>
  );
};
