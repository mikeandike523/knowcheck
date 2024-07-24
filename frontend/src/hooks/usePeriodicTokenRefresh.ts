import { useEffect, useState, useRef, MutableRefObject } from "react";

import { InvalidTokenReason } from "@/common/api-types";
import { TSchema } from "@/common/validators/handlers/token";
import { useRPCRoute } from "@/lib/rpc-client";
import ColorDebug from "@/utils/ColorDebug";
import formatError from "@/utils/formatError";
import { RPCError } from "@/utils/rpc";

export default function usePeriodicTokenRefresh({
  intervalMinutes = 5,
  onFailure,
  instanceId,
}: {
  instanceId: string | undefined;
  intervalMinutes?: number;
  onFailure: (
    reason: InvalidTokenReason | undefined,
    from: RPCError | unknown
  ) => void;
}) {
  const timerRef: MutableRefObject<NodeJS.Timeout | null> = useRef(null);
  const intervalMillis = intervalMinutes * 60 * 1000;
  const onFailureWithLogging: typeof onFailure = (reason, from) => {
    if (reason) {
      ColorDebug.browser().error(
        "Failed to refresh token due to known error: " +
          InvalidTokenReason[reason],
        {
          textColor: "red",
        }
      );
    } else {
      ColorDebug.browser().error(
        "Failed to refresh token due to unknown error: \n" +
          JSON.stringify(formatError(from), null, 2),
        {
          textColor: "red",
        }
      );
    }

    onFailure(reason, from);
  };
  const getToken = () => {
    return sessionStorage.getItem("__session") ?? undefined;
  };
  const route = useRPCRoute<TSchema, string>("token", getToken);
  async function refreshToken() {
    if (!instanceId) return;
    try {
      ColorDebug.browser().info("Attempting token refresh...", {
        textColor: "green",
      });
      const tokenResult = await route({
        action: "refresh",
        instanceId,
      });
      sessionStorage.setItem("__session", tokenResult);
      ColorDebug.browser().info("Successfuly refreshed token.", {
        textColor: "green",
      });
    } catch (e) {
      if (RPCError.isLike(e)) {
        const rE = RPCError.wrap(e);
        if (typeof rE.cause === "string") {
          if (
            (Object.values(InvalidTokenReason) as string[]).includes(rE.cause)
          ) {
            const reason = rE.cause as InvalidTokenReason;
            onFailureWithLogging(reason, rE);
          } else {
            onFailureWithLogging(undefined, rE);
          }
        } else {
          onFailureWithLogging(undefined, rE);
        }
      } else {
        onFailureWithLogging(undefined, e);
      }
    }
  }
  const start = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const newTimer = setInterval(refreshToken, intervalMillis);
    timerRef.current = newTimer;
  };
  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return { start, stop };
}
