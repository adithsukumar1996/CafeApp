import React from "react";
import CafeForm from "../Components/CafeForm";
import { useParams } from "react-router";

const CafeEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <CafeForm id={id} />
    </>
  );
};

export default CafeEditPage;
