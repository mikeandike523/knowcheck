import {useState,ReactNode,Fragment} from'react';

import { Div, DivProps } from '@/fwk/html';

export type LoadingState = "idle" | "loading" | "error" | "success"

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
    const [data, setData] = useState<TData|undefined>(undefined);
    const [error, setError] = useState<unknown|undefined>(undefined);
    const [state, setState] = useState<LoadingState>("idle");
    return {
        state,
        error,
        data,
        setIdle: () => setState("idle"),
        setLoading: () => setState("loading"),
        setError: (error) => {
            setError(error);
        },
        setSuccess: (data) => {
            setState("success");
            setData(data);
        }
    }
}

export interface LoadingBarrierProps<TData> extends DivProps {
    task: LoadingTask<TData>;
    idleElement?: ReactNode;
    loadingElement?: ReactNode;
    errorElement?: ReactNode;
    successElement?: ReactNode;
    resetButtonElement?: ReactNode;
    idleSelection?: LoadingState[]
    loadingSelection?: LoadingState[]
    errorSelection?: LoadingState[]
    successSelection?: LoadingState[]
    resetButtonSelection?: LoadingState[]
}

function LoadingBarrierStateElementSelection<TData>({
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
}:Omit<LoadingBarrierProps<TData>,'task'>&{
    item: LoadingState | "resetButton"
}) {
    const elementMap = {
        "idle": idleElement,
        "loading": loadingElement,
        "error": errorElement,
        "success": successElement,
        "resetButton": resetButtonElement,
    } as const
    const selectionMap = {
        "idle": idleSelection,
        "loading": loadingSelection,
        "error": errorSelection,
        "success": successSelection,
        "resetButton": resetButtonSelection,
    } as const
    const relevantSelection = selectionMap[item]??[];
    return <Fragment key={`LoadingBarrierStateElementSelection:${item}`}>
{relevantSelection.map((state)=>{
    const stateElement = elementMap[state as keyof typeof elementMap]
    return <Fragment key={`ShownElement:${state}`}>{stateElement}</Fragment>
})}
    </Fragment>
}

export function LoadingBarrier<TData>({task,...rest}:LoadingBarrierProps<TData>){
    const taskState = task.state;
    return <Div key="LoadingBarrierRot" {...rest}>
        {taskState === "idle" && <LoadingBarrierStateElementSelection key={taskState} item="idle" {...rest} />}
        {taskState === "loading" && <LoadingBarrierStateElementSelection key={taskState} item="loading" {...rest} />}
        {taskState === "error" && <LoadingBarrierStateElementSelection key={taskState} item="error" {...rest} />}
        {taskState === "success" && <LoadingBarrierStateElementSelection key={taskState} item="success" {...rest} />}
        <LoadingBarrierStateElementSelection key={"resetButton"} item="resetButton" {...rest} />
    </Div>
}