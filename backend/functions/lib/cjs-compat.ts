export type JavascriptModule = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [symbolName: string]: any;
  default?: any;
};

/**
 * Import a javascript module and retrieve an object-like item
 * with all of the non-default exports
 *
 * If the module also has a default export, then it is included
 * but is not intended to be used
 */
export async function asyncImport<TModule extends JavascriptModule>(
  modulePath: string
): Promise<TModule> {
  const imported = await import(modulePath);
  return imported as TModule;
}

/**
 * Import a javascript module and retrieve the default export
 * Note that this works both for moduels that only have a default export
 * as well as modules that have both a default export and non-default exports
 */
export async function asyncImportDefault<TModule extends JavascriptModule>(
  modulePath: string
) {
  const imported = await import(modulePath);
  if ("default" in imported) {
    return imported.default as NonNullable<TModule["default"]>;
  } else {
    throw new Error(`Module ${modulePath} does not have a default export`);
  }
}

export function createImporter<TModule extends JavascriptModule>(
  modulePath: string
)
{
  return () => {
    return asyncImport<TModule>(modulePath);
  }
}

export function createDefaultImporter<TModule extends JavascriptModule>(
  modulePath: string
) {
  return () => {
    return asyncImportDefault<TModule>(modulePath);
  }
}
