import { z } from "zod";
import { Refiner } from "./types";

export default function isOneOfStrings<TStrings extends string>(
  options: readonly TStrings[],
  message?: string | ((value: string) => string)
) {
  const refiner = ((value, ctx) => {
    if (typeof (value as unknown) !== "string") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: message
          ? typeof message === "function"
            ? message(value)
            : message
          : "Invalid input. Expected a string.",
      });
      return false;
    }
    if (!options.includes(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: message
          ? typeof message === "function"
            ? message(value)
            : message
          : `Invalid string value ${value}. Must be one of: ${options.join(", ")}.`,
      });
      return false;
    }
    return true;
  }) as Refiner<TStrings>;
  return refiner;
}
