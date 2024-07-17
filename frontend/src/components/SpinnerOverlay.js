var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
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
    var spinAnimation = keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      0% {\n        transform: rotate(0deg);\n      }\n      100% {\n        transform: rotate(360deg);\n      }\n  "], ["\n      0% {\n        transform: rotate(0deg);\n      }\n      100% {\n        transform: rotate(360deg);\n      }\n  "])));
    return (_jsx(Div, { css: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center;\n      "], ["\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center;\n      "]))), children: _jsx(Div, { css: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n          z-index: 1;\n          position: relative;\n          animation: ", " 1s linear infinite;\n          width: 4em;\n          aspect-ratio: 1 / 1;\n          border-radius: 50%;\n          background: conic-gradient(\n            from 0deg,\n            rgba(255, 0, 0, 1) 0deg,\n            rgba(0, 255, 255, 1) 60deg,\n            rgba(0, 0, 255, 1) 120deg,\n            rgba(255, 0, 0, 1) 180deg,\n            rgba(0, 255, 255, 1) 240deg,\n            rgba(0, 0, 255, 1) 300deg,\n            rgba(255, 0, 0, 1) 360deg\n          );\n\n          &:before {\n            z-index: 2;\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            content: \"\";\n            border-radius: 50%;\n            transform-origin: center;\n            transform: scale(0.25);\n            background: white;\n          };\n\n          &:after {\n            z-index: 2;\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            content: \"\";\n            border-radius: 50%;\n            transform-origin: center;\n            transform: scale(0.25);\n            border: 12px solid black;\n            background: white;\n          };\n        "], ["\n          z-index: 1;\n          position: relative;\n          animation: ", " 1s linear infinite;\n          width: 4em;\n          aspect-ratio: 1 / 1;\n          border-radius: 50%;\n          background: conic-gradient(\n            from 0deg,\n            rgba(255, 0, 0, 1) 0deg,\n            rgba(0, 255, 255, 1) 60deg,\n            rgba(0, 0, 255, 1) 120deg,\n            rgba(255, 0, 0, 1) 180deg,\n            rgba(0, 255, 255, 1) 240deg,\n            rgba(0, 0, 255, 1) 300deg,\n            rgba(255, 0, 0, 1) 360deg\n          );\n\n          &:before {\n            z-index: 2;\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            content: \"\";\n            border-radius: 50%;\n            transform-origin: center;\n            transform: scale(0.25);\n            background: white;\n          };\n\n          &:after {\n            z-index: 2;\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            content: \"\";\n            border-radius: 50%;\n            transform-origin: center;\n            transform: scale(0.25);\n            border: 12px solid black;\n            background: white;\n          };\n        "])), spinAnimation) }) }));
}
var templateObject_1, templateObject_2, templateObject_3;
