import { css } from "@emotion/react";
import { useEffect, useRef, useState, ReactNode } from "react";
import {useNavigate} from 'react-router-dom'

import { Div, DivProps, H1, H2 } from "@/fwk/html";
import theme from "@/themes/main";

import LoadingOverlay from "@/components/LoadingOverlay";
import { useAPIData } from "@/lib/rpc-client";

import { SubjectListingItem } from "@/common/api-types";
import DynamicSVG from "svg-designer/lib/react/DynamicSVG";
import SVGBuilder from "svg-designer/lib/SVGBuilder";
import SemanticButton from "@/components/SemanticButton";

interface HoverCardProps extends DivProps {
  revealElement?: ReactNode | ReactNode[];
}

function HoverCard({ children, revealElement, ...rest }: HoverCardProps) {
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
        width: 24px;
        height: 24px;
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
            {revealElement}
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

              css={css`
                ${baseSizeCss};
              `}
              style={{
                pointerEvents: "none",
                transition: "all 0.25s ease",
                filter: "drop-shadow(0px 0px 4px rgba(0,0,0,0.75))",
              }}
              cssVars={{
                "--fgcolor": theme.card.background,
                "--bgcolor": "transparent",
              }}
              text={new SVGBuilder(24, 24)
                .artist("none", 0, "var(--bgcolor)")
                .rectangle(0, 0, 24, 24)
                .commit()
                .artist("none", 0, "var(--fgcolor)")
                .lineSequence(
                  [
                    [0, 24],
                    [0, 0],
                    [24, 0],
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
  const { task, fetchData } = useAPIData<null, SubjectListing[]>("listSubjects", null);
  const subjects = task.data ?? [];

  console.log(subjects);

  const gridCutoffEntries = Object.entries(theme.gridCutoffs);

  return (
    <Div
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      background={theme.page.background}
    >
      <Div
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        marginTop={theme.gutters.xl}
      >
        <Div
          display="grid"
          gridTemplateColumns="1fr 1fr"
          gridTemplateRows="1fr"
          width={theme.page.width}
          background={theme.navbar.background}
        >
          <Div
            display="flex"
            flexDirection="column"
            gap={theme.gutters.md}
            alignItems="center"
            justifyContent="flex-start"
            position="relative"
          >
            <H1
              position="relative"
              color={theme.navbar.text.primary}
              fontSize={theme.fontSize.jumbotron}
              margin={0}
              padding={0}
            >
              Know/Check
            </H1>
          </Div>
          <Div
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <H2 color={"white"} textAlign="center" margin={0} padding={0}>
              Know your stuff.
            </H2>
            <H2 color={"white"} textAlign="center" margin={0} padding={0}>
              Check your mastery.
            </H2>
          </Div>
        </Div>
      </Div>
      <Div
        flex={1}
        width={theme.page.width}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        marginTop={theme.gutters.xl}
        marginBottom={theme.gutters.xl}
      >
        <LoadingOverlay
          task={task}
          onDismiss={fetchData}
          contentProps={{
            display: "grid",
            height: "auto",

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
              <HoverCard revealElement={<SemanticButton background="green" onClick={()=>{
                navigate(`/subjects/${subject.id}`)
              }}>Go!</SemanticButton>}>
                <H1
                  position="relative"
                  width="100%"
                  margin={0}
                  color={theme.colors.brand}
                  textAlign="center"
                  fontSize={theme.pages.index.subjectListItem.name.fontSize}
                >
                  {subject.name}
                </H1>
                <H2
                  position="relative"
                  width="100%"
                  color="black"
                  margin={0}
                  textAlign="center"
                  fontSize={theme.pages.index.subjectListItem.blurb.fontSize}
                >
                  {subject.blurb}
                </H2>
              </HoverCard>
            </Div>
          ))}
        </LoadingOverlay>
      </Div>
    </Div>
  );
}
