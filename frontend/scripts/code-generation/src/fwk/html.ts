import fs from "fs";
import path from "path";
import { asMapping } from "../../../../src/fwk/references/asMapping";

let __filename = import.meta.url.toString().slice("file://".length);
if (process.platform === "win32") {
  __filename = __filename.replace(/\\/g, "/");
}
const __dirname = path.dirname(__filename);

const elementTypes = Object.keys(asMapping) as (keyof typeof asMapping)[];

const imports = `
import B, {BProps} from './B';
import {AsElementType} from './references/asMapping';
import {forwardRef} from 'react';

`;

const generateComponent = (element: keyof typeof asMapping) => {
  if (element === "b") {
    const capitalizedElement = "Bold";
    return `export interface ${capitalizedElement}Props extends Omit<BProps<'b'>,'as'> {}
  export const ${capitalizedElement}=forwardRef<AsElementType['${element}'],${capitalizedElement}Props>((props,ref)=> {
      return <B baseRef={ref} as="b" {...props} />
  })
  `;
  }
  const capitalizedElement = element.charAt(0).toUpperCase() + element.slice(1);
  return `export interface ${capitalizedElement}Props extends Omit<BProps<'${element}'>,'as'> {}
export const ${capitalizedElement}=forwardRef<AsElementType['${element}'],${capitalizedElement}Props>((props,ref)=> {
    return <B baseRef={ref} as="${element}" {...props} />
})
`;
};

const components = elementTypes.map(generateComponent).join("\n");

const fileContent = `${imports}\n${components}`;
fs.writeFileSync(
  path.resolve(__dirname, "..", "..", "..", "..", "src", "fwk", "html.tsx"),
  fileContent,
);