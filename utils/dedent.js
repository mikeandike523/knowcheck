import rebuildTaggedTemplateLiteral from "./rebuildTaggedTemplateLiteral.js";

/**
 * @param {Array<string>} strings 
 * @returns 
 */
function commonPrefix(strings) {
  const minLength = Math.min(...strings.map((s) => s.length));
  for (let i = 0; i < minLength; i++) {
    if (strings[0][i] !== strings[1][i]) {
      return strings[0].slice(0, i);
    }
  }
  return strings[0].slice(0, minLength);
}
/**
 * 
 * @param {string} line 
 * @returns 
 */
function captureLeadingWhitespace(line) {
  const leadingWhitespace = ((line.match(/^\s*/))??[""])[0];
  return {
    leadingWhitespace,
    remaining: line.slice(leadingWhitespace.length),
  };
}



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
function dedent(parts, ...values) {
  const text = rebuildTaggedTemplateLiteral(parts, ...values);
  const normalized = text.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  const nonBlankOrAllWhitespaceLines = lines.filter(
    (line) => line.trim().length > 0,
  );
  if (nonBlankOrAllWhitespaceLines.length === 0) {
    return normalized;
  }

  const leadingWhitespaceData = nonBlankOrAllWhitespaceLines.map((line) =>
    captureLeadingWhitespace(line),
  );

  const leadingWhitespaces = leadingWhitespaceData.map(
    (data) => data.leadingWhitespace,
  );
  const commonPrefixWhitespace = commonPrefix(leadingWhitespaces);

  const dedentedLines = lines.map((line) => {
    if (line.trim().length === 0) {
      return line;
    }
    return line.slice(commonPrefixWhitespace.length);
  });

  return dedentedLines.join("\n");
}

export default dedent;
