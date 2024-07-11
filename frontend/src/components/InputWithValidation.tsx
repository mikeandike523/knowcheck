import { css, SerializedStyles } from "@emotion/react";
import { HTMLAttributes, HTMLInputTypeAttribute, useId, useState } from "react";

import { Div, Span } from "@/fwk/html";
// A function to sanitize any object that might have been thrown
// for use with JSON.sßtringify
import { styleEngine, stylesToCssString } from "@/fwk/B";
import VStack from "@/fwk/components/VStack";
import formatError from "@/utils/formatError";
import { SignificantValue, ValidationResult, Validator } from "@/utils/input-validation";

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
  /**
   * An optional hook to be called when the input value changes
   */
  changeHook?: (value: string) => void;
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
  changeHook
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
    changeHook
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
          if(inputState.changeHook) {
            inputState.changeHook(e.target.value);
          }
        }}
        css={computedCss}
        type={type}
        {...nonStylePropsRest}
      />
      <VStack width="100%">
        {validationMessages.map((message, i) => (
          <Span key={i} color="red">
            {message.toString()}
          </Span>
        ))}
      </VStack>
    </Div>
  );
}
