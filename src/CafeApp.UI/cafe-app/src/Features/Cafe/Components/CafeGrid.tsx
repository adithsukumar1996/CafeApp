import { AgGridReactProps, AgGridReact } from "ag-grid-react";
import { FC, useState, useEffect, useRef } from "react";
import { GetCafeResponse } from "../Models/GetCafeResponse";
import { getCafeListResponse, deleteCafe } from "../Services/CafeApiService";
import { Link, useNavigate } from "react-router-dom";
import { ICellRendererParams } from "ag-grid-community";
import ActionsCellRenderer from "../../Common/Components/ActionCellsRenderer";
import ConfirmationPopup from "../../Common/Components/ConfirmationPopup";
import LogoBase64View from "../../Common/Components/LogoBase64View";
import { BaseGridProps } from "../../Common/Models/BaseGridProps";

export interface CafeGridProps extends BaseGridProps {
  filters?: { location?: string };
}

const CafeGrid: FC<CafeGridProps> = ({ filters, showActions }) => {
  const [cafes, setCafes] = useState<Array<GetCafeResponse>>([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();
  const gridRef = useRef<AgGridReact>(null);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  const columnDefs: AgGridReactProps<GetCafeResponse>["columnDefs"] = [
    { headerName: "Id", field: "id" },
    { headerName: "Name", field: "name", sortable: true },
    { headerName: "Description", field: "description", sortable: true },
    {
      headerName: "Employees",
      field: "employees",
      sortable: true,
      cellRenderer: (params: ICellRendererParams<GetCafeResponse>) => (
        <Link to={`/employee/${params.data?.id}`}>
          {params.data?.employees}
        </Link>
      ),
    },
    { headerName: "Location", field: "location", sortable: true },
    {
      headerName: "Logo",
      field: "logo",
      cellRenderer: (params: ICellRendererParams<GetCafeResponse>) => (
        <LogoBase64View base64String={params?.data?.logo ?? ""} />
      ),
    },
    ...(showActions
      ? [
          {
            headerName: "Actions",
            cellRenderer: (params: ICellRendererParams<GetCafeResponse>) => (
              <ActionsCellRenderer
                key={params.data?.id}
                onDelete={() =>
                  params.data?.id && handleDelete(params.data?.id)
                }
                onEdit={() => {
                  params.data?.id && navigate(`/cafe/edit/${params.data?.id}`);
                }}
              />
            ),
          },
        ]
      : []),
  ];

  useEffect(() => {
    getCafeListResponse(filters?.location).then((response) =>
      setCafes(response)
    );
  }, [filters?.location]);

  return (
    <>
      <AgGridReact
        rowData={cafes}
        ref={gridRef}
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
        message="Confirm Deletion of Cafe"
        title="Confirm"
        onCancel={() => {
          setOpen(false);
          setDeleteId(null);
        }}
        onConfirm={() => {
          if (deleteId) {
            deleteCafe(deleteId).then(() => {
              setOpen(false);
              setDeleteId(null);
              getCafeListResponse(filters?.location).then((response) =>
                setCafes(response)
              );
            });
          }
        }}
      />
    </>
  );
};

export default CafeGrid;
