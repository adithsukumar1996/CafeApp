import { AgGridReactProps } from "ag-grid-react";
import { FC } from "react";
import { GetCafeResponse } from "../Models/GetCafeResponse";
import { getCafeListResponse, deleteCafe } from "../Services/CafeApiService";
import { Link } from "react-router-dom";
import { ICellRendererParams } from "ag-grid-community";
import LogoBase64View from "../../Common/Components/LogoBase64View";
import { BaseGridProps } from "../../Common/Models/BaseGridProps";
import { BaseGrid } from "../../Common/Components/BaseGrid";

export interface CafeGridProps extends BaseGridProps {
  filters?: { location?: string };
}

const CafeGrid: FC<CafeGridProps> = ({ filters, showActions }) => {
  const columnDefs: AgGridReactProps<GetCafeResponse>["columnDefs"] = [
    { headerName: "Id", field: "id" },
    { headerName: "Name", field: "name", sortable: true },
    { headerName: "Description", field: "description", sortable: true },
    {
      headerName: "Employees",
      field: "employees",
      sortable: true,
      cellRenderer: (params: ICellRendererParams<GetCafeResponse>) => (
        <Link
          to={`/employee/${params.data?.id}`}
          className="text-blue-500 hover:underline w-5/5 text-center"
        >
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
  ];

  return (
    <>
      <BaseGrid
        colDefs={columnDefs}
        entityName="cafe"
        delete={(id) => deleteCafe(id)}
        filters={filters}
        showActions={showActions}
        getdata={() => getCafeListResponse(filters?.location)}
      />
    </>
  );
};

export default CafeGrid;
