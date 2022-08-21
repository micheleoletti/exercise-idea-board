import { Box, Button, Divider, SlideFade, Stack } from "@chakra-ui/react";
import { createIdea } from "helpers/idea-utils";
import { useContext } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IdeaContext } from "../contexts/IdeaContext";
import IdeaSorter from "./IdeaSorter";

export default function Toolbar() {
  const { ideas, setIdeas } = useContext(IdeaContext);

  return (
    <Stack
      py={"0.3rem"}
      direction={"row"}
      bg={"gray.800"}
      color={"gray.100"}
      alignItems={"center"}
    >
      <Button
        aria-label="toolbar add idea"
        onClick={() => {
          createIdea(setIdeas!);
        }}
        colorScheme={"white"}
        leftIcon={<FaPlusCircle />}
      >
        Add Idea
      </Button>

      <Box w={"1px"} h={"32px"} bg="gray.500"></Box>

      <SlideFade in={ideas.length > 1} offsetX={-10} offsetY={0}>
        <IdeaSorter></IdeaSorter>
      </SlideFade>
    </Stack>
  );
}
