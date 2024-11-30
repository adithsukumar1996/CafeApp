import React from "react";

interface LogoBase64ViewProps {
  base64String: string;
  altText?: string;
  width?: string;
  height?: string;
}

const LogoBase64View: React.FC<LogoBase64ViewProps> = ({
  base64String,
  altText = "Logo",
  width = "100px",
  height = "100px",
}) => {
  return (
    <img
      src={`${base64String}`}
      alt={altText}
      width={width}
      height={height}
      style={{ objectFit: "contain" }}
    />
  );
};

export default LogoBase64View;
