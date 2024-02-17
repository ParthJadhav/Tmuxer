import { SVGProps } from "react";

function WindowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      className="lucide lucide-panels-top-left"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
      <path d="M3 9h18M9 21V9"></path>
    </svg>
  );
}

export default WindowIcon;
