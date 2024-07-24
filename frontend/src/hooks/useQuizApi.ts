import {
  QuizApiPayloadMapping,
  QuizApiReturnMapping,
  QuizEndpointReturn,
} from "@/common/api-types/handlers/quiz";
import { Action as QuizAction } from "@/common/validators/handlers/quiz";
import { useRPCRoute } from "@/lib/rpc-client";

export default function useQuizApi<TAction extends QuizAction>(
  action: TAction
) {
  const quizEndpoint = useRPCRoute<
    {
      action: TAction;
      payload: QuizApiPayloadMapping[TAction];
    },
    QuizEndpointReturn
  >("quiz", () => sessionStorage.getItem("__session") ?? undefined);
  return async function api(
    payload: QuizApiPayloadMapping[TAction]
  ): Promise<QuizApiReturnMapping[TAction]> {
    return (await quizEndpoint({
      action,
      payload,
    })) as QuizApiReturnMapping[TAction];
  };
}
