import { FaHouse } from "react-icons/fa6";
import SemanticButton from "./SemanticButton";
import HStack from "@/fwk/components/HStack";
import theme from "@/themes/main";
import { DivProps, H1 } from "@/fwk/html";
import { useNavigate } from "react-router-dom";
import VStack from "@/fwk/components/VStack";

export interface NavbarProps extends DivProps {
  layoutMode?: "overlay" | "push";
  instanceId?: string | undefined;
  subjectId?: string | undefined;
}

export default function Navbar({
  layoutMode = "overlay",
  instanceId,
  subjectId,
}: NavbarProps) {
  const navigate = useNavigate();
  return (
    <HStack
      position={layoutMode === "overlay" ? "fixed" : "relative"}
      top={0}
      left={0}
      width="100%"
      background={theme.navbar.background}
      height={theme.navbar.height}
    >
      <VStack
        position="relative"
        color={theme.colors.brand}
        margin={0}
        background="white"
        alignSelf="stretch"
        justifyContent="center"
        paddingLeft="8px"
        paddingRight="8px"
      >
        <H1 fontSize="28px">Know / Check</H1>
      </VStack>
      <SemanticButton
        color="primary"
        onClick={() => {
          navigate("/");
        }}
        type="button"
        fontSize="16px"
        padding="12px"
        alignSelf="stretch"
      >
        Home
      </SemanticButton>
      {subjectId && instanceId && (
        <HStack
          marginLeft="auto"
          marginRight={theme.gutters.lg}
          gap={theme.gutters.lg}
        >
          <SemanticButton
            color="primary"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            onClick={() => {
              navigate(`/quiz/${subjectId}/live/${instanceId}`);
            }}
            type="button"
            fontSize="16px"
            padding="12px"
            borderRadius="12px"
          >
            Quiz
          </SemanticButton>
          <SemanticButton
            color="primary"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            onClick={() => {
              navigate(`/quiz/${subjectId}/scores/${instanceId}`);
            }}
            type="button"
            fontSize="16px"
            padding="12px"
            borderRadius="12px"
          >
            Scores
          </SemanticButton>
        </HStack>
      )}
    </HStack>
  );
}
