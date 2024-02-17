import { SVGProps } from "react";

function TmuxerLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="28"
      fill="none"
      viewBox="0 0 25 28"
      {...props}
    >
      <path
        stroke={props.color || "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.513"
        d="M2.5 26h20.667M16.532 18.105l-7.387-7.388a5.052 5.052 0 117.144 0l-7.144 7.145"
      ></path>
    </svg>
  );
}

export default TmuxerLogo;
