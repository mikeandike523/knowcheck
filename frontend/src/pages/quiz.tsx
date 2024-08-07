import { Fragment } from "react";
import { FaHouse } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

import SemanticButton from "@/components/SemanticButton";
import HStack from "@/fwk/components/HStack";
import VStack from "@/fwk/components/VStack";
import { Div, H1 } from "@/fwk/html";
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
        <Div color="red" background="white" padding={theme.gutters.md} textAlign="center" border="2px solid red">
          {"Cannot have instanceId on register action.\nCheck for problems in the current URL."}
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { subjectId, action, instanceId } = useParams();
  const navigate = useNavigate();
  return (
    <VStack width="100%" height="100%" background={theme.page.background}>
      <HStack
        position="fixed"
        top={0}
        left={0}
        width="100%"
        background={theme.navbar.background}
        gap={theme.gutters.lg}
        height={theme.navbar.height}
      >
        <H1
          marginLeft={theme.gutters.lg}
          position="relative"
          color={theme.colors.brand}
          fontSize="32px"
          margin={0}
          background="white"
          padding="0.25em"
        >
          Know/Check
        </H1>
        <SemanticButton
          width="48px"
          aspectRatio="1.0"
          color="info"
          borderRadius="50%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          onClick={() => {
            navigate("/");
          }}
          type="button"
        >
          <FaHouse
            style={{
              width: "32px",
              height: "32px",
              fontSize: "32px",
            }}
          />
        </SemanticButton>
      </HStack>
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
