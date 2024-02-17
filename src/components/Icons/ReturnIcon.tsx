import { SVGProps } from "react";

function ReturnIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="lucide lucide-corner-down-left"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M9 10L4 15 9 20"></path>
      <path d="M20 4v7a4 4 0 01-4 4H4"></path>
    </svg>
  );
}

export default ReturnIcon;
