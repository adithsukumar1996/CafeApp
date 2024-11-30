import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import EmployeeGrid from "../Components/EmployeeGrid";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const EmployeeListPage: FC = () => {
  const { cafe } = useParams<{ cafe: string | undefined }>();
  return (
    <div className="container mx-auto p-4">
      <h6 className="text-xl font-semibold mb-4">Employees</h6>
      <div className="w-full flex justify-end">
        <Link to={"/employee/edit"}>
          <Button
            variant="contained"
            color="primary"
            className="h-10 justify-end"
            startIcon={<AddIcon />}
          >
            Add New Employee
          </Button>
        </Link>
      </div>
      <div className="ag-theme-material">
        <EmployeeGrid filters={{ cafe: cafe }} showActions={true} />
      </div>
    </div>
  );
};
