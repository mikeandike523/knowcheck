import { css, SerializedStyles } from "@emotion/react";
import { HTMLAttributes, HTMLInputTypeAttribute, useId, useState } from "react";
import { z, ZodError } from "zod";

import { Div, Span } from "@/fwk/html";
// A function to sanitize any object that might have been thrown
// for use with JSON.sßtringify
import { styleEngine, stylesToCssString } from "@/fwk/B";
import VStack from "@/fwk/components/VStack";
import formatError from "@/utils/formatError";

export type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "datetime-local";

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
  zodValidator: z.ZodType<TData>,
  preprocess?: (value: string) => string,
  postProcess: (value: TData) => TData = (value: TData) => value
): Validator<TData> {
  return (value: string): ValidationResult<TData> => {
    try {
      if (preprocess) {
        value = preprocess(value);
      }
      const result = zodValidator.safeParse(value);
      if (result.success) {
        return {
          valid: true,
          data: postProcess(result.data),
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

function normalizeMessageProperty(message?: string | string[] | undefined) {
  if (typeof message === "string") {
    return [message];
  }
  if (message && Array.isArray(message)) {
    return message;
  }
  return [];
}

export interface InputWithValidationProps
  extends HTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute;
  label: string;
  css?: SerializedStyles | undefined;
  validateOnChange?: boolean;
  validateOnChangeDebounceMillis?: number | undefined;
}

export interface InputWithValidationConfig<TData> {
  /**
   * To keep things simple, we expect the caller to convert different data types to string
   * if needed
   */
  initialDOMValue?: string;
  /**
   * To keep things simple, we expect the caller to supply a trivial validator
   * if the data does not need to be validated
   */
  validator: Validator<TData>;
}

/**
 *
 * A companion hook to the InputWithValidation component that tracks highly complex internal state
 *
 * @param config - THe destructured configuration options
 * @returns
 *
 * @remarks
 * For simple components, it is often sufficient to simply pass the result of `useState`
 * (i.e, some value and a React Dispatch<SetStataeAction> object)
 *
 * However for complex component, the idiomatic approach is to make a companion hook
 * and pass the result of that hook to the component
 */
export function useInputWithValidationState<TData extends SignificantValue>({
  initialDOMValue,
  validator,
}: InputWithValidationConfig<TData>) {
  const [domValue, setDomValue] = useState(initialDOMValue ?? "");
  const [validationResult, setValidationResult] =
    useState<ValidationResult<TData> | null>(null);
  const validate = (updateUI = true) => {
    const result = validator(domValue);
    if (!result.valid && result.errorSource === "unknown") {
      console.error(`
An unknown error occurred while validating the input value: ${domValue}

${JSON.stringify(formatError(result.extra), null, 2)}
        `);
    }
    if (updateUI) {
      setValidationResult(result);
    }
    return result;
  };
  const validationState = !validationResult
    ? "idle"
    : validationResult.valid
      ? "valid"
      : "invalid";
  const parsedValue = validationResult?.data ?? null;
  const validationMessages = normalizeMessageProperty(
    validationResult?.message
  );

  return {
    domValue,
    setDomValue,
    validationState,
    validationResult,
    parsedValue,
    validate,
    validationMessages,
  };
}

export type InputWithValidationState = ReturnType<
  typeof useInputWithValidationState
>;

export default function InputWithValidation({
  label,
  type,
  inputState,
  css: priorCss,
  validateOnChange = false,
  ...rest
}: InputWithValidationProps & {
  inputState: InputWithValidationState;
}) {
  const inputUniqueDOMId = useId();
  const { domValue, setDomValue, validationState, validationMessages } =
    inputState;
  const { stylePropRest, nonStylePropsRest } = styleEngine(rest);

  const baseCss = css`
    margin: 0;
    padding: 0;
    width: 100%;
    display: block;
    background: white;
    box-sizing: border-box;
    max-width: 100%;

    border: ${validationState === "error"
      ? "1px solid red"
      : "1px solid black"};
    transition: all 0.25s ease;
  `;
  const computedCss = css`
    ${priorCss};
    ${baseCss};
    ${stylesToCssString(stylePropRest)};
  `;
  return (
    <Div width="100%" margin={0} padding={0} boxSizing="border-box">
      <label htmlFor={inputUniqueDOMId}>{label}</label>
      <input
        id={inputUniqueDOMId}
        value={domValue}
        onChange={(e) => {
          setDomValue(e.target.value);
          if (validateOnChange) {
            inputState.validate();
          }
        }}
        css={computedCss}
        type={type}
        {...nonStylePropsRest}
      />
      <VStack width="100%">
        {validationMessages.map((message, i) => (
          <Span key={i} color="red">
            {message}
          </Span>
        ))}
      </VStack>
    </Div>
  );
}
