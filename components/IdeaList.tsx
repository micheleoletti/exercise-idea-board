import { Flex, Button, Text } from "@chakra-ui/react";
import { IdeaContextSchema, IdeaContext } from "contexts/IdeaContext";
import { createIdea } from "helpers/idea-utils";
import { Idea } from "models/idea";
import { useContext } from "react";
import { FaPlusCircle } from "react-icons/fa";
import IdeaCard from "./IdeaCard";

export interface IdeaListProps {
  ideas: Idea[];
}

export default function IdeaList() {
  const { ideas, setIdeas } = useContext<IdeaContextSchema>(IdeaContext);

  return (
    <>
      <Flex
        bg={"gray.100"}
        // p={"6"}
        // spacing={"2rem"}
        direction={["column", "row"]}
        columnGap={"2rem"}
        rowGap={"3rem"}
        padding={"1rem"}
        justifyContent={"center"}
        alignItems={"center"}
        wrap={"wrap"}
      >
        {ideas.map((idea) => {
          return <IdeaCard key={idea.uuid} idea={idea} />;
        })}

        <Button
          justifyContent={"center"}
          borderRadius={"lg"}
          minW={["100%", "25em"]}
          alignItems={"center"}
          onClick={() => {
            createIdea(setIdeas!);
          }}
          bg={"gray.200"}
          minH={"300px"}
        >
          <FaPlusCircle fontSize={"32px"} />
          <Text ml={"0.5rem"} fontSize={"3xl"} fontWeight={"bold"}>
            Add Idea
          </Text>
        </Button>
      </Flex>
    </>
  );
}
