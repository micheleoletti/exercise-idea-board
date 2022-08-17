import IdeaList from "@/components/IdeaList";
import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { useContext } from "react";
import Header from "../components/Header";
import Toolbar from "../components/Toolbar";
import { IdeaContext, IdeaContextSchema } from "../contexts/IdeaContext";
import useAuthGuard from "../hooks/useAuthGuard";

const Home: NextPage = () => {
  const { canAccess } = useAuthGuard({});

  if (!canAccess) return <></>;

  return (
    <>
      <Box minH={"100vh"} bg={"gray.100"}>
        <Header></Header>

        <Toolbar></Toolbar>

        <IdeaList></IdeaList>
      </Box>
    </>
  );
};

export default Home;
