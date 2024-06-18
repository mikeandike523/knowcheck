import theme from "@/themes/main";
import { H1, H2, Div } from "@/fwk/html";

import { useAPIData } from "@/lib/rpc-client";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Index() {
  const listSubjectsTask = useAPIData<null,string[]>("listSubjects",null);
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
            background={theme.card.background}
            padding={theme.gutters.xxl}
          >
            <H1
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
            padding={theme.gutters.xxl}
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
        {JSON.stringify(listSubjectsTask.data??[],null,2)}
        </LoadingOverlay>
      </Div>
    </Div>
  );
}
