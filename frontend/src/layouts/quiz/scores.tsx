import AccessCodeBarrier from "@/components/AccessCodeBarrier";
import LoadingOverlay from "@/components/LoadingOverlay";
import Navbar from "@/components/Navbar";
import { Div, H1 } from "@/fwk/html";
import useAccessCodeBarrierState from "@/hooks/useAccessCodeBarrierState";
import { useAPIData } from "@/lib/rpc-client";
import theme from "@/themes/main";
import dedentTrim from "@/utils/dedentTrim";
import {
  TArgs as TArgsGetScores,
  TReturn as TReturnGetScores,
} from "@/common/api-types/handlers/getScores";
import SemanticButton from "@/components/SemanticButton";

export interface LiveProps {
  subjectId: string;
  instanceId: string | undefined;
}

type InstanceData = {
  quizName: string;
};

function SublayoutViewScores({
  instanceId,
  subjectId,
}: {
  instanceId: string;
  subjectId: string;
}) {
  const loadScoresTask = useAPIData<TArgsGetScores, TReturnGetScores>(
    "getScores",
    {
      instanceId,
    },
    []
  ).task;
  const scores = loadScoresTask.data;
  return (
    <LoadingOverlay
      task={loadScoresTask}
      contentProps={{
        width: "100%",
        padding: theme.gutters.lg,
        display: "flex",
        flexDirection: "column",
        gap: theme.gutters.lg,
        boxSizing: "border-box",
      }}
    >
      {scores &&
        Object.entries(scores).map(([questionId, score]) => {
          return (
            <Div
              key={questionId}
              display="flex"
              flexDirection="row"
              alignItems="stretch"
              border="2px solid black"
              gap={theme.gutters.md}
              boxSizing="border-box"
            >
              <Div
                borderRight="2px solid black"
                fontSize="48px"
                width="96px"
                aspectRatio={1}
                textAlign="center"
                lineHeight="2em"
              >
                {score.gptScore}
              </Div>
              <Div
                flex={1}
                maxHeight="96px"
                padding={theme.gutters.md}
                overflowY="auto"
                whiteSpace="pre-wrap"
                fontSize="18px"
              >
                {score.questionText}
              </Div>
              <SemanticButton
                borderLeft="2px solid black"
                fontSize="24px"
                color="light"
                padding="0.5em"
              >
                Details
              </SemanticButton>
            </Div>
          );
        })}
    </LoadingOverlay>
  );
}

export default function Scores({ subjectId, instanceId }: LiveProps) {
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
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Navbar subjectId={subjectId} instanceId={instanceId} />
      <Div
        style={{
          maxHeight: dedentTrim`
          calc(
            100vh - ( 2 * ${theme.navbar.height} ) - ( 2 * ${theme.gutters.lg} )
          )`.replace(/\n/g, ""),
        }}
        width={theme.page.width}
        {...theme.pages.quiz.panel}
      >
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
          <AccessCodeBarrier state={accessCodeBarrierState} overflowY="auto">
            <SublayoutViewScores
              instanceId={instanceId!}
              subjectId={subjectId!}
            />
          </AccessCodeBarrier>
        </LoadingOverlay>
      </Div>
    </Div>
  );
}
