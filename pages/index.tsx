import { FaPlusCircle } from "react-icons/fa";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useContext } from "react";
import Header from "../components/Header";
import IdeaCard from "../components/IdeaCard";
import IdeaSorter from "../components/IdeaSorter";
import { IdeaContext, IdeaContextSchema } from "../contexts/IdeaContext";
import Toolbar from "../components/Toolbar";

const Home: NextPage = () => {
  const { ideas, createIdea, updateIdea } =
    useContext<IdeaContextSchema>(IdeaContext);

  return (
    <>
      <Box minH={"100vh"} bg={"gray.100"}>
        <Header></Header>

        <Toolbar></Toolbar>

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
            onClick={createIdea}
            bg={"gray.200"}
            minH={"300px"}
          >
            <FaPlusCircle fontSize={"32px"} />
            <Text ml={"0.5rem"} fontSize={"3xl"} fontWeight={"bold"}>
              Add Idea
            </Text>
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default Home;
