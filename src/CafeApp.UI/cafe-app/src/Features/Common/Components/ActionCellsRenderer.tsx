import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
      <IconButton color="primary" onClick={onEdit}>
        <EditIcon />
      </IconButton>
      <IconButton color="secondary" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default ActionsCellRenderer;
