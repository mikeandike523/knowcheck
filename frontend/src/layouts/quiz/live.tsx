import { Fragment, useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";

import { TSchema as TSchemaAuth } from "@/common/validators/handlers/auth";
import { TSchema as TSchemaToken } from "@/common/validators/handlers/token";
import { TokenClaims } from "@/common/api-types";

import InputWithValidation, {
  useInputWithValidationState,
} from "@/components/InputWithValidation";
import LoadingEllipses from "@/components/LoadingEllipses";
import LoadingOverlay from "@/components/LoadingOverlay";
import SemanticButton from "@/components/SemanticButton";
import VStack from "@/fwk/components/VStack";
import { Div, H1, H2 } from "@/fwk/html";
import { LoadingTask, useLoadingTask } from "@/lib/loading";
import { useAPIData, useRPCRoute } from "@/lib/rpc-client";
import theme from "@/themes/main";
import { zodToSimple } from "@/utils/input-validation";
import nonempty from "@/utils/zod-refiners/nonempty";
import { z } from "zod";
import { RPCError } from "@/utils/rpc";
import { InvalidTokenReason } from "@/common/api-types";
import usePeriodicTokenRefresh from "@/hooks/usePeriodicTokenRefresh";
import useQuizApi from "@/hooks/useQuizApi";
import { TReturn as TReturnLoadNextQuestion } from "@/common/api-types/handlers/quizActions/loadNextQuestion";
import { TReturn as TReturnSubmitAnswer } from "@/common/api-types/handlers/quizActions/submitAnswer";
import ColorDebug from "@/utils/ColorDebug";
import formatError from "@/utils/formatError";
import HStack from "@/fwk/components/HStack";

export interface LiveProps {
  subjectId: string;
  instanceId: string | undefined;
}

type InstanceData = {
  quizName: string;
};

function SublayoutEnterAccessCode({
  subjectId,
  instanceId,
  onLogin,
  loginTask,
  instanceData,
}: {
  subjectId: string;
  instanceId: string;
  onLogin: () => void;
  loginTask: LoadingTask<null>;
  instanceData: InstanceData | undefined;
}) {
  const [successMessage, setSuccessMessage] = useState("Login successful!");
  const authRoute = useRPCRoute<TSchemaAuth, string>("auth");
  const tokenRoute = useRPCRoute<TSchemaToken, TokenClaims>("token", () => {
    return sessionStorage.getItem("__session") ?? undefined;
  });

  const accessCodeInputState = useInputWithValidationState({
    initialDOMValue: "",
    validator: zodToSimple(
      z
        .string()
        .transform((value) => value.trim())
        .superRefine(nonempty(false, "Please enter an access code"))
        .superRefine((value, ctx) => {
          if (value.toLowerCase().match(/^[a-zA-Z0-9]{10}$/) === null) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "Access code must be exactly 10 characters long and contain only letters and numbers.",
              fatal: true,
            });
          }
        })
    ),
  });
  const registerLink =
    typeof window.location !== "undefined"
      ? window.location.protocol +
        "//" +
        window.location.host +
        "/quiz/" +
        subjectId +
        "/register/"
      : "";
  async function submitAccessCode(accessCode: string | null) {
    try {
      loginTask.setLoading();
      if (accessCode === null) {
        try {
          await tokenRoute({
            action: "check",
            instanceId,
          });
          setSuccessMessage("Already logged in!");
          loginTask.setSuccess(null);
          onLogin();
          console.info("Existing token is still valid, proceeding with quiz..");
        } catch (e) {
          if (e instanceof RPCError) {
            if (e.status === 401 || e.status === 403) {
              if (e.cause === InvalidTokenReason.MISSING_TOKEN) {
                console.info(
                  "There was no existing login token, opening up login form..."
                );
              }
              if (e.cause === InvalidTokenReason.INVALID_TOKEN) {
                console.info(
                  "Existing token is no longer valid, opening up login form..."
                );
              }
              if (e.cause === InvalidTokenReason.EXPIRED) {
                console.info("Token has expired, opening up login form...");
              }
              if (e.cause === InvalidTokenReason.INVALID_FORMAT) {
                console.info(
                  "Token format is invalid, opening up login form..."
                );
              }
              loginTask.setIdle();
              return;
            }
          }
          throw e;
        }
      } else {
        const __session = await authRoute({
          accessCode,
          subjectId,
          instanceId,
        });
        sessionStorage.setItem("__session", __session);
      }
      loginTask.setSuccess(null);
      onLogin();
    } catch (e) {
      loginTask.setError(e);
    }
  }

  useEffect(() => {
    if (instanceData) {
      submitAccessCode(null);
    }
  }, [instanceData]);

  return (
    <VStack
      width="clamp(auto,40em,100%)"
      gap={theme.gutters.lg}
      padding={theme.gutters.lg}
      boxSizing="border-box"
    >
      <LoadingOverlay
        display={instanceData ? "block" : "none"}
        task={loginTask}
        contentProps={{
          display: "flex",
          flexDirection: "column",
          gap: theme.gutters.lg,
          alignItems: "center",
          borderRadius: theme.pages.quiz.panel.borderRadius,
          backgroundColor: "white",
          boxSizing: "border-box",
        }}
        onDismiss={() => {
          loginTask.setIdle();
        }}
      >
        {loginTask.state === "success" ? (
          <Fragment key="AccessCodeForm">
            <Div background="lightgreen">{successMessage}</Div>
          </Fragment>
        ) : (
          <Fragment key="AccessCodeForm">
            <Div>Enter the access code you recieved in your email.</Div>
            <Div>
              If you cannot locate the email, you will have to register again
              at:
            </Div>
            <a href={registerLink}>{registerLink}</a>
            <InputWithValidation
              type="password"
              inputState={accessCodeInputState}
              label="Access Code"
            />
            <SemanticButton
              color="primary"
              padding="0.5em"
              onClick={() => {
                const validationResult = accessCodeInputState.validate();
                if (validationResult.valid) {
                  submitAccessCode(validationResult.data!);
                }
              }}
            >
              Start Quiz
            </SemanticButton>
          </Fragment>
        )}
      </LoadingOverlay>
    </VStack>
  );
}

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
  const [answer, setAnswer] = useState("");
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
      loadNextQuestion();
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
  return (
    <VStack
      width="clamp(auto,40em,100%)"
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
              width: 100%;
              max-width: 40em;
              display: ${showOutOfQuestionsMessage ? "none" : "block"};
            `}
            rows={5}
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
          ></textarea>
          <SemanticButton
            color="primary"
            padding="0.5em"
            display={showOutOfQuestionsMessage ? "none" : "block"}
            onClick={()=>{
              submitAnswer()

            }}
          >
            Submit
          </SemanticButton>
          {loadingTaskSubmitAnswer.state === "success" && (
            <>
              <HStack
                width="100%"
                border="2px solid black"
                gap={theme.gutters.lg}
                padding={theme.gutters.lg}
              >
                <Div padding="4px" fontSize="16px" aspectRatio={1.0}>
                  {lastScore}
                </Div>
                <Div flex={1} textAlign="left">
                  {lastExplanation}
                </Div>
              </HStack>
              <SemanticButton
                color="primary"
                padding="0.5em"
                onClick={() => {
                  setAnswer("");
                  loadingTaskSubmitAnswer.setIdle();
                  loadNextQuestion()
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

type SublayoutState = "enter-access-code" | "main-quiz";

export default function Live({ subjectId, instanceId }: LiveProps) {
  const loginTask = useLoadingTask<null>();
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
  const tokenRefresher = usePeriodicTokenRefresh({
    instanceId,
    intervalMinutes: 0.5,
    onFailure: (reason, from) => {
      if (reason === InvalidTokenReason.INVALID_TOKEN) {
        loginTask.setError("Login expired or invalid... Please login again.");
      }
      if (reason === InvalidTokenReason.EXPIRED) {
        loginTask.setError("Login expired... Please login again.");
      }
      if (reason === InvalidTokenReason.INVALID_FORMAT) {
        loginTask.setError("Login token corrupted... Please login again.");
      }
      if (reason === InvalidTokenReason.MISSING_TOKEN) {
        loginTask.setError("No login token found... Please login again.");
      }
      console.error("Failed to refresh token", reason, from);
    },
  });
  const [sublayoutState, setSublayoutState] =
    useState<SublayoutState>("enter-access-code");

  if (!instanceId) {
    return (
      <Div
        key="QuizOrMissingInstanceId"
        background="white"
        color="red"
        border="2px solid red"
        fontSize="24px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="8px"
      >
        <Div>Missing Instance ID</Div>
        <Div>Check the url in the address bar.</Div>
        {typeof window !== "undefined" && (
          <Div>
            The url should follow the format:{" "}
            <b>
              {window.location.protocol}//{window.location.host}
              /quiz/&lt;SUBJECT ID&gt;/live/&lt;INSTANCE ID&gt;
            </b>
          </Div>
        )}
      </Div>
    );
  }

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
      <Div minHeight="48px" {...theme.pages.quiz.panel}>
        <LoadingOverlay
          task={loadInstanceDataTask}
          loadingOverlayProps={{
            borderRadius: theme.pages.quiz.panel.borderRadius,
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
          <Div></Div>
          {sublayoutState === "enter-access-code" && (
            <Fragment key="sublayout">
              <SublayoutEnterAccessCode
                instanceData={loadInstanceDataTask.data}
                loginTask={loginTask}
                subjectId={subjectId}
                instanceId={instanceId!}
                onLogin={() => {
                  setSublayoutState("main-quiz");
                  tokenRefresher.start();
                }}
              />
            </Fragment>
          )}
          {sublayoutState === "main-quiz" && (
            <Fragment key="sublayout">
              <SublayoutMainQuiz instanceId={instanceId} />
            </Fragment>
          )}
        </LoadingOverlay>
      </Div>
    </Div>
  );
}
