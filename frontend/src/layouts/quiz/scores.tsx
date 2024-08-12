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
import VStack from "@/fwk/components/VStack";

export interface LiveProps {
  subjectId: string;
  instanceId: string | undefined;
}

type InstanceData = {
  quizName: string;
};

function SublayoutViewScores({ instanceId }: { instanceId: string }) {
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
        display: "flex",
        flexDirection: "column",
        gap: theme.gutters.lg,
      }}
    >
      {scores && (
        <VStack
          width="100%"
          boxSizing="border-box"
          position="relative"
          padding={theme.gutters.lg}
        >
          <Div
            width="100%"
            background={theme.pages.quiz.panel.background}
            position="sticky"
            top={`calc( 24px + ${theme.gutters.lg} + ${theme.gutters.md} - 1px )`}
          >
            <Div
              display="flex"
              flexDirection="row"
              alignItems="stretch"
              border="2px solid black"
              borderTop="2px solid black"
              borderBottom="2px solid black"
              gap={theme.gutters.md}
              boxSizing="border-box"
              width="100%"
              background={theme.colors.semantic.primary}
              color={"white"}
            >
              <Div
                borderRight="2px solid black"
                fontSize="24px"
                width="96px"
                textAlign="center"
                lineHeight="2em"
              >
                Score
              </Div>
              <Div
                flex={1}
                maxHeight="96px"
                whiteSpace="pre-wrap"
                fontSize="24px"
                lineHeight="2em"
                textAlign="center"
              >
                Question Text
              </Div>
              <Div
                borderLeft="2px solid black"
                width="5em"
                textAlign="center"
                lineHeight="2em"
                fontSize="24px"
              >
                Details
              </Div>
            </Div>
          </Div>

          {Object.entries(scores).map(([questionId, score],index) => {
            return (
              <Div
                key={questionId}
                display="flex"
                flexDirection="row"
                alignItems="stretch"
                border="2px solid black"
                borderTop={index === 0? "0px solid black" : "1px solid black"}
                borderBottom={index === Object.entries(scores).length - 1? "2px solid black" : "1px solid black"}
                gap={theme.gutters.md}
                boxSizing="border-box"
                width="100%"
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
                <Div fontSize="24px" width="5em" borderLeft="2px solid black">
                  <SemanticButton
                    color="light"
                    fontSize="24px"
                    height="100%"
                    width="100%"
                    lineHeight="2em"
                  >
                    Details
                  </SemanticButton>
                </Div>
              </Div>
            );
          })}
        </VStack>
      )}
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
        overflowY="auto"
        {...theme.pages.quiz.panel}
      >
        <LoadingOverlay
          task={loadInstanceDataTask}
          loadingOverlayProps={{
            borderRadius: theme.pages.quiz.panel.borderRadius,
          }}
          contentProps={{
            position: "relative",
            height: "100%",
          }}
        >
          {loadInstanceDataTask.state === "success" && (
            <H1
              zIndex={1}
              top={0}
              position="sticky"
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
          )}
          <AccessCodeBarrier
            state={accessCodeBarrierState}
            loadingOverlayProps={{
              loadingOverlayProps: {
                borderBottomLeftRadius: theme.pages.quiz.panel.borderRadius,
                borderBottomRightRadius: theme.pages.quiz.panel.borderRadius,
              },
            }}
          >
            <SublayoutViewScores instanceId={instanceId!} />
          </AccessCodeBarrier>
        </LoadingOverlay>
      </Div>
    </Div>
  );
}
