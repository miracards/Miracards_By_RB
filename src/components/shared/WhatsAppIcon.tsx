import React from "react";

interface WhatsAppIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function WhatsAppIcon({
  size = 20,
  color = "currentColor",
  style,
  ...props
}: WhatsAppIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
      {...props}
    >
      <path d="M12.04 2.02c-5.52 0-9.99 4.47-9.99 9.99 0 1.76.46 3.49 1.34 5L2 22l4.96-1.3a9.98 9.98 0 0 0 4.99 1.28c5.52 0 9.99-4.47 9.99-9.99S17.56 2.02 12.04 2.02Zm5.45 13.83c-.27.76-1.56 1.45-2.14 1.54-.54.09-1.23.13-3.94-.84-3.36-1.24-5.54-4.28-5.71-4.48-.17-.2-1.39-1.86-1.39-3.53 0-1.67 1.02-2.49 1.38-2.83.35-.34.78-.42 1.04-.42h.75c.26 0 .62.01.95.71.34.72.98 2.18 1.07 2.34.09.17.15.38.04.61-.11.24-.16.38-.32.59-.16.21-.34.46-.49.62-.16.16-.33.35-.14.68.19.33.84 1.38 1.8 2.24 1.24 1.1 2.28 1.44 2.62 1.6.34.17.54.14.74-.08.2-.22.85-.98 1.08-1.32.23-.34.47-.28.8-.17.33.12 2.15 1.01 2.52 1.2.37.19.61.28.7.44.09.16.09.94-.18 1.7Z" />
    </svg>
  );
}
