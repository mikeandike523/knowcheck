import { css } from "@emotion/react";
import { Fragment, KeyboardEvent, useEffect, useState } from "react";

import { TokenClaims } from "@/common/api-types";
import { TSchema as TSchemaAuth } from "@/common/validators/handlers/auth";
import { TSchema as TSchemaToken } from "@/common/validators/handlers/token";

import { InvalidTokenReason } from "@/common/api-types";
import { TReturn as TReturnLoadNextQuestion } from "@/common/api-types/handlers/quizActions/loadNextQuestion";
import { TReturn as TReturnSubmitAnswer } from "@/common/api-types/handlers/quizActions/submitAnswer";
import InputWithValidation, {
  useInputWithValidationState,
} from "@/components/InputWithValidation";
import LoadingOverlay from "@/components/LoadingOverlay";
import SemanticButton from "@/components/SemanticButton";
import HStack from "@/fwk/components/HStack";
import VStack from "@/fwk/components/VStack";
import { Div, H1 } from "@/fwk/html";
import usePeriodicTokenRefresh from "@/hooks/usePeriodicTokenRefresh";
import useQuizApi from "@/hooks/useQuizApi";
import { LoadingTask, useLoadingTask } from "@/lib/loading";
import { useAPIData, useRPCRoute } from "@/lib/rpc-client";
import theme from "@/themes/main";
import ColorDebug from "@/utils/ColorDebug";
import dedentTrim from "@/utils/dedentTrim";
import formatError from "@/utils/formatError";
import { zodToSimple } from "@/utils/input-validation";
import { RPCError } from "@/utils/rpc";
import nonempty from "@/utils/zod-refiners/nonempty";
import { z } from "zod";
import AccessCodeBarrier from "@/components/AccessCodeBarrier";
import useAccessCodeBarrierState from "@/hooks/useAccessCodeBarrierState";

export interface LiveProps {
  subjectId: string;
  instanceId: string | undefined;
}

type InstanceData = {
  quizName: string;
};

