import { Stack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import Header from "../components/Header";
import IdeaCard from "../components/IdeaCard";
import IdeaSorter from "../components/IdeaSorter";
import {
  IdeaContext,
  IdeaContextSchema,
  SortFieldOption,
} from "../contexts/IdeaContext";
import { Idea } from "../models/idea";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { ideas, createIdea, updateIdea } =
    useContext<IdeaContextSchema>(IdeaContext);

  return (
    <>
      <Header></Header>

      <IdeaSorter></IdeaSorter>

      <Stack bg={"gray.100"} p={"6"} spacing={"2rem"}>
        {ideas.map((idea) => {
          return <IdeaCard key={idea.uuid} idea={idea} />;
        })}
      </Stack>

      <button onClick={createIdea}>add idea</button>
    </>
  );
};

export default Home;
