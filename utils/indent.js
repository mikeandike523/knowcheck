/**
 * @param {string} text 
 * @param {number} [indent=2] 
 * @returns 
 */
export default function (text, indent = 2) {
  const indentString = typeof indent === "number" ? " ".repeat(indent) : indent;
  const normalized = text.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  return lines.map(
    /**
     * 
     * @param {string} line 
     * @returns 
     */
    (line) => indentString + line).join("\n");
}
