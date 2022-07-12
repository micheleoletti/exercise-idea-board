import { Box, Button, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { useContext } from "react";
import { IdeaContext } from "../contexts/IdeaContext";
import { Idea } from "../models/idea";
import styles from "../styles/IdeaCard.module.css";

interface IdeaCardProps {
  idea: Idea;
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const { updateIdea, removeIdea } = useContext(IdeaContext);

  return (
    <Stack
      p={"6"}
      spacing={"1rem"}
      bg={"white"}
      borderRadius={"lg"}
      boxShadow={"md"}
    >
      <Input
        placeholder="Title"
        className={styles.input}
        autoFocus
        fontWeight={"bold"}
        fontSize={"xl"}
        value={idea.title}
        onInput={(e) => {
          updateIdea!({ ...idea, title: e.currentTarget.value });
        }}
      ></Input>

      <Textarea
        placeholder="Description"
        className={styles.input}
        value={idea.description}
        onInput={(e: any) => {
          updateIdea!({ ...idea, description: e.currentTarget.value });
        }}
      ></Textarea>

      <Box pt={"2rem"}>
        <Text color={"gray.400"}>Created at: {idea.createdAt}</Text>
        <Text color={"gray.400"}>Updated at: {idea.updatedAt}</Text>
      </Box>

      <Button
        onClick={() => {
          removeIdea!(idea);
        }}
        colorScheme={"red"}
      >
        Delete
      </Button>
    </Stack>
  );
}
