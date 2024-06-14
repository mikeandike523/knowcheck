import fs from "fs";
import path from "path";
import { asMapping } from "../../../../src/fwk/references/asMapping";

let __filename = import.meta.url.toString().slice("file://".length);
if (process.platform === "win32") {
  __filename = __filename.replace(/\\/g, "/");
}
const __dirname = path.dirname(__filename);

// Extract the keys from asMapping to use for generating components
const elementTypes = Object.keys(asMapping) as (keyof typeof asMapping)[];

const imports = `import B, {BProps} from './B'

`;

const generateComponent = (element: keyof typeof asMapping) => {
  const capitalizedElement = element.charAt(0).toUpperCase() + element.slice(1);
  return `export interface ${capitalizedElement}Props extends Omit<BProps<'${element}'>,'as'> {}
export function ${capitalizedElement}(props: ${capitalizedElement}Props) {
    return <B as="${element}" {...props} />
}
`;
};

const components = elementTypes.map(generateComponent).join("\n");

// Combine imports and components into a single string
const fileContent = `${imports}\n${components}`;

// Write the file content to a new file
fs.writeFileSync(
  path.resolve(__dirname, "..", "..", "..", "..", "src", "fwk", "html.tsx"),
  fileContent,
);

console.log("Components generated successfully!");