function SublayoutMainQuiz({ instanceId }: { instanceId: string }) {
  const routeLoadNextQuestion = useQuizApi("loadNextQuestion");
  const routeSubmitAnswer = useQuizApi("submitAnswer");
  const loadingTaskLoadNextQuestion = useLoadingTask<TReturnLoadNextQuestion>();
  const loadingTaskSubmitAnswer = useLoadingTask<TReturnSubmitAnswer>();
  const currentQuestion = loadingTaskLoadNextQuestion.data?.body ?? "";
  const currentQuestionId = loadingTaskLoadNextQuestion.data?.id ?? "";
  const numCompletedQuestions =
    loadingTaskLoadNextQuestion.data?.numCompletedQuestions ?? 0;
  const showOutOfQuestionsMessage =
    loadingTaskLoadNextQuestion.state === "success" && !currentQuestionId;
  const lastScore = loadingTaskSubmitAnswer.data?.gptScore ?? 0;
  const lastExplanation = loadingTaskSubmitAnswer.data?.gptExplanation ?? "";
  const lastSupportingInfo = loadingTaskSubmitAnswer.data?.supportingInfo ?? [];
  const [answer, setAnswer] = useState("");
  const answerLineCount = answer.split("\n").length;
  async function loadNextQuestion() {
    try {
      loadingTaskLoadNextQuestion.setLoading();
      const result = await routeLoadNextQuestion({
        instanceId,
      });
      loadingTaskLoadNextQuestion.setSuccess(result);
    } catch (e) {
      loadingTaskLoadNextQuestion.setError(e);
      ColorDebug.browser().error(JSON.stringify(formatError(e), null, 2), {
        textColor: "red",
      });
    }
  }
  async function submitAnswer() {
    if (
      loadingTaskLoadNextQuestion.state === "loading" ||
      loadingTaskSubmitAnswer.state === "loading"
    ) {
      return;
    }
    try {
      loadingTaskSubmitAnswer.setLoading();
      const result = await routeSubmitAnswer({
        answer,
        instanceId,
        questionId: currentQuestionId,
      });
      loadingTaskSubmitAnswer.setSuccess(result);
    } catch (e) {
      loadingTaskSubmitAnswer.setError(e);
      ColorDebug.browser().error(JSON.stringify(formatError(e), null, 2), {
        textColor: "red",
      });
    }
  }
  useEffect(() => {
    if (loadingTaskLoadNextQuestion.state === "idle") {
      loadNextQuestion();
    }
  }, [loadingTaskLoadNextQuestion.state]);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Tab") {
      const textarea = event.target as HTMLTextAreaElement | null | undefined;
      if (!textarea) {
        return;
      }
      event.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      textarea.selectionStart = textarea.selectionEnd = start + 4;

      // Set textarea value to: text before caret + 4 spaces + text after caret
      setAnswer(answer.substring(0, start) + "    " + answer.substring(end));
    }
  };
  return (
    <VStack
      width="100%"
      gap={theme.gutters.lg}
      padding={theme.gutters.lg}
      boxSizing="border-box"
    >
      {showOutOfQuestionsMessage && (
        <Div
          color={theme.colors.semantic.success}
          fontSize="18px"
          textAlign="center"
        >
          Congratualations!
          <br />
          You answered all {numCompletedQuestions} available questions for this
          subject.
          <br />
          Check back later for more!
        </Div>
      )}
      <LoadingOverlay
        task={loadingTaskLoadNextQuestion}
        onDismiss={() => {
          loadingTaskLoadNextQuestion.setIdle();
        }}
        contentProps={{
          display: showOutOfQuestionsMessage ? "none" : "flex",
        }}
      >
        {currentQuestion ? (
          <Div fontWeight="bold" fontSize="18px" textAlign="center">
            {currentQuestion}
          </Div>
        ) : (
          <Div height="48px"></Div>
        )}
      </LoadingOverlay>
      <LoadingOverlay task={loadingTaskSubmitAnswer}>
        <VStack
          width="100%"
          gap={theme.gutters.lg}
          padding={theme.gutters.lg}
          boxSizing="border-box"
        >
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            css={css`
              font-size: 1em;
              line-height: 1.5em;
              min-height: 6em;
              height: ${(answerLineCount + 1) * 1.5}em;
              width: 100%;
              display: ${showOutOfQuestionsMessage ||
              loadingTaskSubmitAnswer.state === "success"
                ? "none"
                : "block"};
            `}
            disabled={
              loadingTaskLoadNextQuestion.state === "loading" ||
              loadingTaskSubmitAnswer.state === "loading"
            }
            placeholder={
              loadingTaskLoadNextQuestion.state === "loading"
                ? "Loading..."
                : loadingTaskSubmitAnswer.state === "loading"
                  ? "Processing..."
                  : "Write a short answer..."
            }
            onKeyDown={handleKeyDown}
          ></textarea>
          <Div
            whiteSpace="pre-wrap"
            minHeight="6em"
            display={
              loadingTaskSubmitAnswer.state === "success" ? "block" : "none"
            }
            background="lightgray"
            width="1005"
          >
            {answer}
          </Div>
          <SemanticButton
            color="primary"
            padding="0.5em"
            display={
              showOutOfQuestionsMessage ||
              loadingTaskSubmitAnswer.state === "success"
                ? "none"
                : "block"
            }
            onClick={() => {
              submitAnswer();
            }}
          >
            Submit
          </SemanticButton>
          {loadingTaskSubmitAnswer.state === "success" && (
            <>
              <HStack
                width="100%"
                gap={theme.gutters.lg}
                padding={theme.gutters.lg}
              >
                <VStack alignItems="stretch">
                  <Div
                    padding="4px"
                    fontSize="16px"
                    border="2px dotted black"
                    borderBottom="none"
                    textAlign="center"
                    fontWeight="bold"
                  >
                    Score (1-10)
                  </Div>
                  <Div
                    aspectRatio={1.0}
                    boxSizing="border-box"
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    border="2px dotted black"
                  >
                    <Div fontSize="48px" boxSizing="border-box">
                      {lastScore}
                    </Div>
                  </Div>
                </VStack>

                <VStack flex={1} textAlign="left" alignItems="stretch">
                  <Div
                    padding="4px"
                    fontSize="16px"
                    border="2px dotted black"
                    borderBottom="none"
                    textAlign="center"
                    fontWeight="bold"
                  >
                    Explanation
                  </Div>
                  <Div
                    whiteSpace="pre-wrap"
                    padding="4px"
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    border="2px dotted black"
                  >
                    <Div>{lastExplanation}</Div>
                  </Div>
                </VStack>
                <VStack flex={1} textAlign="left" alignItems="stretch">
                  <Div
                    padding="4px"
                    fontSize="16px"
                    border="2px dotted black"
                    borderBottom="none"
                    textAlign="center"
                    fontWeight="bold"
                  >
                    Supporting Evidence
                  </Div>
                  <Div
                    whiteSpace="pre-wrap"
                    padding="4px"
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    border="2px dotted black"
                  >
                    <Div>
                      <ul>
                        {lastSupportingInfo.map((info, index) => {
                          return (
                            <li key={index}>
                              <Div whiteSpace="pre-wrap">{info}</Div>
                            </li>
                          );
                        })}
                      </ul>
                    </Div>
                  </Div>
                </VStack>
              </HStack>
              <SemanticButton
                color="primary"
                padding="0.5em"
                onClick={() => {
                  setAnswer("");
                  loadingTaskSubmitAnswer.setIdle();
                  loadNextQuestion();
                }}
              >
                Next Question
              </SemanticButton>
            </>
          )}
        </VStack>
      </LoadingOverlay>
    </VStack>
  );
}

