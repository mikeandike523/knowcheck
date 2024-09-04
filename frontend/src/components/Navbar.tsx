import { FaHouse, FaPencil, FaCheckDouble, FaUserPlus } from "react-icons/fa6";
import SemanticButton from "./SemanticButton";
import HStack from "@/fwk/components/HStack";
import theme from "@/themes/main";
import { Div, DivProps, H1 } from "@/fwk/html";
import { useNavigate } from "react-router-dom";
import VStack from "@/fwk/components/VStack";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

export interface NavbarProps extends DivProps {
  layoutMode?: "overlay" | "push";
  instanceId?: string | undefined;
  subjectId?: string | undefined;
  pageName?: string | undefined;
}

interface NavbarIconButtonProps extends DivProps {
  icon: ReactElement;
  label: string;
  onClick: () => void;
}

export function NavbarIconButton({
  label,
  icon,
  onClick,
  ...rest
}: NavbarIconButtonProps) {
  return (
    <Div
      boxSizing="border-box"
      padding="4px"
      height={theme.navbar.height}
      aspectRatio={1.0}
      {...rest}
    >
      <SemanticButton
        color="primary"
        onClick={onClick}
        type="button"
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        boxSizing="border-box"
        borderRadius="50%"
        position="relative"
      >
        <Div textAlign="center" fontSize="24px">
          {icon}
        </Div>
        <VStack position="absolute" width="100%" left={0} bottom={0}>
          <Div fontSize="16px" whiteSpace="nowrap">
            {label}
          </Div>
        </VStack>
      </SemanticButton>
    </Div>
  );
}

export default function Navbar({
  layoutMode = "overlay",
  instanceId,
  subjectId,
  pageName,
}: NavbarProps) {
  const { action } = useParams();
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

      {subjectId && instanceId ? (
        <>
          <NavbarIconButton
            background={
              action === "live"
                ? theme.navbar.button.highlightBackground
                : "none"
            }
            label="Quiz"
            icon={<FaPencil />}
            onClick={() => {
              navigate(`/quiz/${subjectId}/live/${instanceId}`);
            }}
          />
          <NavbarIconButton
            background={
              action === "scores"
                ? theme.navbar.button.highlightBackground
                : "none"
            }
            label="Scores"
            icon={<FaCheckDouble />}
            onClick={() => {
              navigate(`/quiz/${subjectId}/scores/${instanceId}`);
            }}
          />
        </>
      ) : (
        <>
          <NavbarIconButton
            label="Home"
            icon={<FaHouse />}
            onClick={() => {
              navigate("/");
            }}
          />
          <NavbarIconButton
            background={
              pageName === "sign-in"
                ? theme.navbar.button.highlightBackground
                : "none"
            }
            label="Sign In"
            icon={<FaSignInAlt />}
            onClick={() => {
              navigate("/sign-in");
            }}
          />
          <NavbarIconButton
            background={
              pageName === "sign-up"
                ? theme.navbar.button.highlightBackground
                : "none"
            }
            label="Sign Up"
            icon={<FaUserPlus />}
            onClick={() => {
              navigate("/sign-up");
            }}
          />
        </>
      )}
    </HStack>
  );
}
