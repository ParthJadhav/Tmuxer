import { SVGProps } from "react";

function TerminalIcon(props: SVGProps<SVGSVGElement>) {
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
      className="lucide lucide-terminal"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M4 17L10 11 4 5"></path>
      <path d="M12 19L20 19"></path>
    </svg>
  );
}

export default TerminalIcon;
