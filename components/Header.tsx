import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { signOut } = useAuth();
  const router = useRouter();

  function logOutAndRedirect() {
    signOut!();
    router.push("/auth/sign-in");
  }

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        bg={"white"}
        p={"1rem"}
      >
        <Heading fontWeight={"black"}>Idea Board</Heading>
        <Button aria-label="logout" onClick={logOutAndRedirect}>
          Log out
        </Button>
      </Stack>
      <Box h={"8px"} bgGradient="linear(to-r, #108dc7, #ef8e38)"></Box>
    </>
  );
}
