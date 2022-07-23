import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useContext } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Header from "../components/Header";
import IdeaCard from "../components/IdeaCard";
import Toolbar from "../components/Toolbar";
import { IdeaContext, IdeaContextSchema } from "../contexts/IdeaContext";
import useAuthGuard from "../hooks/useAuthGuard";

const Home: NextPage = () => {
  const { canAccess } = useAuthGuard({});

  const { ideas, createIdea, updateIdea } =
    useContext<IdeaContextSchema>(IdeaContext);

  if (!canAccess) return <></>;

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
