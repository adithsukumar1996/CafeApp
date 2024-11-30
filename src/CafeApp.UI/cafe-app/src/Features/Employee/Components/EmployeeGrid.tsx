import { AgGridReactProps, AgGridReact } from "ag-grid-react";
import { FC, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ICellRendererParams } from "ag-grid-community";
import ActionsCellRenderer from "../../Common/Components/ActionCellsRenderer";
import ConfirmationPopup from "../../Common/Components/ConfirmationPopup";
import { BaseGridProps } from "../../Common/Models/BaseGridProps";
import { GetEmployeeResponse } from "../Models/GetEmployeeResponse";
import {
  deleteEmployee,
  getEmployeeResponse,
} from "../Services/EmployeeApiService";

export interface EmployeeGridProps extends BaseGridProps {
  filters?: { cafe?: string };
}

const EmployeeGrid: FC<EmployeeGridProps> = ({ filters, showActions }) => {
  const [employees, setEmployees] = useState<Array<GetEmployeeResponse>>([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();
  const gridRef = useRef<AgGridReact>(null);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  const columnDefs: AgGridReactProps<GetEmployeeResponse>["columnDefs"] = [
    { headerName: "Employee Id", field: "id", sortable: true },
    { headerName: "Name", field: "name", sortable: true },
    { headerName: "Email Address", field: "emailAddress", sortable: true },
    { headerName: "Phone Number", field: "phoneNumber", sortable: true },
    { headerName: "Cafe Name", field: "cafe", sortable: true },
    { headerName: "Days Worked", field: "daysWorked", sortable: true },
    ...(showActions
      ? [
          {
            headerName: "Actions",
            cellRenderer: (
              params: ICellRendererParams<GetEmployeeResponse>
            ) => (
              <ActionsCellRenderer
                key={params.data?.id}
                onDelete={() =>
                  params.data?.id && handleDelete(params.data?.id)
                }
                onEdit={() => {
                  params.data?.id &&
                    navigate(`/employee/edit/${params.data?.id}`);
                }}
              />
            ),
          },
        ]
      : []),
  ];

  useEffect(() => {
    getEmployeeResponse(filters?.cafe ?? "").then((response) =>
      setEmployees(response)
    );
  }, [filters?.cafe]);

  return (
    <>
      <AgGridReact
        rowData={employees}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        onGridReady={() => {
          if (gridRef.current) {
            gridRef.current.api.sizeColumnsToFit();
          }
        }}
      />
      <ConfirmationPopup
        open={open}
        message="Confirm Deletion of Employee"
        title="Confirm"
        onCancel={() => {
          setOpen(false);
          setDeleteId(null);
        }}
        onConfirm={() => {
          if (deleteId) {
            deleteEmployee(deleteId).then(() => {
              setOpen(false);
              setDeleteId(null);
              getEmployeeResponse(filters?.cafe).then((response) =>
                setEmployees(response)
              );
            });
          }
        }}
      />
    </>
  );
};

export default EmployeeGrid;
