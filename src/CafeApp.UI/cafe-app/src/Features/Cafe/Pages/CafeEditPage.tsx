import React from "react";
import CafeForm from "../Components/CafeForm";
import { useParams } from "react-router";

const CafeEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <div className="container mx-auto p-4">
        <h6 className="text-xl font-semibold mb-4">
          {id ? "Edit Cafe" : "Add Cafe"}
        </h6>
        <CafeForm id={id} />
      </div>
    </>
  );
};

export default CafeEditPage;
