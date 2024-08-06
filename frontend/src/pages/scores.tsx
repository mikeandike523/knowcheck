import { FaHouse } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

import SemanticButton from "@/components/SemanticButton";
import URLParamsEnsurer from "@/components/URLParamsEnsurer";
import HStack from "@/fwk/components/HStack";
import VStack from "@/fwk/components/VStack";
import { Div, H1 } from "@/fwk/html";
import theme from "@/themes/main";
import dedentTrim from "@/utils/dedentTrim";
import { Fragment } from "react";
import SublayoutView from "@/layouts/scores/view"
import SublayoutPrint from "@/layouts/scores/print"

const actions = ["view", "print"] as const;
type Action = (typeof actions)[number];



function MainContent({
  subjectId,
  instanceId,
  action,
}: {
  subjectId: string;
  instanceId: string;
  action: string;
}) {
  if (!actions.includes(action as Action)) {
    return (
      <Fragment key="Sublayout">
        <Div
          color="red"
          background="white"
          margin={theme.gutters.lg}
          padding={theme.gutters.lg}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={theme.gutters.md}
          width="100%"
          border="2px solid red"
        >
          <h1>Invalid Action: {action}</h1>
          <h2>Check for problems with the current URL.</h2>
        </Div>
      </Fragment>
    );
  }
  switch (action as Action) {
    case "view":
      return (
        <Div key="Sublayout" {...theme.pages.quiz.panel}>
          <SublayoutView subjectId={subjectId} instanceId={instanceId} />
        </Div>
      );
    case "print":
      return (
        <Div key="Sublayout" {...theme.pages.quiz.panel}>
          <SublayoutPrint subjectId={subjectId} instanceId={instanceId} />
        </Div>
      );
  }
}

/**
 * A page to display the user's scores/grades for a given quiiz
 */
export default function Scores() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { subjectId, instanceId, action } = useParams();

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

      <Div
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
          style={{
            maxHeight: dedentTrim`
          calc(
            100vh - ( 2 * ${theme.navbar.height} ) - ( 2* ${theme.gutters.lg} )
          )`.replace(/\n/g, ""),
          }}
        >
          <URLParamsEnsurer requiredParameters={["subjectId", "instanceId"]}>
            <MainContent
              subjectId={subjectId as string}
              instanceId={instanceId as string}
              action={action as string}
            />
          </URLParamsEnsurer>
        </Div>
      </Div>
    </VStack>
  );
}
