import { Box, Heading } from "@chakra-ui/react";

export default function Header() {
  return (
    <>
      <Box bg={"white"} p={"1rem"}>
        <Heading fontWeight={"black"}>Idea Board</Heading>
      </Box>
      <Box h={"8px"} bgGradient="linear(to-r, #108dc7, #ef8e38)"></Box>
    </>
  );
}
