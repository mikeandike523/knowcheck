import theme from "@/themes/main";
import { H1, H2, Div } from "@/fwk/html";

import { useAPIData } from "@/lib/rpc-client";
import LoadingOverlay from "@/components/LoadingOverlay";

import DynamicSVG from "svg-designer/lib/react/DynamicSVG";
import SVGBuilder from "svg-designer/lib/SVGBuilder";

export default function Index() {
  const listSubjectsTask = useAPIData<null, string[]>("listSubjects", null);
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
              <Div
                width="32px"
                height="32px"
              >
                <DynamicSVG
                style={{
                  filter: "drop-shadow(0px 0px 4px rgba(0,0,0,0.75))"
                }}
                  cssVars={{
                    "--fgcolor": theme.card.background,
                    "--bgcolor": "transparent"
                  }}
                  text={new SVGBuilder(32, 32)
                    .artist("none",0, "var(--bgcolor)")
                    .rectangle(0,0,32,32)
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
        background={theme.card.background}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        gap={theme.gutters.lg}
        marginTop={theme.gutters.xl}
        marginBottom={theme.gutters.xl}
      >
        <H1
          margin={0}
          padding={0}
          width="100%"
          textAlign="center"
          background={theme.navbar.background}
          color={theme.navbar.text.primary}
        >
          Categories
        </H1>
        <LoadingOverlay task={listSubjectsTask}>
          {JSON.stringify(listSubjectsTask.data ?? [], null, 2)}
        </LoadingOverlay>
      </Div>
    </Div>
  );
}
