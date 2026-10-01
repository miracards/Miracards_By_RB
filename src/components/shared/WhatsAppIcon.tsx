import React from "react";

interface WhatsAppIconProps extends React.SVGProps<SVGSVGElement> {
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
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}
      style={{ color, display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}
      {...props}
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101.5 32 1.9 131.5 1.9 254c0 39.2 10.2 77.4 29.6 111.1L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.4 0 224-99.6 224-222.1 0-59.3-23.1-115-65.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7C49.3 323.4 40 289.1 40 254 40 152.4 122.4 70 224.1 70c49.2 0 95.4 19.2 130.2 54 34.8 34.8 53.9 81.1 53.9 130.3 0 101.7-82.5 184.4-184.3 184.4zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.7-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.7 35.2 15.2 49 16.5 66.5 13.9 10.7-1.6 32.8-13.4 39.5-26.4 4.9-13 4.9-24.1 3.5-26.4-1.4-2.3-5.1-3.7-10.6-6.5z" />
    </svg>
  );
}
