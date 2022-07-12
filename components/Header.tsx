import { Box, Heading } from "@chakra-ui/react";

export default function Header() {
  return (
    <>
      <Box borderBottomWidth={"2px"} borderBottomColor={"gray.200"} p={"1rem"}>
        <Heading fontWeight={"black"}>Idea Board</Heading>
      </Box>
    </>
  );
}
