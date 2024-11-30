import React from "react";
import { Button } from "@mui/material";

interface ActionsCellRendererProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionsCellRenderer: React.FC<ActionsCellRendererProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={onEdit}>
        Edit
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={onDelete}
        style={{ marginLeft: 8 }}
      >
        Delete
      </Button>
    </div>
  );
};

export default ActionsCellRenderer;
