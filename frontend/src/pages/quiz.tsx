import { FaHouse } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";

import SemanticButton from "@/components/SemanticButton";
import HStack from "@/fwk/components/HStack";
import VStack from "@/fwk/components/VStack";
import { H1 } from "@/fwk/html";
import theme from "@/themes/main";

import LayoutQuizInvalidAction from "@/layouts/quiz/invalid-action";
import LayoutQuizRegister from "@/layouts/quiz/register";

function SwitchQuizAction({
  action,
  subjectId,
}: {
  action: string | undefined;
  subjectId: string;
}) {
  switch (action) {
    case "register":
      return (
        <Fragment key="ActionLayout">
          <LayoutQuizRegister subjectId={subjectId}/>
        </Fragment>
      );
    default:
      return (
        <Fragment key="ActionLayout">
          <LayoutQuizInvalidAction action={action} />
        </Fragment>
      );
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
      gap={theme.gutters.lg}
    >
      <HStack
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
      <VStack width={theme.page.width}>
        <SwitchQuizAction key="ActionLayout" action={action} subjectId={subjectId!}/>
      </VStack>
    </VStack>
  );
}