export default function Live({ subjectId, instanceId }: LiveProps) {
  const loadInstanceDataTask = useAPIData<
    {
      subjectId: string;
      instanceId: string;
    },
    InstanceData
  >(
    "getQuizInstanceData",
    {
      subjectId,
      instanceId: instanceId ?? "",
    },
    []
  ).task;
  const accessCodeBarrierState = useAccessCodeBarrierState({
    subjectId,
    instanceId: instanceId ?? "",
  });
  return (
    <Div
      key="QuizOrMissingInstanceId"
      {...{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Div
        minHeight="48px"
        style={{
          maxHeight: dedentTrim`
          calc(
            100vh - ( 2 * ${theme.navbar.height} ) - ( 2* ${theme.gutters.lg} )
          )`.replace(/\n/g, ""),
        }}
        {...theme.pages.quiz.panel}
      >
        <LoadingOverlay
          task={loadInstanceDataTask}
          loadingOverlayProps={{
            borderRadius: theme.pages.quiz.panel.borderRadius,
          }}
          contentProps={{
            overflowY: "auto",
          }}
        >
          {loadInstanceDataTask.state === "success" && (
            <>
              <H1
                textAlign="center"
                fontSize="24px"
                margin={0}
                padding={theme.gutters.md}
                width="100%"
                background={theme.navbar.background}
                borderTopLeftRadius={theme.pages.quiz.panel.borderRadius}
                borderTopRightRadius={theme.pages.quiz.panel.borderRadius}
                boxSizing="border-box"
                color="white"
              >
                {loadInstanceDataTask.data?.quizName}
              </H1>
            </>
          )}
          <AccessCodeBarrier  state={accessCodeBarrierState}>
            <SublayoutMainQuiz instanceId={instanceId!} />
          </AccessCodeBarrier>
        </LoadingOverlay>
      </Div>
    </Div>
  );
}
