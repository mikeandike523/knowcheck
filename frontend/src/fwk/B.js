var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { css } from "@emotion/react";
import lodash from "lodash";
import { asMapping } from "./references/asMapping";
import { allStyleProps } from "./styleProps";
export function styleEngine(props) {
    var stylePropRest = lodash.pick(props, allStyleProps);
    var nonStylePropsRest = lodash.omit(props, allStyleProps);
    return {
        stylePropRest: stylePropRest,
        nonStylePropsRest: nonStylePropsRest,
    };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function stylesToCssString(styles) {
    return Object.entries(styles)
        .map(function (_a) {
        var styleProp = _a[0], value = _a[1];
        return "".concat(lodash.kebabCase(styleProp), ": ").concat(value, ";");
    })
        .join("\n");
}
export var B = function (_a) {
    var _b = _a.baseCss, baseCss = _b === void 0 ? css(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))) : _b, overrideCss = _a.css, as = _a.as, baseRef = _a.baseRef, rest = __rest(_a, ["baseCss", "css", "as", "baseRef"]);
    var HTMLComponent = asMapping[as];
    var _c = styleEngine(rest), stylePropRest = _c.stylePropRest, nonStylePropsRest = _c.nonStylePropsRest;
    return (_jsx(HTMLComponent, __assign({ ref: baseRef, css: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        ", ";\n        ", ";\n        ", ";\n      "], ["\n        ", ";\n        ", ";\n        ", ";\n      "])), baseCss, overrideCss, stylesToCssString(stylePropRest)) }, nonStylePropsRest)));
};
export default B;
var templateObject_1, templateObject_2;
