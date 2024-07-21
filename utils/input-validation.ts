import { z, ZodError } from "zod";

import formatError from "./formatError.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SignificantValue = Exclude<any, null | undefined>;

export type ValidationErrorMessage =
  | string
  | ValidationErrorMessage[]
  | {
      [key: string]: ValidationErrorMessage;
    };

export type ValidationResult<TData extends SignificantValue> = {
  valid: boolean;
  /**
   * We attach the "parse result" (likely from zod) since in many cases,
   * an input validator may be augmented with data transformations
   * such as trimming an lowercasing an email address after it is confirmed valid
   *
   * This is also useful for when the input data is a string
   * but is parsed into a number or other data type
   * during the validation pipeline
   */
  data?: TData;
  /**
   * If the message is blank but the source is not "zod", then it is likely an
   * unknown client side error, so we can generate an extremely generic message
   * and then console.error the details for debugging
   */
  errorSource?: "zod" | "unknown" | "custom";
  /**
   * An option message or list of messages to display to the user.
   */
  message?: ValidationErrorMessage;
  /**
   * Optional extra information
   */
  extra?: unknown;
};

/**
 * @remarks
 * here, value is a string since in HTML no whetter the input type is,
 * retrieving it's DOM value will always be a string
 */
export type Validator<
  TIn extends SignificantValue,
  TOut extends SignificantValue,
> = (value: TIn) => ValidationResult<TOut>;

/**
 * Wraps a zod validator into a simpler for appropriate for this app
 * This is generally because ZodError is a highly complex data type and we want to boild it down first
 */
export function zodToSimple<TData extends SignificantValue>(
  zodValidator: z.ZodType<TData> | z.ZodEffects<z.ZodTypeAny>
): Validator<unknown, TData> {
  return (value: unknown): ValidationResult<TData> => {
    try {
      const result = zodValidator.safeParse(value);
      if (result.success) {
        return {
          valid: true,
          data: result.data,
        };
      } else {
        return {
          valid: false,
          errorSource: "zod",
          message: result.error.errors.map((err) => err.message),
        };
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          valid: false,
          errorSource: "zod",
          message: error.errors.map((err) => err.message),
        };
      } else {
        return {
          valid: false,
          errorSource: "unknown",
          message: "An unknown error occurred",
          extra: formatError(error),
        };
      }
    }
  };
}

function chainValidators<TIn, TMid, TOut>(
  A: Validator<TIn, TMid>,
  B: Validator<TMid, TOut>
) {
  return (value: TIn): ValidationResult<TOut> => {
    const AResult = A(value);
    if (!AResult.valid) {
      return {
        valid: false,
        errorSource: "zod",
        message: AResult.message,
      };
    }
    return B(AResult.data!);
  };
}

/**
 * @remarks
 * "null" - explict null, must be null and only null, cannot be undefined or a value
 * "undefined" - eplict undefined, must be undefined and only undefined, cannot be null or a vlue
 */
export type ApiInputRootType =
  | "object"
  | "array"
  | "string"
  | "boolean"
  | "number"
  | "null"
  | "undefined";

export interface CheckApiInputShapeOptions {
  canBeNull: boolean;
  canBeUndefined: boolean;
  objectOptions?: {
    fields?: string[];
    strict?: boolean;
  };
  arrayOptions?: {
    /**
    Useful if a tuple is expected
    */
    fixedLength?: number;
  };
}

