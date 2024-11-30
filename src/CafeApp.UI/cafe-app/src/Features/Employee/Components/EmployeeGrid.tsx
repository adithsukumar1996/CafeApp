import { AgGridReactProps } from "ag-grid-react";
import { FC } from "react";
import { BaseGridProps } from "../../Common/Models/BaseGridProps";
import { GetEmployeeResponse } from "../Models/GetEmployeeResponse";
import {
  deleteEmployee,
  getEmployeeResponse,
} from "../Services/EmployeeApiService";
import { BaseGrid } from "../../Common/Components/BaseGrid";

export interface EmployeeGridProps extends BaseGridProps {
  filters?: { cafe?: string };
}

const EmployeeGrid: FC<EmployeeGridProps> = ({ filters, showActions }) => {
  const columnDefs: AgGridReactProps<GetEmployeeResponse>["columnDefs"] = [
    { headerName: "Employee Id", field: "id", sortable: true },
    { headerName: "Name", field: "name", sortable: true },
    { headerName: "Email Address", field: "emailAddress", sortable: true },
    { headerName: "Phone Number", field: "phoneNumber", sortable: true },
    { headerName: "Cafe Name", field: "cafe", sortable: true },
    { headerName: "Days Worked", field: "daysWorked", sortable: true },
  ];

  return (
    <>
      <BaseGrid
        colDefs={columnDefs}
        entityName="employee"
        delete={(id) => deleteEmployee(id)}
        filters={filters}
        showActions={showActions}
        getdata={() => getEmployeeResponse(filters?.cafe)}
      />
    </>
  );
};

export default EmployeeGrid;
