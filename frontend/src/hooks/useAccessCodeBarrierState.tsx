import { useLoadingTask } from "@/lib/loading";
import usePeriodicTokenRefresh from "./usePeriodicTokenRefresh";
import { useEffect, useState } from "react";
import { InvalidTokenReason } from "@/common/api-types";
import { useRPCRoute } from "@/lib/rpc-client";
import { TSchema as TSchemaAuth } from "@/common/validators/handlers/auth";
import { TSchema as TSchemaToken } from "@/common/validators/handlers/token";
import { TokenClaims } from "@/common/api-types";

export default function useAccessCodeBarrierState({
  instanceId,
  subjectId,
}: {
  instanceId: string;
  subjectId: string;
}) {
  const [successMessage, setSuccessMessage] = useState("Login successful!");
  const authRoute = useRPCRoute<TSchemaAuth, string>("auth");
  const tokenRoute = useRPCRoute<TSchemaToken, TokenClaims>("token", () => {
    return sessionStorage.getItem("__session") ?? undefined;
  });

  const loginTask = useLoadingTask<null>();

  const tokenRefresher = usePeriodicTokenRefresh({
    instanceId,
    intervalMinutes: 0.5,
    onFailure: (reason, from) => {
      if (reason === InvalidTokenReason.INVALID_TOKEN) {
        loginTask.setError("Login expired or invalid... Please login again.");
      } else if (reason === InvalidTokenReason.EXPIRED) {
        loginTask.setError("Login expired... Please login again.");
      } else if (reason === InvalidTokenReason.INVALID_FORMAT) {
        loginTask.setError("Login token corrupted... Please login again.");
      } else if (reason === InvalidTokenReason.MISSING_TOKEN) {
        loginTask.setError("No login token found... Please login again.");
      } else {
        loginTask.setError("Failed to refresh login... Please login again.");
      }
      console.error("Failed to refresh token", reason, from);
    },
  });

  const authenticated = loginTask.state === "success";

  async function login(accessCode: string | null) {
    try {
      if (accessCode === null) {
        if (sessionStorage.getItem("__session")) {
          loginTask.setLoading();
          await tokenRoute({
            action: "check",
            instanceId,
          });
          console.info("Existing token is still valid, proceeding with quiz..");
          setSuccessMessage("Already logged in!");
        loginTask.setSuccess(null);
        }
      } else {
        loginTask.setLoading();
        const __session = await authRoute({
          accessCode,
          subjectId,
          instanceId,
        });
        sessionStorage.setItem("__session", __session);
        setSuccessMessage("Login successful!");
      loginTask.setSuccess(null);
      }
    } catch (e) {
      loginTask.setError(e);
    }
  }
  useEffect(() => {
    if (loginTask.state === "idle" && !authenticated) {
      login(null);
    }
  }, [authenticated, loginTask.state]);
  async function reset() {
    loginTask.setIdle();
  }
  useEffect(() => {
    if (authenticated) {
      tokenRefresher.start();
    } else {
      tokenRefresher.stop();
    }
  }, [authenticated]);
  return {
    subjectId,
    instanceId,
    login,
    reset,
    authenticated,
    loginTask,
    tokenRefresher,
    successMessage,
  };
}

export type AccessCodeBarrierState = ReturnType<
  typeof useAccessCodeBarrierState
>;
