import { useEffect, useState } from "react";

export type LoadingState = "idle" | "loading" | "error" | "success";

export interface LoadingTask<TData, TError = unknown> {
  state: LoadingState;
  error?: TError;
  data?: TData;
  setIdle: () => void;
  setLoading: () => void;
  setError(error?: TError | undefined): void;
  setSuccess(data?: TData | undefined): void;
}

export function useLoadingTask<TData, TError = unknown>(): LoadingTask<
  TData,
  TError
> {
  const [data, setData] = useState<TData | undefined>(undefined);
  const [error, setError] = useState<TError | undefined>(undefined);
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
export function useCompoundTask<TUnion, TErrorUnion = unknown>(
  tasks: LoadingTask<TUnion, TErrorUnion>[]
): LoadingTask<TUnion[], TErrorUnion[]> {
  const compoundTask = useLoadingTask<TUnion[], TErrorUnion[]>();
  useEffect(() => {
    if (tasks.every((task) => task.state === "success")) {
      compoundTask.setSuccess(tasks.map((task) => task.data!));
    } else if (tasks.some((task) => task.state === "error")) {
      compoundTask.setError(
        tasks
          .filter((task) => task.state === "error")
          .map((task) => task.error!)
      );
    } else if (tasks.some((task) => task.state === "loading")) {
      compoundTask.setLoading();
    } else if (tasks.every((task) => task.state === "idle")) {
      compoundTask.setIdle();
    } else {
      compoundTask.setIdle();
    }
  }, [...tasks.map((task) => task.state)]);
  return compoundTask;
}
