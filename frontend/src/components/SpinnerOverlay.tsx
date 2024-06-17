/*
      <div class="loading-container">
        <div class="loading-spinner"></div>
      </div>
      <style>
        div.loading-container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      </style>
*/

import { css, keyframes } from "@emotion/react";

import { Div } from "../fwk/html";

export default function Spinner() {
  const spinAnimation = keyframes`
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
  `;
  return (
    <Div
      css={css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <Div
        css={css`
          z-index: 1;
          position: relative;
          animation: ${spinAnimation} 1s linear infinite;
          width: clamp(15%, 5rem, 10rem);
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            rgba(255, 0, 0, 1) 0deg,
            rgba(0, 255, 255, 1) 60deg,
            rgba(0, 0, 255, 1) 120deg,
            rgba(255, 0, 0, 1) 180deg,
            rgba(0, 255, 255, 1) 240deg,
            rgba(0, 0, 255, 1) 300deg,
            rgba(255, 0, 0, 1) 360deg
          );

          &::before {
            z-index: 2;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            content: "";
            border-radius: 50%;
            transform-origin: center;
            transform: scale(0.25);
            background: white;
          }

          &::after {
            z-index: 2;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            content: "";
            border-radius: 50%;
            transform-origin: center;
            transform: scale(0.2);
            border: 12px solid black;
            background: white;
          }
        `}
      ></Div>
    </Div>
  );
}
