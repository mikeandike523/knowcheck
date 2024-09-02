import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { Div, DivProps, H1, H2, Span } from "@/fwk/html";
import theme from "@/themes/main";

import LoadingOverlay from "@/components/LoadingOverlay";
import { useAPIData } from "@/lib/rpc-client";

import { SubjectListingItem } from "@/common/api-types";
import { NavbarIconButton } from "@/components/Navbar";
import SemanticButton from "@/components/SemanticButton";
import HStack from "@/fwk/components/HStack";
import VStack from "@/fwk/components/VStack";
import DynamicSVG from "svg-designer/lib/react/DynamicSVG";
import SVGBuilder from "svg-designer/lib/SVGBuilder";

interface HoverCardProps extends DivProps {
  onClick?: () => void;
}

function HoverCard({ children, ...rest }: HoverCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  function onMouseMove(event: MouseEvent) {
    const current = ref.current;
    if (current) {
      const bbox = current.getBoundingClientRect();
      const x = event.clientX - bbox.left;
      const y = event.clientY - bbox.top;
      const isHovering = x > 0 && x < bbox.width && y > 0 && y < bbox.height;
      setIsHovering(isHovering);
    }
  }
  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  });
  const baseSizeCss = isHovering
    ? css`
        width: 64px;
        height: 64px;
      `
    : css`
        width: 32px;
        height: 32px;
      `;
  return (
    <>
      <Div
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        display="grid"
        gridTemplateColumns="1fr auto"
        gridTemplateRows="1fr auto"
        ref={ref}
        {...rest}
      >
        <Div background={theme.card.background}></Div>
        <Div background={theme.card.background}></Div>
        <Div background={theme.card.background}></Div>
        <Div></Div>
      </Div>
      {children}
      <Div height="64px"></Div>
      <Div
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        display="grid"
        gridTemplateColumns="1fr auto"
        gridTemplateRows="1fr auto"
        ref={ref}
        {...rest}
      >
        <Div></Div>
        <Div></Div>
        <Div></Div>
        <Div
          width="64px"
          height="64px"
          background={theme.page.background}
          position="relative"
        >
          <Div position="absolute" right={0} bottom={0}>
            <SemanticButton
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
              width="64px"
              aspectRatio={1}
              fontSize="24px"
              color="primary"
            >
              <Span>Go!</Span>
            </SemanticButton>
          </Div>

          <Div
            width="64px"
            height="64px"
            position="absolute"
            bottom="0"
            right="0"
            display="grid"
            gridTemplateRows="1fr auto"
            gridTemplateColumns="1fr auto"
            pointerEvents="none"
          >
            <Div background={theme.card.background}></Div>
            <Div background={theme.card.background}></Div>
            <Div background={theme.card.background}></Div>
            <DynamicSVG
              viewBox={{
                x: 0,
                y: 0,
                width: 32,
                height: 32,
              }}
              css={css`
                ${baseSizeCss};
                pointer-events: none;
                transition: all 0.25s ease;
                filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.75));
              `}
              cssVars={{
                "--fgcolor": theme.card.background,
                "--bgcolor": "transparent",
              }}
              text={new SVGBuilder(32, 32)
                .artist("none", 0, "var(--bgcolor)")
                .rectangle(0, 0, 32, 32)
                .commit()
                .artist("none", 0, "var(--fgcolor)")
                .lineSequence(
                  [
                    [0, 32],
                    [0, 0],
                    [32, 0],
                  ],
                  false
                )
                .commit()
                .compile(true)}
            />
          </Div>
        </Div>
      </Div>
    </>
  );
}

export default function Index() {
  const navigate = useNavigate();
  const { task, fetchData } = useAPIData<null, SubjectListingItem[]>(
    "listSubjects",
    null
  );
  const subjects = task.data ?? [];

  const gridCutoffEntries = Object.entries(theme.gridCutoffs);

  return (
    <Div
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      background={theme.page.background}
      paddingBottom={theme.gutters.xl}
      paddingTop={theme.gutters.xl}
      gap={theme.gutters.lg}
      boxSizing="border-box"
    >
      <Div
        background="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="8px"
        padding="8px"
      >
        <H1 color={theme.colors.brand} fontSize="72px" margin={0}>
          Know/Check
        </H1>
        <H2 fontSize="18px" color="black" margin={0} padding={0}>
          Know Your Stuff. Check Your Mastery.
        </H2>
      </Div>

      <Div width="100%" height={theme.gutters.lg}></Div>

      <Div
        width={theme.page.width}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        <H1 color={"white"} fontWeight="bold" margin={0} padding={0}>
          Featured Quizzes
        </H1>
        <LoadingOverlay
          task={task}
          onDismiss={fetchData}
          contentProps={{
            display: "grid",
            height: "auto",
            flexGrow: 1,
            minHeight: 0,
            overflow: "auto",
            css: css`
              grid-auto-flow: column;
              align-items: stretch;
              ${gridCutoffEntries
                .map(
                  ([key, value]) => `
            @media (min-width: ${key}px) {
              grid-template-columns: repeat(${value}, min(1fr,calc(100%/${value})));
            }
            `
                )
                .join("\n")}
            `,
          }}
        >
          {subjects.map((subject, i) => (
            <Div
              position="relative"
              key={i}
              width="auto"
              margin={theme.pages.index.subjectListItem.margin}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={theme.gutters.md}
            >
              <HoverCard
                onClick={() => {
                  navigate(`/quiz/${subject.id}/register`);
                }}
              >
                <Div
                  width="100%"
                  boxSizing="border-box"
                  display="flex"
                  flexDirection="column"
                  gap={theme.gutters.md}
                >
                  <H1
                    boxSizing="border-box"
                    width="100%"
                    background={theme.card.background}
                    position="relative"
                    margin={0}
                    color={"black"}
                    textAlign="left"
                    alignSelf="flex-start"
                    fontSize={theme.pages.index.subjectListItem.name.fontSize}
                    padding={theme.gutters.md}
                    css={css`
                      &:before {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        background: rgba(0, 0, 0, 0.25);
                      }
                    `}
                  >
                    {subject.name}
                  </H1>
                  <H2
                    padding={theme.gutters.md}
                    fontWeight="normal"
                    alignSelf="flex-start"
                    position="relative"
                    width="100%"
                    color="black"
                    margin={0}
                    textAlign="left"
                    fontSize={theme.pages.index.subjectListItem.blurb.fontSize}
                  >
                    {subject.blurb}
                  </H2>
                </Div>
              </HoverCard>
            </Div>
          ))}
        </LoadingOverlay>
      </Div>

      <Div width="100%" height={theme.gutters.lg}></Div>

      <VStack width="100%" gap={theme.gutters.md}>
        <Div fontSize="24px" color="black">
          Want to make your own quizzes?
        </Div>
        <HStack width="100%" gap={theme.gutters.xl} justifyContent="center">
          <HStack flex={1} justifyContent="flex-end">
            <NavbarIconButton
              icon={<FaSignInAlt />}
              label="Sign In"
              onClick={() => {
                navigate("/sign-in");
              }}
            />
          </HStack>
          <Div whiteSpace="nowrap" fontSize="24px" color="black">
            or
          </Div>
          <HStack flex={1} justifyContent="flex-start">
            <NavbarIconButton
              icon={<FaUserPlus />}
              label="Sign Up"
              onClick={() => {
                navigate("/sign-up");
              }}
            />
          </HStack>
        </HStack>
      </VStack>
    </Div>
  );
}
