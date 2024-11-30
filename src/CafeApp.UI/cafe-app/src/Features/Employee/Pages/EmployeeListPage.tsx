import { FC } from "react";
import { useParams } from "react-router-dom";
import EmployeeGrid from "../Components/EmployeeGrid";

export const EmployeeListPage: FC = () => {
  const { cafe } = useParams<{ cafe: string | undefined }>();
  return (
    <div className="container mx-auto p-4">
      <h6 className="text-xl font-semibold mb-4">Employees</h6>
      <div className="ag-theme-alpine">
        <EmployeeGrid filters={{ cafe: cafe }} showActions={true} />
      </div>
    </div>
  );
};
