import { TextField } from "@mui/material";
import React from "react";

export interface CafeGridFiltersProps {
  location: string;
  setLocation: (location: string) => void;
}

const CafeGridFilters: React.FC<CafeGridFiltersProps> = ({
  location,
  setLocation,
}) => {
  return (
    <>
      <TextField
        label="Location"
        variant="standard"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </>
  );
};

export default CafeGridFilters;
