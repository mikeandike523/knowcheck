import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

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
import {
  TArgs as TArgsGetDetailedScore,
  TReturn as TReturnGetDetailedScore,
} from "@/common/api-types/handlers/getDetailedScore";

export interface LiveProps {
  subjectId: string;
  instanceId: string | undefined;
}

type InstanceData = {
  quizName: string;
};

function DetailsView({
  instanceId,
  responseId,
  display,
}: {
  instanceId: string;
  responseId: string;
  display: "block" | "none";
}) {
  const { task: responseDetailsTask, fetchData: responseDetailsFetchData } =
    useAPIData<TArgsGetDetailedScore, TReturnGetDetailedScore>(
      "getDetailedScore",
      {
        responseId,
        instanceId,
      }
    );
  return (
    <LoadingOverlay
      task={responseDetailsTask}
      width="100%"
      height="auto"
      contentProps={{
        width: "100%",
        height: "auto",
        display: display,
      }}
      onDismiss={() => {
        responseDetailsTask.setIdle();
        responseDetailsFetchData();
      }}
    >
      <Div
        width="100%"
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
        gridTemplateRows="auto 1fr"
        borderTop="2px solid black"
      >
        <Div padding="0.5em" fontSize="24px" textAlign="center">
          Your Answer
        </Div>
        <Div padding="0.5em" fontSize="24px" textAlign="center">
          Explanation
        </Div>
        <Div padding="0.5em" fontSize="24px" textAlign="center">
          Supporting Evidence
        </Div>
        <Div padding="0.5em" whiteSpace="pre-wrap">
          {responseDetailsTask.data?.answer}
        </Div>
        <Div padding="0.5em" whiteSpace="pre-wrap">
          {responseDetailsTask.data?.gptExplanation}
        </Div>
        <Div padding="0.5em">
          <ul>
            {responseDetailsTask.data?.supportingInfo?.map(
              (evidence, index) => (
                <li
                  key={index}
                  style={{
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {evidence}
                </li>
              )
            )}
          </ul>
        </Div>
      </Div>
    </LoadingOverlay>
  );
}

function ScoreRow({
  gptScore,
  questionText,
  responseId,
  index,
  numScores,
  instanceId,
  scrollableDivRef,
  tableHeaderRef,
  setLastSelectedId,
}: {
  gptScore: number;
  questionText: string;
  responseId: string;
  index: number;
  numScores: number;
  instanceId: string;
  scrollableDivRef: RefObject<HTMLDivElement | null>;
  tableHeaderRef: RefObject<HTMLDivElement | null>;
  setLastSelectedId: Dispatch<SetStateAction<string>>;
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Div
      id={`${responseId}-container`}
      key={responseId}
      border="2px solid black"
      borderTop={index === 0 ? "0px solid black" : "1px solid black"}
      borderBottom={
        index === numScores - 1 ? "2px solid black" : "1px solid black"
      }
      boxSizing="border-box"
      width="100%"
      display="flex"
      flexDirection="column"
    >
      <Div display="flex" flexDirection="row" alignItems="stretch" width="100%">
        <Div
          borderRight="2px solid black"
          fontSize="48px"
          width="96px"
          aspectRatio={1}
          textAlign="center"
          lineHeight="2em"
        >
          {gptScore}
        </Div>
        <Div
          flex={1}
          maxHeight="96px"
          padding={theme.gutters.md}
          overflowY="auto"
          whiteSpace="pre-wrap"
          fontSize="18px"
        >
          {questionText}
        </Div>
        <Div fontSize="24px" width="5em" borderLeft="2px solid black">
          <SemanticButton
            color="light"
            fontSize="24px"
            height="100%"
            width="100%"
            lineHeight="2em"
            onClick={() => {
              if (!showDetails) {
                setLastSelectedId(responseId);
              }
              setShowDetails(!showDetails);
            }}
          >
            {showDetails ? "Hide" : "Show"}
          </SemanticButton>
        </Div>
      </Div>
      <DetailsView
        display={showDetails ? "block" : "none"}
        key={`${responseId}-details`}
        responseId={responseId}
        instanceId={instanceId}
      />
    </Div>
  );
}

function SublayoutViewScores({
  instanceId,
  scrollableDivRef,
  titleElement,
}: {
  instanceId: string;
  scrollableDivRef: RefObject<HTMLDivElement | null>;
  titleElement: ReactNode;
}) {
  const [lastSelectedId, setLastSelectedId] = useState("");
  const tableHeaderRef = useRef<HTMLDivElement | null>(null);
  const loadScoresTask = useAPIData<TArgsGetScores, TReturnGetScores>(
    "getScores",
    {
      instanceId,
    },
    []
  ).task;
  const scores = loadScoresTask.data;
  useEffect(() => {
    if (scrollableDivRef.current) {
      if (tableHeaderRef.current) {
        if (lastSelectedId) {
          const element = document.getElementById(
            `${lastSelectedId}-container`
          );
          if (element) {
            const targetTop = Math.max(element.offsetTop-tableHeaderRef.current.getBoundingClientRect().height,0);

            scrollableDivRef.current.scrollTo({
              top: targetTop,
              behavior: "smooth",
            });
          }
        }
      }
    }
  }, [lastSelectedId]);
  return (
    <LoadingOverlay
      task={loadScoresTask}
      contentProps={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: theme.gutters.lg,
        height: "auto",
      }}
    >
      {scores && Object.keys(scores).length === 0 && (
        <Div
          width="100%"
          textAlign="center"
          fontSize="24px"
          fontStyle="italic"
          padding={theme.gutters.lg}
        >
          No scores yet.
          <br />
          Press the "Quiz" button in the navbar to start answering questions.
        </Div>
      )}
      {scores && Object.keys(scores).length > 0 && (
        <VStack width="100%" boxSizing="border-box" position="relative">
          <Div
            baseRef={tableHeaderRef}
            width="100%"
            background={theme.pages.quiz.panel.background}
            position="sticky"
            top={0}
            zIndex={1}
          >
            {titleElement}
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

          {Object.entries(scores).map(([responseId, score], index) => {
            return (
              <ScoreRow
                setLastSelectedId={setLastSelectedId}
                tableHeaderRef={tableHeaderRef}
                scrollableDivRef={scrollableDivRef}
                instanceId={instanceId}
                key={responseId}
                gptScore={score.gptScore}
                questionText={score.questionText}
                responseId={responseId}
                index={index}
                numScores={Object.keys(scores).length}
              />
            );
          })}
        </VStack>
      )}
    </LoadingOverlay>
  );
}

export default function Scores({ subjectId, instanceId }: LiveProps) {
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);
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
  const titleElement =
    loadInstanceDataTask.state === "success" ? (
      <H1
        zIndex={1}
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
    ) : (
      <></>
    );
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
        width={accessCodeBarrierState.authenticated ? theme.page.width : "auto"}
        baseRef={scrollableDivRef}
        overflowY="auto"
        position="relative"
        {...theme.pages.quiz.panel}
      >
        <LoadingOverlay
          task={loadInstanceDataTask}
          loadingOverlayProps={{
            borderRadius: theme.pages.quiz.panel.borderRadius,
          }}
          contentProps={{
            position: "relative",
            height: "auto",
          }}
        >
          <AccessCodeBarrier
            state={accessCodeBarrierState}
            loadingOverlayProps={{
              loadingOverlayProps: {
                borderBottomLeftRadius: theme.pages.quiz.panel.borderRadius,
                borderBottomRightRadius: theme.pages.quiz.panel.borderRadius,
              },
            }}
          >
            <SublayoutViewScores
              titleElement={titleElement}
              instanceId={instanceId!}
              scrollableDivRef={scrollableDivRef}
            />
          </AccessCodeBarrier>
        </LoadingOverlay>
      </Div>
    </Div>
  );
}
