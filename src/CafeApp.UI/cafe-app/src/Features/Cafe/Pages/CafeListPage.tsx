import { FC, useState } from "react";
import CafeGridFilters from "../Components/CafeGridFilters";
import CafeGrid from "../Components/CafeGrid";
import { Button } from "@mui/material";
import { Link } from "react-router";
import AddIcon from "@mui/icons-material/Add";

export const CafeListPage: FC = () => {
  const [location, setLocation] = useState<string>("");

  return (
    <div className="container mx-auto p-4 gap-4">
      <h6 className="text-xl font-semibold mb-4">Cafes</h6>
      <div className="mb-4">
        <CafeGridFilters location={location} setLocation={setLocation} />
      </div>
      <div className="w-full flex justify-end">
        <Link to={"/cafe/edit"}>
          <Button
            variant="contained"
            color="primary"
            className="h-10 justify-end"
            startIcon={<AddIcon />}
          >
            Add New Cafe
          </Button>
        </Link>
      </div>
      <div className="ag-theme-material">
        <CafeGrid filters={{ location: location }} showActions={true} />
      </div>
    </div>
  );
};
