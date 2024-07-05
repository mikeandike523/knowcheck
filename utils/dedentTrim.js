import dedent from "./dedent.js";
import rebuildTaggedTemplateLiteral from "./rebuildTaggedTemplateLiteral.js";

/**
 * 
 * @param {TemplateStringsArray} parts 
 * @param  {...any} values 
 * @returns 
 */
export default function (parts, ...values) {
  const text = rebuildTaggedTemplateLiteral(parts, ...values);
  return (dedent`${text}`).trim();
}
