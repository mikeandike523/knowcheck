import AccessCodeBarrier from "@/components/AccessCodeBarrier";
import LoadingOverlay from "@/components/LoadingOverlay";
import { H1 } from "@/fwk/html";
import useAccessCodeBarrierState from "@/hooks/useAccessCodeBarrierState";
import { useAPIData } from "@/lib/rpc-client";
import theme from "@/themes/main";

export default function SublayoutPrint({
  subjectId,
  instanceId,
}: {
  subjectId: string;
  instanceId: string;
}) {
  const loadInstanceDataTask = useAPIData<
    {
      subjectId: string;
      instanceId: string;
    },
    {
      quizName: string;
    }
  >(
    "getQuizInstanceData",
    {
      subjectId,
      instanceId: instanceId ?? "",
    },
    []
  ).task
  const accessCodeBarrierState = useAccessCodeBarrierState({
    subjectId,
    instanceId
  })
  return (
    <>
      <LoadingOverlay task={loadInstanceDataTask}>
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
        <AccessCodeBarrier  state={accessCodeBarrierState} overflowY="auto">
          This is placeholder user interface for /scores/[Subject Id]/print/[Instance Id]<br/>
          Subject Id: {subjectId}, Instance Id: {instanceId}
        </AccessCodeBarrier>
      </LoadingOverlay>
    </>
  );
}
