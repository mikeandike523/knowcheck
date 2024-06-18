function commonPrefix(strings) {
  const minLength = Math.min(...strings.map((s) => s.length));
  for (let i = 0; i < minLength; i++) {
    if (strings[0][i]!== strings[1][i]) {
      return strings[0].slice(0, i);
    }
  }
  return strings[0].slice(0, minLength);
}
function captureLeadingWhitespace(line) {
  const leadingWhitespace = line.match(/^\s*/)[0];
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
 * @param {string} text - the text to dedent
 */
function dedent(text) {
  if(Array.isArray(text)) {
    text=text.join("")
  }
  console.log(text)
  const normalized = text.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  const nonBlankOrAllWhitespaceLines = lines.filter(
    (line) => line.trim().length > 0,
  );
  if (nonBlankOrAllWhitespaceLines.length === 0) {
    return normalized;
  }
  // This should also handle the edge case gracefully
  // Where there is only one line with some leading whitespace, and no other significant lines
  const leadingWhitespaceData = nonBlankOrAllWhitespaceLines.map((line) =>
    captureLeadingWhitespace(line),
  );
  // Clever solution -- use an existing common prefix algorithm
  // These algorithms are usually used for thigns such as filepath analysis, but it is also useful to detect common indentation

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

export default dedent