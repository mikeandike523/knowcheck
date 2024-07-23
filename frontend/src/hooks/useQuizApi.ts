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
      instanceId: string;
      action: TAction;
      payload: QuizApiPayloadMapping[TAction];
    },
    QuizEndpointReturn
  >("quiz");
  return async function api(
    instanceId: string,
    payload: QuizApiPayloadMapping[TAction]
  ): Promise<QuizApiReturnMapping[TAction]> {
    return (await quizEndpoint({
      instanceId,
      action,
      payload,
    })) as QuizApiReturnMapping[TAction];
  };
}
