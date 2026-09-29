import React from "react";

interface WhatsAppIconProps extends React.ComponentProps<"i"> {
  size?: number;
  color?: string;
}

export default function WhatsAppIcon({
  size = 20,
  color = "currentColor",
  style,
  className,
  ...props
}: WhatsAppIconProps) {
  return (
    <i
      className={`fa-brands fa-whatsapp${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      style={{ fontSize: size, color, display: "inline-block", verticalAlign: "middle", ...style }}
      {...props}
    />
  );
}
