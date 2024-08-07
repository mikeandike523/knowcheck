import { Fragment, ReactNode } from "react";

import { Button, ButtonProps, Div, DivProps } from "@/fwk/html";
import { LoadingTask } from "@/lib/loading";
import SpinnerOverlay from "@/components/SpinnerOverlay";
import * as rpc from "@/utils/rpc";
const RPCError = rpc.RPCError;

export interface LoadingOverlayProps<TData> extends DivProps {
  task: LoadingTask<TData>;
  /**
   * Whether or not the user is permitted to dismiss the error
   * and called the appropriate handler to reset the state of the parent compoenent
   */
  enableDismiss?: boolean;
  /**
   * Whether or not the user is permitted to cancel the running operation
   * The parent componenet is responsible for the logic to allow the cancellation o hte operation
   * Such as using an AbortController
   */
  enableAbort?: boolean;
  onDismiss?: () => void;
  onAbort?: () => void;
  /**
   * The main content over which the loading spinner and/or error dialog will be overlayed
   */
  children?: ReactNode | ReactNode[];
  width?: DivProps["width"];
  height?: DivProps["height"];
  position?: DivProps["position"];
  contentProps?: Partial<DivProps>;
  loadingOverlayProps?: Partial<DivProps>;
  errorOverlayProps?: Partial<DivProps>;
  dissmissAbortButtonProps?: Partial<ButtonProps>;
  exclusiveSuccessComponent?: ReactNode | ReactNode[] | undefined;
}

export default function LoadingOverlay<TData>({
  position = "relative",
  width = "100%",
  height = "100%",
  task,
  children,
  onDismiss = () => {},
  onAbort = () => {},
  enableDismiss = true,
  enableAbort = false,
  contentProps = {},
  loadingOverlayProps = {},
  errorOverlayProps = {},
  dissmissAbortButtonProps = {},
  exclusiveSuccessComponent,
  ...rest
}: LoadingOverlayProps<TData>) {
  const userFacingMessage = task.error
    ? typeof task.error === "string"
      ? task.error
      : RPCError.isLike(task.error)
        ? (
            task.error as {
              userFacingMessage?: string;
            }
          ).userFacingMessage
        : task.error instanceof Error
          ? task.error.message
          : typeof task.error === "object"
            ? ((
                task.error as {
                  userFacingMessage?: string;
                }
              ).userFacingMessage ?? "Unknown Error")
            : "Unknown Error"
    : "Unknown Error";
  return (
    <Div
      position={position}
      width={width}
      height={height}
      {...rest}
    >
      <Div
        position="relative"
        width={width}
        height={height}
        pointerEvents={
          task.state === "success" || task.state === "idle" ? "auto" : "none"
        }
        {...contentProps}
      >
        {exclusiveSuccessComponent && (
          <Fragment key="content">
            {task.state === "success" ? exclusiveSuccessComponent : children}
          </Fragment>
        )}
        {!exclusiveSuccessComponent && (
          <Fragment key="content">{children}</Fragment>
        )}
      </Div>
      <Div
        key="SpinnerOverlay"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        pointerEvents={task.state === "loading" ? "auto" : "none"}
        opacity={task.state === "loading" ? 1 : 0}
        background="#00000080"
        {...loadingOverlayProps}
      >
        <SpinnerOverlay />
        {enableAbort && (
          <Button
            key="DismissOrAbortButton"
            onClick={onAbort}
            position="absolute"
            top={0}
            right={0}
            {...dissmissAbortButtonProps}
          >
            &times;
          </Button>
        )}
      </Div>
      <Div
        key="ErrorDialogOverlay"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        pointerEvents={task.state === "error" ? "auto" : "none"}
        opacity={task.state === "error" ? 1 : 0}
        background="#00000080"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        {...errorOverlayProps}
      >
        <Div
          background="white"
          border="2px solid red"
          color="red"
          maxWidth={width}
          maxHeight={height}
          overflowY="auto"
        >
          {userFacingMessage}
        </Div>
        {enableDismiss && (
          <Button
            key="DismissOrAbortButton"
            onClick={onDismiss}
            position="absolute"
            top={0}
            right={0}
            {...dissmissAbortButtonProps}
          >
            &times;
          </Button>
        )}
      </Div>
    </Div>
  );
}
