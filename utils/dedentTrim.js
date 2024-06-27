import dedent from "./dedent.js";

export default function (text) {
  console.log(text);
  return dedent(text).trim();
}