export function createApiInputShapeChecker<TApiInput>(
  rootType: ApiInputRootType,
  {
    canBeNull = false,
    canBeUndefined = false,
    objectOptions = {
      /*
       * Object must have at least the following fields
       *
       * The rule here is "Is it in Object.keys?",
       * since a value that is present but undefined ay still be a valid value
       */
      fields: [],
      /**
       * If true, object may not have any more fields than those specified
       *
       * Once again, its based solely on Object.keys
       */
      strict: false,
    },
    arrayOptions = {
      fixedLength: undefined,
    },
  }: CheckApiInputShapeOptions
) {
  /**
   * A shorecut to quickly define validation results in the error cases
   */
  const failResult = (message: string): ValidationResult<TApiInput> => {
    return {
      valid: false,
      errorSource: "custom",
      message,
    };
  };
  const successResult = (value: TApiInput): ValidationResult<TApiInput> => {
    return {
      valid: true,
      data: value,
    };
  };
  const checkObjectFields = (obj: object): ValidationResult<TApiInput> => {
    const foundKeys = Object.keys(obj);
    const foundKeysSet = new Set(foundKeys);
    const requiredKeys = objectOptions.fields ?? [];
    const requiredKeysSet = new Set(requiredKeys);
    const issues: string[] = [];
    for (const key of requiredKeys) {
      if (!foundKeysSet.has(key)) {
        issues.push(`Missing key ${key}`);
      }
    }
    if (objectOptions.strict) {
      for (const key of foundKeys) {
        if (!requiredKeysSet.has(key)) {
          issues.push(`Extra key ${key}`);
        }
      }
    }
    return {
      valid: true,
      data: obj as TApiInput,
    };
  };
  return (value: unknown) => {
    switch (rootType) {
      case "undefined":
        if (typeof value !== "undefined") {
          return failResult(
            "Api input must be undefined and only undefined, found type: " +
              typeof value
          );
        }
        break;
      case "null":
        if (value !== null) {
          if (typeof value === "object") {
            return failResult(
              "Api input must be explictly null. Recieved a regular javascript object."
            );
          } else {
            return failResult("Api must be explictly null.");
          }
        }
        break;
      case "number":
      case "boolean":
      case "string":
        if (canBeUndefined && typeof value === "undefined") {
          return successResult(value as TApiInput);
        }
        if (canBeNull && value === null) {
          return successResult(value as TApiInput);
        }
        if (typeof value !== rootType) {
          return failResult(
            `Api input must be of type "${rootType}", got "${typeof value}"`
          );
        }
        break;
      case "array":
        if (typeof value !== "object") {
          return failResult(
            `Api input must be an array, got javascript type "${typeof value}"`
          );
        }
        if (!Array.isArray(value)) {
          return failResult(
            `Api input must be an array. Got a javascript object that is not an array.`
          );
        }
        if (typeof arrayOptions.fixedLength === "number") {
          if ((value as Array<unknown>).length !== arrayOptions.fixedLength) {
            return failResult(
              `
Api must be an array of length ${arrayOptions.fixedLength},
got an array of length ${(value as Array<unknown>).length}`.trim()
            );
          }
        }
        break;
      case "object":
        if (typeof value !== "object") {
          return failResult(
            `Api input must be a regular obejct, got javascript type "${typeof value}"`
          );
        }
        if (Array.isArray(value)) {
          return failResult(
            `Api input must be a regular object. Got an array.`
          );
        }
        return checkObjectFields(value as object);
    }

    return successResult(value as TApiInput);
  };
}

export function createApiSchemaChecker<TSchema>(schema: {
  [K in keyof TSchema]: Validator<unknown, TSchema[K]>;
}): Validator<unknown, TSchema> {
  const baseChecker = createApiInputShapeChecker<TSchema>("object", {
    canBeNull: false,
    canBeUndefined: false,
    objectOptions: {
      fields: Object.keys(schema),
      strict: true,
    },
  });
  const fieldChecker = (inputObject: {
    [K in keyof TSchema]: unknown;
  }): ValidationResult<TSchema> => {
    const keysToCheck = Object.keys(schema) as (keyof TSchema)[];
    const fieldIssues: {
      [K in keyof TSchema]?: ValidationErrorMessage;
    } = {};
    for (const key of keysToCheck) {
      const fieldResult = schema[key](inputObject[key]);
      if (!fieldResult.valid) {
        fieldIssues[key] = fieldResult.message;
      }
    }
    if (Object.keys(fieldIssues).length > 0) {
      return {
        valid: false,
        errorSource: "custom",
        message: fieldIssues as ValidationErrorMessage,
      };
    }
    return {
      valid: true,
      data: inputObject as TSchema,
    };
  };
  return chainValidators(baseChecker, fieldChecker);
}

export function parseObjectSchema<TSchema>(
  apiInput: unknown,
  schema: {
    [K in keyof TSchema]: Validator<unknown, TSchema[K]>;
  }
): TSchema {
  const result = createApiSchemaChecker(schema)(apiInput);
  if (!result.valid) {
    throw result;
  }
  return result.data!;
}

export type ValidatorSchemaUnwrap<TValidatorSchema extends {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: Validator<any, any>;
}> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof TValidatorSchema]:TValidatorSchema[K] extends Validator<any, infer T>? T : never;
}
