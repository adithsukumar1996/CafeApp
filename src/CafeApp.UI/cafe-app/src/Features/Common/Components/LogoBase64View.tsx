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
  width = "30px",
  height = "30px",
}) => {
  return (
    base64String &&
    base64String != "" && (
      <img
        src={`${base64String}`}
        alt={altText}
        width={width}
        height={height}
        style={{ objectFit: "contain" }}
      />
    )
  );
};

export default LogoBase64View;
