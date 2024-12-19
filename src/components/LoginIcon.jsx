import React from "react";

const LoginIcon = ({ name, ...props }) => {
  switch (name) {
    case "kakao":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <g clip-path="url(#clip0_84_1434)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.00005 0.600098C4.0292 0.600098 3.05176e-05 3.71306 3.05176e-05 7.55238C3.05176e-05 9.94012 1.55843 12.0451 3.93155 13.2971L2.93306 16.9446C2.84484 17.2669 3.21344 17.5238 3.49649 17.337L7.87337 14.4483C8.24273 14.4839 8.61811 14.5047 9.00005 14.5047C13.9705 14.5047 18 11.3919 18 7.55238C18 3.71306 13.9705 0.600098 9.00005 0.600098Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_84_1434">
              <rect width="17.9999" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case "naver":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <g clip-path="url(#clip0_84_1431)">
            <path
              d="M10.8491 8.56267L4.91687 0H0V16H5.15088V7.436L11.0831 16H16V0H10.8491V8.56267Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_84_1431">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case "google":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.1 10.2271C20.1 9.518 20.0364 8.83619 19.9182 8.18164H10.5V12.0498H15.8818C15.65 13.2998 14.9455 14.3589 13.8864 15.068V17.5771H17.1182C19.0091 15.8362 20.1 13.2725 20.1 10.2271Z"
            fill="#4285F4"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.5 19.9999C13.2 19.9999 15.4636 19.1044 17.1182 17.5772L13.8864 15.0681C12.9909 15.6681 11.8454 16.0226 10.5 16.0226C7.89545 16.0226 5.6909 14.2635 4.90454 11.8999H1.56363V14.4908C3.20908 17.759 6.5909 19.9999 10.5 19.9999Z"
            fill="#34A853"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.90455 11.9002C4.70455 11.3002 4.59091 10.6593 4.59091 10.0002C4.59091 9.3411 4.70455 8.70019 4.90455 8.10019V5.50928H1.56364C0.886364 6.85928 0.5 8.38655 0.5 10.0002C0.5 11.6138 0.886364 13.1411 1.56364 14.4911L4.90455 11.9002Z"
            fill="#FBBC05"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.5 3.97727C11.9682 3.97727 13.2864 4.48182 14.3227 5.47273L17.1909 2.60455C15.4591 0.990909 13.1954 0 10.5 0C6.5909 0 3.20908 2.24091 1.56363 5.50909L4.90454 8.1C5.6909 5.73636 7.89545 3.97727 10.5 3.97727Z"
            fill="#EA4335"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default LoginIcon;
