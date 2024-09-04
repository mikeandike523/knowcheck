import VStack from "@/fwk/components/VStack";
import theme from "@/themes/main";
import Navbar from "@/components/Navbar";

export default function SignIn() {
  return (
    <VStack width="100%" height="100%" background={theme.page.background}>
      <VStack width={theme.page.width} height="100%" justifyContent="center">
        <Navbar pageName="sign-in" />
      </VStack>
    </VStack>
  );
}
