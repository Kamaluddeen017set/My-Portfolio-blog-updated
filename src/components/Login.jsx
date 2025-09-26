"use client";
import "../styles/Login.css";
import { useAlert } from "./AlertContext";
import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { showAlert } = useAlert();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      showAlert("successfully✔️");
      localStorage.setItem("token", data.token);
      window.location.href = "/admin";
    } else {
      showAlert(data.message);
    }
  };

  return (
    <>
      <div id="login-Container">
        <form className="form" onSubmit={handleSubmit}>
          <div id="login-lable"> Admin Login</div>
          <input
            className="form-content"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="form-content"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
        </form>
        <div id="rays">
          <svg
            fill="none"
            viewBox="0 0 299 152"
            height="9em"
            width="18em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#paint0_linear_8_3)"
              d="M149.5 152H133.42L9.53674e-07 4.70132e-06H149.5L299 4.70132e-06L165.58 152H149.5Z"
            />
            <defs>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                y2="12.1981"
                x2="150.12"
                y1={152}
                x1="149.5"
                id="paint0_linear_8_3"
              >
                <stop stopColor="#00E0FF" />
                <stop stopOpacity={0} stopColor="#65EDFF" offset={1} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div id="emiter">
          <svg
            fill="none"
            viewBox="0 0 160 61"
            height={61}
            width={160}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_di_1_38)">
              <path
                fill="#2B2B2B"
                d="M80 27.9997C121.974 27.9997 156 22.4032 156 15.4996L156 40.4998C156 47.4034 121.974 52.9998 80 52.9998C38.0265 52.9998 4.00028 47.4034 4 40.4998V40.4998V15.51C4.0342 22.4089 38.0474 27.9997 80 27.9997Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </g>
            <ellipse
              fill="url(#paint0_radial_1_38)"
              ry="4.80773"
              rx="28.3956"
              cy="17.4236"
              cx={80}
            />
            <g filter="url(#filter1_i_1_38)">
              <path
                fill="#323232"
                d="M80 28.0002C121.974 28.0002 156 22.4037 156 15.5001C156 8.59648 121.974 3 80 3C38.0264 3 4 8.59648 4 15.5001C4 22.4037 38.0264 28.0002 80 28.0002ZM80.0001 20.308C96.1438 20.308 109.231 18.1555 109.231 15.5002C109.231 12.845 96.1438 10.6925 80.0001 10.6925C63.8564 10.6925 50.7693 12.845 50.7693 15.5002C50.7693 18.1555 63.8564 20.308 80.0001 20.308Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </g>
            <g filter="url(#filter2_di_1_38)">
              <path
                fill="#378BA6"
                d="M106.725 17.4505C108.336 16.8543 109.231 16.1943 109.231 15.4999C109.231 12.8446 96.1438 10.6921 80.0001 10.6921C63.8564 10.6921 50.7693 12.8446 50.7693 15.4999C50.7693 16.1943 51.6645 16.8543 53.2752 17.4504C53.275 17.4414 53.2748 17.4323 53.2748 17.4232C53.2748 14.768 65.2401 12.6155 80.0001 12.6155C94.7601 12.6155 106.725 14.768 106.725 17.4232C106.725 17.4323 106.725 17.4414 106.725 17.4505Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="45.5002"
                width={160}
                y="15.4996"
                x={0}
                id="filter0_di_1_38"
              >
                <feFlood result="BackgroundImageFix" floodOpacity={0} />
                <feColorMatrix
                  result="hardAlpha"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  type="matrix"
                  in="SourceAlpha"
                />
                <feOffset dy={4} />
                <feGaussianBlur stdDeviation={2} />
                <feComposite operator="out" in2="hardAlpha" />
                <feColorMatrix
                  values="0 0 0 0 0.620833 0 0 0 0 0.620833 0 0 0 0 0.620833 0 0 0 0.25 0"
                  type="matrix"
                />
                <feBlend
                  result="effect1_dropShadow_1_38"
                  in2="BackgroundImageFix"
                  mode="normal"
                />
                <feBlend
                  result="shape"
                  in2="effect1_dropShadow_1_38"
                  in="SourceGraphic"
                  mode="normal"
                />
                <feColorMatrix
                  result="hardAlpha"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  type="matrix"
                  in="SourceAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation={8} />
                <feComposite
                  k3={1}
                  k2={-1}
                  operator="arithmetic"
                  in2="hardAlpha"
                />
                <feColorMatrix
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                  type="matrix"
                />
                <feBlend
                  result="effect2_innerShadow_1_38"
                  in2="shape"
                  mode="normal"
                />
              </filter>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="25.0002"
                width={152}
                y={3}
                x={4}
                id="filter1_i_1_38"
              >
                <feFlood result="BackgroundImageFix" floodOpacity={0} />
                <feBlend
                  result="shape"
                  in2="BackgroundImageFix"
                  in="SourceGraphic"
                  mode="normal"
                />
                <feColorMatrix
                  result="hardAlpha"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  type="matrix"
                  in="SourceAlpha"
                />
                <feMorphology
                  result="effect1_innerShadow_1_38"
                  in="SourceAlpha"
                  operator="erode"
                  radius={3}
                />
                <feOffset />
                <feGaussianBlur stdDeviation="6.5" />
                <feComposite
                  k3={1}
                  k2={-1}
                  operator="arithmetic"
                  in2="hardAlpha"
                />
                <feColorMatrix
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                  type="matrix"
                />
                <feBlend
                  result="effect1_innerShadow_1_38"
                  in2="shape"
                  mode="normal"
                />
              </filter>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="26.7583"
                width="78.4615"
                y="0.692139"
                x="40.7693"
                id="filter2_di_1_38"
              >
                <feFlood result="BackgroundImageFix" floodOpacity={0} />
                <feColorMatrix
                  result="hardAlpha"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  type="matrix"
                  in="SourceAlpha"
                />
                <feMorphology
                  result="effect1_dropShadow_1_38"
                  in="SourceAlpha"
                  operator="dilate"
                  radius={2}
                />
                <feOffset />
                <feGaussianBlur stdDeviation={4} />
                <feComposite operator="out" in2="hardAlpha" />
                <feColorMatrix
                  values="0 0 0 0 0 0 0 0 0 0.941176 0 0 0 0 1 0 0 0 1 0"
                  type="matrix"
                />
                <feBlend
                  result="effect1_dropShadow_1_38"
                  in2="BackgroundImageFix"
                  mode="color-dodge"
                />
                <feBlend
                  result="shape"
                  in2="effect1_dropShadow_1_38"
                  in="SourceGraphic"
                  mode="normal"
                />
                <feColorMatrix
                  result="hardAlpha"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  type="matrix"
                  in="SourceAlpha"
                />
                <feMorphology
                  result="effect2_innerShadow_1_38"
                  in="SourceAlpha"
                  operator="erode"
                  radius={1}
                />
                <feOffset />
                <feGaussianBlur stdDeviation={2} />
                <feComposite
                  k3={1}
                  k2={-1}
                  operator="arithmetic"
                  in2="hardAlpha"
                />
                <feColorMatrix
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.52 0"
                  type="matrix"
                />
                <feBlend
                  result="effect2_innerShadow_1_38"
                  in2="shape"
                  mode="normal"
                />
              </filter>
              <radialGradient
                gradientTransform="translate(80 17.4236) rotate(90) scale(6.25004 36.9143)"
                gradientUnits="userSpaceOnUse"
                r={1}
                cy={0}
                cx={0}
                id="paint0_radial_1_38"
              >
                <stop stopColor="#00FFF0" />
                <stop stopColor="#001AFF" offset="0.901042" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
}
export default Login;
