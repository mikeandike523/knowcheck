import {z, ZodError} from 'zod'

import formatError from "./formatError"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SignificantValue = Exclude<any, null | undefined>;

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
  errorSource?: "zod" | "unknown";
  /**
   * An option message or list of messages to display to the user.
   */
  message?: string | string[];
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
export type Validator<TData extends SignificantValue> = (
    value: string
  ) => ValidationResult<TData>;


/**
 * Wraps a zod validator into a simpler for appropriate for this app
 * This is generally because ZodError is a highly complex data type and we want to boild it down first
 */
export function zodToSimple<TData extends SignificantValue>(
    zodValidator: z.ZodType<TData>
  ): Validator<TData> {
    return (value: string): ValidationResult<TData> => {
      try {
        const result = zodValidator.safeParse(value);
        if (result.success) {
          return {
            valid: true,
            data: result.data
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