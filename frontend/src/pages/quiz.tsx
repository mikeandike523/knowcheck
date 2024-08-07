import { Fragment } from "react";
import { useParams } from "react-router-dom";

import VStack from "@/fwk/components/VStack";
import { Div } from "@/fwk/html";
import theme from "@/themes/main";

import LayoutQuizInvalidAction from "@/layouts/quiz/invalid-action";
import LayoutQuizLive from "@/layouts/quiz/live";
import LayoutQuizRegister from "@/layouts/quiz/register";

function SwitchQuizAction({
  action,
  subjectId,
  instanceId,
}: {
  action: string | undefined;
  subjectId: string;
  instanceId: string | undefined;
}) {
  if (action === "register" && instanceId !== undefined) {
    return (
      <Fragment key="ActionLayout">
        <Div
          color="red"
          background="white"
          padding={theme.gutters.md}
          textAlign="center"
          border="2px solid red"
        >
          {
            "Cannot have instanceId on register action.\nCheck for problems in the current URL."
          }
        </Div>
      </Fragment>
    );
  }
  switch (action) {
    case "register":
      return (
        <Fragment key="ActionLayout">
          <LayoutQuizRegister subjectId={subjectId} />
        </Fragment>
      );
    case "live":
      return (
        <Fragment key="ActionLayout">
          <LayoutQuizLive subjectId={subjectId} instanceId={instanceId} />
        </Fragment>
      );
    default:
      return (
        <Fragment key="ActionLayout">
          <LayoutQuizInvalidAction key="ActionLayout" action={action} />
        </Fragment>
      );
  }
}

export default function Quiz() {
  const { subjectId, action, instanceId } = useParams();
  return (
    <VStack width="100%" height="100%" background={theme.page.background}>
      <VStack width={theme.page.width} height="100%" justifyContent="center">
        <SwitchQuizAction
          action={action}
          subjectId={subjectId!}
          instanceId={instanceId}
        />
      </VStack>
    </VStack>
  );
}
