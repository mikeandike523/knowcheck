import VStack from "@/fwk/components/VStack";
import theme from "@/themes/main";
import { H1, H2 } from "@/fwk/html";

export default function InvalidAction({
  action,
}: {
  action: string | undefined;
}) {
  return (
    <VStack width="100%" padding={theme.gutters.md}>
      <VStack
        gap={theme.gutters.md}
        padding={theme.gutters.md}
        width="100%"
        border="2px solid red"
        background="white"
      >
        {typeof action === "undefined" ? (
          <H1 color="red">Missing Url Action</H1>
        ) : (
          <H1 color="red">Invalid Url Action {`"${action}"`}</H1>
        )}
        <H2>Check for typos in the current url.</H2>
      </VStack>
    </VStack>
  );
}
