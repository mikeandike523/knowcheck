/**
 * Reconstructs the original (interpolated) template literal that was previously
 * decomposed by the JS tagged-template-literal parsing behavior
 *
 * @param {TemplateStringsArray} parts - the parts of the template literal
 * @param {...any} values - the values to interpolate into the template literal
 *
 * @remarks
 * I personally do not like the JS tagged-template-literal parsing behavior
 * so I offer this function to reconstruct the original (interpolated) template literal
 * serving as a helper to allow tagged template literal function defintions to behave
 * more similarly to a regular function call on a pre-interpolated template literal
 */
export default function rebuildTaggedTemplateLiteral(parts, ...values) {
  return parts.reduce((result, part, i) => {
    return result + part + (values[i] !== undefined ? values[i] : "");
  }, "")
}