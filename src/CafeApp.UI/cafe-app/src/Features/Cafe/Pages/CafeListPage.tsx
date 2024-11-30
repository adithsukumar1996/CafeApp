import { FC, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CafeGridFilters from "../Components/CafeGridFilters";
import CafeGrid from "../Components/CafeGrid";

export const CafeListPage: FC = () => {
  const [location, setLocation] = useState<string>("");

  return (
    <>
      <h6> Cafes</h6>
      <CafeGridFilters location={location} setLocation={setLocation} />
      <CafeGrid filters={{ location: location }} showActions={true} />
    </>
  );
};
