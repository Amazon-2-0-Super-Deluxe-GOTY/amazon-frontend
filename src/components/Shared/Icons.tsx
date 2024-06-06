import type { RefAttributes, SVGProps } from "react";

type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ComponentAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;
interface IconProps extends ComponentAttributes {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.96 4.7998L27.25 18.6598C28.1 19.5398 28.1 20.9398 27.25 21.8198L13.96 35.6398"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M26.2498 4.7998L12.9598 18.6598C12.1098 19.5398 12.1098 20.9398 12.9598 21.8198L26.2498 35.6398"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M35.4201 26.45L21.5601 13.16C20.6801 12.31 19.2801 12.31 18.4001 13.16L4.58008 26.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M35.4201 14.5303L21.5601 27.8203C20.6801 28.6703 19.2801 28.6703 18.4001 27.8203L4.58008 14.5303"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.9999 5C15.9999 5 14.0099 6.91 12.8199 9.09C11.4499 11.62 10.7999 14.44 10.5899 17.27C10.2999 21.13 8.70987 23.8 7.16987 25.52C6.30987 26.48 7.02987 28 8.30987 28H31.6899C32.9699 28 33.6899 26.48 32.8299 25.52C31.2899 23.8 29.6999 21.12 29.4099 17.27C29.1999 14.44 28.5499 11.62 27.1799 9.09C25.4699 5.94 23.9999 5 19.9999 5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 31C25 33.21 22.76 35 20 35C17.24 35 15 33.21 15 31"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BestSellerIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.9998 29.1696C26.1633 29.1696 31.1598 24.1731 31.1598 18.0096C31.1598 11.8461 26.1633 6.84961 19.9998 6.84961C13.8363 6.84961 8.83984 11.8461 8.83984 18.0096C8.83984 24.1731 13.8363 29.1696 19.9998 29.1696Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.3205 16.6803C25.1305 16.1003 24.5905 15.7103 23.9805 15.7103H22.3905C22.1305 15.7103 21.9105 15.5403 21.8305 15.3003L21.3405 13.7803C21.3405 13.7803 21.3405 13.7803 21.3405 13.7703C21.2905 13.6103 21.2005 13.4703 21.1005 13.3503C21.0605 13.3003 21.0205 13.2703 20.9705 13.2203C20.9005 13.1503 20.8205 13.0803 20.7305 13.0303C20.6705 12.9903 20.6105 12.9703 20.5505 12.9403C20.4605 12.9003 20.3705 12.8803 20.2705 12.8603C20.2105 12.8503 20.1405 12.8303 20.0805 12.8303C20.0505 12.8303 20.0305 12.8203 20.0005 12.8203C19.8905 12.8203 19.7805 12.8503 19.6805 12.8703C19.6505 12.8703 19.6205 12.8703 19.5905 12.8703C19.5905 12.8703 19.5905 12.8703 19.5805 12.8703C19.1605 13.0003 18.8105 13.3303 18.6705 13.7703L18.1805 15.2803C18.1005 15.5203 17.8705 15.6903 17.6205 15.6903H16.0305C15.4205 15.6903 14.8805 16.0803 14.6905 16.6603C14.5005 17.2403 14.7105 17.8703 15.2005 18.2303L16.4905 19.1703C16.7005 19.3203 16.7805 19.5903 16.7105 19.8303L16.2205 21.3403C16.0305 21.9203 16.2305 22.5503 16.7305 22.9103C16.9805 23.0903 17.2705 23.1803 17.5605 23.1803C17.8505 23.1803 18.1405 23.0903 18.3905 22.9103L19.6805 21.9803C19.8905 21.8303 20.1705 21.8303 20.3805 21.9803L21.6705 22.9103C21.8105 23.0103 21.9605 23.0803 22.1105 23.1203C22.5205 23.2403 22.9605 23.1703 23.3205 22.9103C23.8105 22.5503 24.0205 21.9203 23.8305 21.3403L23.3405 19.8303C23.2605 19.5903 23.3405 19.3203 23.5605 19.1703L24.8505 18.2303C25.3405 17.8703 25.5505 17.2403 25.3605 16.6603L25.3205 16.6803Z"
        fill="#0E2042"
      />
      <path
        d="M14.6105 31.3603L12.9605 33.0103C12.6105 33.3603 11.8005 33.0103 11.4505 32.3603L9.99047 29.6003C9.67047 29.0003 9.14047 28.4703 8.54047 28.1503L5.78047 26.6903C5.13047 26.3503 4.78047 25.5403 5.13047 25.1803L6.78047 23.5303"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.3896 31.3603L27.0396 33.0103C27.3896 33.3603 28.1996 33.0103 28.5496 32.3603L30.0096 29.6003C30.3296 29.0003 30.8596 28.4703 31.4596 28.1503L34.2197 26.6903C34.8697 26.3503 35.2196 25.5403 34.8696 25.1803L33.2197 23.5303"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CreditCardIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.00977 17.9704V12.7604C5.00977 11.4304 6.07977 10.3604 7.40977 10.3604H32.5898C33.9198 10.3604 34.9898 11.4304 34.9898 12.7604V27.2404C34.9898 28.5704 33.9198 29.6404 32.5898 29.6404H7.42977C6.08977 29.6404 5.00977 28.5604 5.00977 27.2204V21.7504"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.9901 14.4199H10.0801"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.9198 17.9697H5.00977"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CustomerReviewsIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.9004 15.4697H28.1004"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9004 21.5098H28.1004"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35 13.7895C35 10.4595 32.3 7.76953 28.98 7.76953H11.02C7.69 7.76953 5 10.4695 5 13.7895V23.1895C5 26.5195 7.7 29.2095 11.02 29.2095H25.07C26.06 29.2095 27.03 29.4095 27.94 29.8095L33.31 32.1395C34.11 32.4895 35 31.8995 35 31.0295V19.6895"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EyeOpenedIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.05957 20.5395C8.27957 15.7095 13.7596 12.5195 19.9996 12.5195C26.2396 12.5195 31.7196 15.7095 34.9396 20.5395"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 28.7802C24.0261 28.7802 27.29 25.5164 27.29 21.4902C27.29 17.464 24.0261 14.2002 20 14.2002C15.9738 14.2002 12.71 17.464 12.71 21.4902C12.71 25.5164 15.9738 28.7802 20 28.7802Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.3 26.4404C28.22 28.9504 24.28 30.4604 20 30.4604C15.72 30.4604 11.79 28.9604 8.70996 26.4504"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.96 11.94V9.54004"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.4805 15.6704L32.4905 13.6504"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.45953 15.6705L7.51953 13.7305"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EyeClosedIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 18.7002C8.23 23.5502 13.74 26.7502 20 26.7502C26.26 26.7502 31.77 23.5502 35 18.7002"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 27.3496V32.1496"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.5703 23.5996L33.9603 26.9996"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.44957 23.5996L6.05957 26.9996"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M25.34 24.0297V33.5797C25.34 34.3597 24.72 34.9997 23.96 34.9997H22.17C21.41 34.9997 20.79 34.3597 20.79 33.5797V25.0597C20.79 24.5397 20.38 24.1097 19.87 24.1097H18.17C17.41 24.1097 16.79 23.4697 16.79 22.6897V21.1497C16.79 20.3697 17.41 19.7297 18.17 19.7297H19.87C20.38 19.7297 20.79 19.3097 20.79 18.7797V17.9597C20.79 16.4797 20.62 14.9897 21.24 13.5997C21.76 12.4297 22.71 11.5197 23.84 10.9897C25.22 10.3297 26.71 10.3197 28.2 10.3497C28.95 10.3697 29.56 10.9997 29.56 11.7697V12.8897C29.56 13.5997 29.05 14.1897 28.37 14.2897C28.26 14.3097 28.14 14.3297 28.03 14.3397C27.35 14.4597 26.63 14.6697 26.09 15.1297C25.4 15.7197 25.29 16.5897 25.26 17.4597C25.24 17.9097 25.27 18.3597 25.3 18.8197C25.33 19.3197 25.73 19.7097 26.22 19.7097H27.77C28.62 19.7097 29.27 20.4897 29.14 21.3597L28.64 24.5697"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.2198 34.9796H12.3998C8.31977 34.9796 5.00977 31.6696 5.00977 27.5896V12.3896"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.4004 5H27.6004C31.6804 5 34.9904 8.31 34.9904 12.39V27.59"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GmailIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M35.0004 18.7002V29.0602C35.0004 30.3802 33.9104 31.4502 32.5904 31.4202L28.4504 31.3302C28.1704 31.3302 27.9404 31.0902 27.9404 30.8102V24.6002"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35 14.5496L27.59 20.2796L20.27 25.8896C20.11 26.0096 19.89 26.0096 19.73 25.8896L12.41 20.2796L5 14.9396V11.7296C5 9.20963 7.88 7.77963 9.89 9.29963L19.73 16.7696C19.89 16.8896 20.11 16.8896 20.26 16.7696L30.1 9.29963C32.11 7.77963 34.99 9.20963 34.99 11.7296V14.5496H35Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.06 24.6096V30.8196C12.06 31.0996 11.83 31.3296 11.55 31.3396L7.41 31.4296C6.09 31.4596 5 30.3896 5 29.0696V19.0996"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5 11.9404H35" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19.9404H35" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 28.0596H35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.9196 32.9898H10.4696C9.82957 32.9898 9.30957 32.6698 9.30957 32.2798V19.7998"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.6901 19.7998V32.2798C30.6901 32.6698 30.1701 32.9898 29.5301 32.9898H23.0801"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35 17.6099L20 8.41992L5 17.6099"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.0799 24.46H16.9199V32.99"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.4004 5H27.6104C31.7004 5 35.0104 8.31 35.0104 12.4V27.61"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.6002 34.9996H12.3902C8.30023 34.9996 4.99023 31.6896 4.99023 27.5996V12.3896"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.0001 26.9201C23.8219 26.9201 26.9201 23.8219 26.9201 20.0001C26.9201 16.1783 23.8219 13.0801 20.0001 13.0801C16.1783 13.0801 13.0801 16.1783 13.0801 20.0001C13.0801 23.8219 16.1783 26.9201 20.0001 26.9201Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.6696 11.2899C30.5296 11.8599 30.0596 12.3299 29.4896 12.4499C28.8596 12.5899 28.2796 12.3699 27.9096 11.9499C27.5896 11.5799 27.4296 11.0699 27.5496 10.5199C27.6796 9.93995 28.1396 9.46995 28.7196 9.32995C29.9196 9.03995 30.9696 10.0899 30.6796 11.2899H30.6696Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5 19.9404H35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 4.94043V17.4304"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.9998 19.9404H22.5098"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 19.9404H17.49C18.88 19.9404 20 21.0604 20 22.4504V34.9404"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23.31 23.51C21.51 25.87 17.36 27 15.5 27C9.7 27 5 22.3 5 16.5C5 10.7 9.7 6 15.5 6C21.3 6 26 10.7 26 16.5C26 17.64 25.82 18.74 25.48 19.77"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.9996 33.9998L23.3096 23.5098"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShoppingCartIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 7.17969H8.8C12.15 7.17969 11.19 11.8897 10.71 13.9197C10.06 16.6497 10.26 19.5597 13.51 20.3497C14.16 20.5097 14.83 20.5597 15.49 20.5597H27.03C27.03 20.5597 27.35 20.5597 27.83 20.6197C31.22 21.0297 30.96 25.4697 27.55 25.4997C27.51 25.4997 27.46 25.4997 27.42 25.4997H14.47"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.0303 8.29004H33.3203C34.6503 8.29004 35.4503 9.78004 34.7103 10.89L30.0603 17.86"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.2603 32.8204C17.4919 32.8204 18.4903 31.8219 18.4903 30.5904C18.4903 29.3588 17.4919 28.3604 16.2603 28.3604C15.0287 28.3604 14.0303 29.3588 14.0303 30.5904C14.0303 31.8219 15.0287 32.8204 16.2603 32.8204Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.4097 32.8204C28.6413 32.8204 29.6397 31.8219 29.6397 30.5904C29.6397 29.3588 28.6413 28.3604 27.4097 28.3604C26.1781 28.3604 25.1797 29.3588 25.1797 30.5904C25.1797 31.8219 26.1781 32.8204 27.4097 32.8204Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarFullIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.8301 34.0101C11.4601 35.0001 9.63011 33.6701 10.1501 32.0601L12.3601 25.2401C12.6701 24.2801 12.3301 23.2301 11.5101 22.6401L5.71011 18.4301C4.34011 17.4401 5.05011 15.2801 6.73011 15.2801H13.9001C14.9101 15.2801 15.8001 14.6301 16.1101 13.6701L18.3201 6.85008C18.8401 5.24008 21.1101 5.24008 21.6401 6.85008L23.8501 13.6701C24.1601 14.6301 25.0601 15.2801 26.0601 15.2801H33.2301C34.9201 15.2801 35.6201 17.4401 34.2501 18.4301L28.4501 22.6401C27.6301 23.2301 27.2901 24.2801 27.6001 25.2401L29.8101 32.0601C30.3301 33.6701 28.4901 35.0001 27.1301 34.0101L21.7001 29.6601C20.8801 29.0001 19.7201 28.9801 18.8701 29.5901L12.8001 34.0101H12.8301Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarHalfEmptyIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.8301 34.0104C11.4601 35.0004 9.63011 33.6704 10.1501 32.0604L12.3601 25.2404C12.6701 24.2804 12.3301 23.2304 11.5101 22.6404L5.71011 18.4304C4.34011 17.4404 5.05011 15.2804 6.73011 15.2804H13.9001C14.9101 15.2804 15.8001 14.6304 16.1101 13.6704L18.3201 6.85039C18.5801 6.05039 19.2801 5.65039 19.9801 5.65039V27.5804C19.9801 28.3204 19.6301 29.0204 19.0301 29.4604L12.8201 34.0104H12.8301Z"
        fill="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.0901 29.4301L12.8301 34.0101C11.4601 35.0001 9.63011 33.6701 10.1501 32.0601L12.3601 25.2401C12.6701 24.2801 12.3301 23.2301 11.5101 22.6401L5.71011 18.4301C4.34011 17.4401 5.05011 15.2801 6.73011 15.2801H13.9001C14.9101 15.2801 15.8001 14.6301 16.1101 13.6701L18.3201 6.85008C18.8401 5.24008 21.1101 5.24008 21.6401 6.85008L23.8501 13.6701C24.1601 14.6301 25.0601 15.2801 26.0601 15.2801H33.2301C34.9201 15.2801 35.6201 17.4401 34.2501 18.4301L28.4501 22.6401C27.6301 23.2301 27.2901 24.2801 27.6001 25.2401L29.8101 32.0601C30.3301 33.6701 28.4901 35.0001 27.1301 34.0101"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarEmptyIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.2499 29.3501L12.8399 34.0101C11.4699 35.0001 9.63987 33.6701 10.1599 32.0601L12.3699 25.2401C12.6799 24.2801 12.3399 23.2301 11.5199 22.6401L5.71987 18.4301C4.34987 17.4401 5.05987 15.2801 6.73987 15.2801H13.9099C14.9199 15.2801 15.8099 14.6301 16.1199 13.6701L18.3299 6.85008C18.8499 5.24008 21.1199 5.24008 21.6499 6.85008L23.8599 13.6701C24.1699 14.6301 25.0699 15.2801 26.0699 15.2801H33.2399C34.9299 15.2801 35.6299 17.4401 34.2599 18.4301L28.4599 22.6401C27.6399 23.2301 27.2999 24.2801 27.6099 25.2401L29.8199 32.0601C30.3399 33.6701 28.4999 35.0001 27.1399 34.0101"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.7699 24.1796C15.7699 24.9196 16.6399 25.3296 17.2099 24.8596L18.7899 23.5496C19.0899 23.2996 19.5099 23.2796 19.8399 23.4996L25.1799 27.0596C25.7099 27.4096 26.4299 27.0996 26.5299 26.4696L28.5499 14.3396C28.7199 13.3196 27.7099 12.5096 26.7499 12.8996L11.9699 18.9496C11.1999 19.2696 11.2599 20.3796 12.0599 20.6096L15.3799 21.5596C15.6299 21.6296 15.8899 21.5896 16.1099 21.4496L21.3099 17.9796"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.6002 34.9996H12.3902C8.30023 34.9996 4.99023 31.6896 4.99023 27.5996V12.3896"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.4004 5H27.6104C31.7004 5 35.0104 8.31 35.0104 12.4V27.61"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.6196 26.1504L6.88965 34.9804"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.1096 5.01953L25.5996 13.5995"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.21964 5.01953H12.4996C13.1096 5.01953 13.6896 5.31953 14.0396 5.81953L32.3096 32.0395C33.1796 33.2795 32.2896 34.9795 30.7696 34.9795H27.4496C26.8396 34.9795 26.2596 34.6795 25.9096 34.1795L7.68964 7.95953C6.82964 6.71953 7.71964 5.01953 9.22964 5.01953H9.21964Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.0005 6.50977C22.9105 6.50977 25.2705 8.86977 25.2705 11.7798C25.2705 14.6898 22.9105 17.0498 20.0005 17.0498C17.0905 17.0498 14.7305 14.6898 14.7305 11.7798C14.7305 8.86977 17.0905 6.50977 20.0005 6.50977ZM20.0005 5.00977C16.2605 5.00977 13.2305 8.03977 13.2305 11.7798C13.2305 15.5198 16.2605 18.5498 20.0005 18.5498C23.7405 18.5498 26.7705 15.5198 26.7705 11.7798C26.7705 8.03977 23.7405 5.00977 20.0005 5.00977Z"
        fill="currentColor"
        strokeWidth="0"
      />
      <path
        d="M32.5804 34.9897C32.5804 30.1197 30.6604 24.4097 26.1304 21.8897C25.2104 21.3797 24.1804 20.9997 23.0404 20.7797C23.0404 20.7797 20.7204 20.1197 16.9804 20.7797C15.8404 20.9797 14.8104 21.3797 13.8904 21.8897C9.36043 24.4097 7.44043 30.1197 7.44043 34.9897"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ConfirmIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M32.2698 11.4796C33.9498 13.8996 34.9298 16.8296 34.9298 19.9996C34.9298 28.2496 28.2398 34.9396 19.9898 34.9396C11.7398 34.9396 5.0498 28.2496 5.0498 19.9996C5.0498 11.7496 11.7398 5.05957 19.9898 5.05957C22.2398 5.05957 24.3698 5.55957 26.2798 6.44957"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6904 21.0302L17.1104 24.9102C18.1204 25.3902 19.3104 25.2602 20.1904 24.5902L32.2804 11.4902"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CrossIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M34.94 5L21.5 18.43"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.94 34.8704L21.5 21.4404"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.05957 5L17.4996 17.44C18.8796 18.82 18.8796 21.06 17.4996 22.44L5.05957 34.88"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const XIcon = CrossIcon;
