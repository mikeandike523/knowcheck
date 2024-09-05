import { useState, ReactNode, Fragment } from "react";

import { Div, DivProps } from "@/fwk/html";

export type LoadingState = "idle" | "loading" | "error" | "success";

export interface LoadingTask<TData> {
  state: LoadingState;
  error?: unknown;
  data?: TData;
  setIdle: () => void;
  setLoading: () => void;
  setError(error?: unknown): void;
  setSuccess(data?: TData): void;
}

export function useLoadingTask<TData>(): LoadingTask<TData> {
  const [data, setData] = useState<TData | undefined>(undefined);
  const [error, setError] = useState<unknown | undefined>(undefined);
  const [state, setState] = useState<LoadingState>("idle");
  return {
    state,
    error,
    data,
    setIdle: () => {
      setData(undefined);
      setError(undefined);
      setState("idle");
    },
    setLoading: () => {
      setState("loading");
      setData(undefined);
      setError(undefined);
    },
    setError: (error) => {
      setState("error");
      setData(undefined);
      setError(error);
    },
    setSuccess: (data) => {
      setState("success");
      setData(data);
      setError(undefined);
    },
  };
}

/**
 * Computes the state relationships between multiple tasks and packages up into a neat
 * reusable object
 * 
 * In technicality, this does not need to be a hook,
 * but it helps to make it a hook to prevent misuse of react lifecycle
 * 
 * Mostly used to allow `LaodingOverlay` components to handle cases
 * where data from multiple sources must be loaded in before content is vieweable
 * or interactible
 * 
 * 
 * @param tasks 
 * @returns 
 */
export function useCompoundTask<TUnion>(tasks: LoadingTask<TUnion>[]|LoadingTask<TUnion>) {
  const tasksArray = Array.isArray(tasks)? tasks : [tasks];
  const errors = tasksArray.map((task) => task.error);
  const anyIdle = tasksArray.some((task) => task.state === "idle");
  const anyLoading = tasksArray.some((task) => task.state === "loading");
  const anySuccess = tasksArray.some((task) => task.state === "success");
  const anyError = tasksArray.some((task) => task.state === "error");
  const allIdle = tasksArray.every((task) => task.state === "idle");
  const allLoading = tasksArray.every((task) => task.state === "loading");
  const allSuccess = tasksArray.every((task) => task.state === "success");
  const allError = tasksArray.every((task) => task.state === "error");
  return {
    tasksArray,
    errors,
    anyIdle,
    anyLoading,
    anySuccess,
    anyError,
    allIdle,
    allLoading,
    allSuccess,
    allError,
  }
}

export interface LoadingTaskElementSwitchProps<TData> extends DivProps {
  task: LoadingTask<TData>;
  idleElement?: ReactNode;
  loadingElement?: ReactNode;
  errorElement?: ReactNode;
  successElement?: ReactNode;
  resetButtonElement?: ReactNode;
  idleSelection?: LoadingState[];
  loadingSelection?: LoadingState[];
  errorSelection?: LoadingState[];
  successSelection?: LoadingState[];
  resetButtonSelection?: LoadingState[];
}

function LoadingTaskElementSwitchStateElementSelection<TData>({
  item,
  idleElement,
  loadingElement,
  errorElement,
  successElement,
  resetButtonElement,
  idleSelection,
  loadingSelection,
  errorSelection,
  successSelection,
  resetButtonSelection,
}: Omit<LoadingTaskElementSwitchProps<TData>, "task"> & {
  item: LoadingState | "resetButton";
}) {
  const elementMap = {
    idle: idleElement,
    loading: loadingElement,
    error: errorElement,
    success: successElement,
    resetButton: resetButtonElement,
  } as const;
  const selectionMap = {
    idle: idleSelection,
    loading: loadingSelection,
    error: errorSelection,
    success: successSelection,
    resetButton: resetButtonSelection,
  } as const;
  const relevantSelection = selectionMap[item] ?? [];
  return (
    <Fragment key={`LoadingBarrierStateElementSelection:${item}`}>
      {relevantSelection.map((state) => {
        const stateElement = elementMap[state as keyof typeof elementMap];
        return (
          <Fragment key={`ShownElement:${state}`}>{stateElement}</Fragment>
        );
      })}
    </Fragment>
  );
}

export function LoadingTaskElementSwitch<TData>({
  task,
  ...rest
}: LoadingTaskElementSwitchProps<TData>) {
  const taskState = task.state;
  return (
    <Div key="LoadingBarrierRot" {...rest}>
      {taskState === "idle" && (
        <LoadingTaskElementSwitchStateElementSelection
          key={taskState}
          item="idle"
          {...rest}
        />
      )}
      {taskState === "loading" && (
        <LoadingTaskElementSwitchStateElementSelection
          key={taskState}
          item="loading"
          {...rest}
        />
      )}
      {taskState === "error" && (
        <LoadingTaskElementSwitchStateElementSelection
          key={taskState}
          item="error"
          {...rest}
        />
      )}
      {taskState === "success" && (
        <LoadingTaskElementSwitchStateElementSelection
          key={taskState}
          item="success"
          {...rest}
        />
      )}
      <LoadingTaskElementSwitchStateElementSelection
        key={"resetButton"}
        item="resetButton"
        {...rest}
      />
    </Div>
  );
}
