import { FC, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CafeGridFilters from "../Components/CafeGridFilters";
import CafeGrid from "../Components/CafeGrid";

export const CafeListPage: FC = () => {
  const [location, setLocation] = useState<string>("");

  return (
    <div className="container mx-auto p-4">
      <h6 className="text-xl font-semibold mb-4">Cafes</h6>
      <div className="mb-4">
        <CafeGridFilters location={location} setLocation={setLocation} />
      </div>
      <div className="ag-theme-alpine">
        <CafeGrid filters={{ location: location }} showActions={true} />
      </div>
    </div>
  );
};
