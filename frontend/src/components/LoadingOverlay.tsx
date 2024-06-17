import { ReactNode } from "react";

import { LoadingTask, LoadingBarrier } from "@/lib/loading";

export interface LoadingOverlayProps<TData> {
  task: LoadingTask<TData>;
  idleElement?: ReactNode;
  completeElement?: ReactNode;
  idleIsComplete?: boolean;
  enableResubmit?: boolean;
}

export default function LoadingOverlay<TData>({
  task,
  idleElement,
  completeElement,
  idleIsComplete,
  enableResubmit,
  ...rest
}: LoadingOverlayProps<TData>) {

 const errorElement = <></>
 const loadingElement = <></>
 const resetButtonElement = <></>
  return <LoadingBarrier key="LoadingOverlay" task={task}
idleElement={idleElement}
loadingElement={loadingElement}
errorElement={errorElement}
successElement={completeElement}
idleSelection={idleIsComplete?["success"]:["idle"]}
successSelection={["success"]}

  
  
  {...rest} />;
}
