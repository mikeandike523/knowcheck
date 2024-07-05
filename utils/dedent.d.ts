export default dedent;
/**
 * A highly flexible dedent algorithm
 *
 * Note, this algorithm does not remove any leading or trailing blank lines
 * This is because we do not want to introduce unexpected behavior,
 * even though the vast majority of the time the user will call trim() anyway
 *
 * @param {TemplateStringsArray} parts - the parts of the template literal
 * @param {...any} values - the values to interpolate into the template literal
 */
declare function dedent(parts: TemplateStringsArray, ...values: any[]): string;
