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
