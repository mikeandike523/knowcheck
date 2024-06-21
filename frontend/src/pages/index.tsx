import { css } from "@emotion/react";

import theme from "@/themes/main";
import { H1, H2, Div, Button } from "@/fwk/html";

import { useAPIData } from "@/lib/rpc-client";
import LoadingOverlay from "@/components/LoadingOverlay";

import DynamicSVG from "svg-designer/lib/react/DynamicSVG";
import SVGBuilder from "svg-designer/lib/SVGBuilder";
import { Subject } from "@/common/api-types";

export default function Index() {
  const { task, fetchData } = useAPIData<null, Subject[]>("listSubjects", null);
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
            <Div
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              display="grid"
              gridTemplateRows="1fr auto"
              gridTemplateColumns="1fr auto"
              filter="drop-shadow(0px 0px 8px rgba(0,0,0,0.75))"
            >
              <Div background={theme.card.background}></Div>
              <Div background={theme.card.background}></Div>
              <Div background={theme.card.background}></Div>
              <Div width="16px" height="16px">
                <DynamicSVG
                  style={{
                    filter: "drop-shadow(0px 0px 4px rgba(0,0,0,0.75))",
                    transform:"scale(0.5)",
                    transformOrigin: "top left",
                  }}
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

            <H1
              position="relative"
              color={theme.colors.brand}
              fontSize={theme.fontSize.jumbotron}
              margin={0}
              padding={0}
            >
              Know/Check{"\u{2122}"}
            </H1>
          </Div>
          <Div
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <H2
              color={theme.navbar.text.primary}
              textAlign="center"
              margin={0}
              padding={0}
            >
              The World's #1 AI-Powered Quiz App
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
        <H1
          margin={0}
          padding={theme.gutters.md}
          width="100%"
          textAlign="center"
          background={theme.navbar.background}
          color={theme.navbar.text.primary}
        >
          Subjects
        </H1>
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
              key={i}
              width="auto"
              margin={theme.pages.index.subjectListItem.margin}
              display="flex"
              flexDirection="column"
              alignItems="center"
              background={theme.card.background}
              padding={theme.gutters.md}
              gap={theme.gutters.md}
            >
              <H1
                width="100%"
                margin={0}
                padding={0}
                color={theme.colors.brand}
                textAlign="center"
                fontSize={theme.pages.index.subjectListItem.name.fontSize}
              >
                {subject.name}
              </H1>
              <H2
                margin={0}
                padding={0}
                textAlign="center"
                fontSize={theme.pages.index.subjectListItem.blurb.fontSize}
              >
                {subject.blurb}
              </H2>
              <Div
                flex={1}
                width="100%"
                display="flex"
                flexDirection="row"
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <Button>Go!</Button>
              </Div>
            </Div>
          ))}
        </LoadingOverlay>
      </Div>
    </Div>
  );
}
