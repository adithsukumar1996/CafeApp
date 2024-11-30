import { ICellRendererParams } from "ag-grid-community";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionsCellRenderer from "./ActionCellsRenderer";
import ConfirmationPopup from "./ConfirmationPopup";
import { BaseCommandResponse } from "../Models/BaseCommandResponse";

export interface BaseGridProps<T1, T2 extends { id: string }> {
  showActions?: boolean;
  filters: T1;
  getdata: <T1>(filters: T1) => Promise<Array<T2>>;
  colDefs: AgGridReactProps<T2>["columnDefs"];
  entityName: string;
  delete: (id: string) => Promise<BaseCommandResponse>;
}

export function BaseGrid<T1, T2 extends { id: string }>(
  props: BaseGridProps<T1, T2>
) {
  const [data, setData] = useState<Array<T2>>([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();
  const gridRef = useRef<AgGridReact>(null);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  const columnDefs: AgGridReactProps<T2>["columnDefs"] = [
    ...(props.colDefs ? props.colDefs : []),
    ...(props.showActions
      ? [
          {
            headerName: "Actions",
            cellRenderer: (params: ICellRendererParams<T2>) => (
              <ActionsCellRenderer
                key={params.data?.id}
                onDelete={() =>
                  params.data?.id && handleDelete(params.data?.id)
                }
                onEdit={() => {
                  params.data?.id &&
                    navigate(`/${props.entityName}/edit/${params.data?.id}`);
                }}
              />
            ),
          },
        ]
      : []),
  ];

  useEffect(() => {
    props.getdata(props.filters).then((response) => setData(response));
  }, [props.filters]);

  return (
    <>
      <div className="ag-theme-material">
        <AgGridReact
          rowData={data}
          ref={gridRef}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          onGridReady={() => {
            if (gridRef.current) {
              gridRef.current.api.sizeColumnsToFit();
            }
          }}
        />
      </div>
      <ConfirmationPopup
        open={open}
        message={`Confirm Deletion of ${props.entityName}`}
        title="Confirm"
        onCancel={() => {
          setOpen(false);
          setDeleteId(null);
        }}
        onConfirm={() => {
          if (deleteId) {
            props.delete(deleteId).then(() => {
              setOpen(false);
              setDeleteId(null);
              props
                .getdata(props.filters)
                .then((response) => setData(response));
            });
          }
        }}
      />
    </>
  );
}
