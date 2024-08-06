import { FaHouse } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

import SemanticButton from "@/components/SemanticButton";
import HStack from "@/fwk/components/HStack";
import VStack from "@/fwk/components/VStack";
import { H1, Main } from "@/fwk/html";
import theme from "@/themes/main";
import URLParamsEnsurer from "@/components/URLParamsEnsurer";

function MainContent({
  subjectId,
  instanceId,
}: {
  subjectId: string;
  instanceId: string;
}) {
  return <Main>{/* todo */}</Main>;
}

/**
 * A page to display the user's scores/grades for a given quiiz
 */
export default function Scores() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { subjectId, instanceId } = useParams();

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
      <URLParamsEnsurer requiredParameters={["subjectId", "instanceId"]}>
        {/* 
        Note:
        In technicality, results form useParams can be arrays of strings as well
        We are not manually checking to ensure that the results here are not arrays
        Instead, we rely on careful design of <BrowserRouter> routes to ensure
        proper datatyypes
        
        */}
        <MainContent
          subjectId={subjectId as string}
          instanceId={instanceId as string}
        />
      </URLParamsEnsurer>
    </VStack>
  );
}
