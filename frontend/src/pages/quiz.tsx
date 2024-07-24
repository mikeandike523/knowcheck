import { FaHouse } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";

import SemanticButton from "@/components/SemanticButton";
import HStack from "@/fwk/components/HStack";
import VStack from "@/fwk/components/VStack";
import { H1 } from "@/fwk/html";
import theme from "@/themes/main";

import LayoutQuizInvalidAction from "@/layouts/quiz/invalid-action";
import LayoutQuizRegister from "@/layouts/quiz/register";
import LayoutQuizLive from "@/layouts/quiz/live";

function SwitchQuizAction({
  action,
  subjectId,
  instanceId,
}: {
  action: string | undefined;
  subjectId: string;
  instanceId: string | undefined;
}) {
  switch (action) {
    case "register":
      return <LayoutQuizRegister key="ActionLayout" subjectId={subjectId} />;
    case "live":
      return (
        <LayoutQuizLive
          key="ActionLayout"
          subjectId={subjectId}
          instanceId={instanceId}
        />
      );
    default:
      return <LayoutQuizInvalidAction key="ActionLayout" action={action} />;
  }
}

export default function Quiz() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { subjectId, action, instanceId } = useParams();
  const navigate = useNavigate();
  return (
    <VStack
      width="100%"
      height="100%"
      background={theme.page.background}
    >
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
