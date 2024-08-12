import { css, SerializedStyles } from "@emotion/react";
import { HTMLAttributes, HTMLInputTypeAttribute, useState } from "react";

import { styleEngine, stylesToCssString } from "@/fwk/B";
import VStack from "@/fwk/components/VStack";
import { Div, Span } from "@/fwk/html";
import formatError from "@/utils/formatError";
import {
  SignificantValue,
  ValidationErrorMessage,
  ValidationResult,
  Validator,
} from "@/utils/input-validation";

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

export interface InputWithValidationProps
  extends HTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  css?: SerializedStyles | undefined;
  validateOnChange?: boolean;
  validateOnChangeDebounceMillis?: number | undefined;
  fontSize?: string;
  height?: string;
  padding?: string;
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
  validator: Validator<string, TData>;
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
  changeHook,
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
  const validationMessages = validationResult?.message ?? [];
  const normalizeValidationMessages = (
    messages:
      | ValidationErrorMessage
      | ValidationErrorMessage[]
      | { [key: string]: ValidationErrorMessage[] }
      | undefined
      | null
  ): ValidationErrorMessage[] => {
    if (!messages) {
      return [""];
    }
    if (typeof messages === "string") {
      return [messages];
    }
    if (Array.isArray(messages)) {
      return messages.map((m) => normalizeValidationMessages(m));
    }
    if (typeof messages === "object") {
      if (messages === null) {
        return [];
      }
      return Object.entries(messages).map(([key, value]) => {
        return `${key}: ${normalizeValidationMessages(value)}`;
      });
    }
    return [];
  };

  const messages = normalizeValidationMessages(validationMessages);

  return {
    domValue,
    setDomValue,
    validationState,
    validationResult,
    parsedValue,
    validate,
    messages,
    changeHook,
  };
}

export type InputWithValidationState = ReturnType<
  typeof useInputWithValidationState
>;

export default function InputWithValidation({
  placeholder,
  type,
  inputState,
  css: priorCss,
  validateOnChange = false,
  ...rest
}: InputWithValidationProps & {
  inputState: InputWithValidationState;
}) {
  const { domValue, setDomValue, validationState, messages } = inputState;
  const { stylePropRest, nonStylePropsRest } = styleEngine(rest);

  const baseCss = css`
    position: relative;
    padding: ${rest.padding ?? "4px"};
    margin: 0;
    width: 100%;
    height: ${rest.height ?? "32px"};
    display: block;
    box-sizing: border-box;
    border: none;
    font-size: ${rest.fontSize ?? "16px"};
    outline: none;
  `;

  const computedCss = css`
    ${priorCss};
    ${baseCss};
    ${stylesToCssString(stylePropRest)};
  `;

  const containerCss = css`
    transition: all 0.25s ease;
    position: relative;

    &::after {
      z-index: 10;
      content: "";
      position: absolute;
      left: ${rest.padding ?? 0};
      right: ${rest.padding ?? 0};
      bottom: 4px;
      height: 2px;
      background-color: ${validationState === "invalid" ? "red" : "black"};
      transition: background-color 0.25s ease;
    }

    &:focus-within::after {
      background-color: blue; /* Changes to blue when focused */
    }
  `;
  return (
    <Div
      width="100%"
      margin={0}
      padding={0}
      boxSizing="border-box"
      css={containerCss}
    >
      <input
        placeholder={placeholder}
        value={domValue}
        onChange={(e) => {
          setDomValue(e.target.value);
          if (validateOnChange) {
            inputState.validate();
          }
          if (inputState.changeHook) {
            inputState.changeHook(e.target.value);
          }
        }}
        css={computedCss}
        type={type}
        {...nonStylePropsRest}
      />
      <VStack width="100%" boxSizing="border-box">
        {messages.map((message, i) => (
          <Span key={i} color="red">
            {message.toString()}
          </Span>
        ))}
      </VStack>
    </Div>
  );
}
