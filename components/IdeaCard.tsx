import {
  Box,
  Button,
  Divider,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { IdeaContext } from "../contexts/IdeaContext";
import { Idea } from "../models/idea";
import styles from "../styles/IdeaCard.module.css";
import { FaTrash } from "react-icons/fa";

interface IdeaCardProps {
  idea: Idea;
}

const TEXTAREA_CHAR_LIMIT = 140;

export default function IdeaCard({ idea }: IdeaCardProps) {
  const { updateIdea, removeIdea } = useContext(IdeaContext);

  const [showCharsLeft, setShowCharsLeft] = useState(false);

  function getFormattedDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <Stack
      p={"6"}
      spacing={"0.5rem"}
      bg={"white"}
      borderRadius={"lg"}
      boxShadow={"md"}
      minW={["100%", "25em"]}
    >
      <Input
        placeholder="Title"
        className={styles.input}
        autoFocus={idea.title.length == 0 ? true : false}
        fontWeight={"bold"}
        fontSize={"2xl"}
        value={idea.title}
        onInput={(e) => {
          updateIdea!({ ...idea, title: e.currentTarget.value });
        }}
      ></Input>
      <Divider></Divider>
      <Box>
        <Text
          textAlign={"right"}
          opacity={showCharsLeft ? "1" : "0"}
          color={
            TEXTAREA_CHAR_LIMIT - idea.description.length == 0
              ? "red.300"
              : "gray.400"
          }
        >
          {TEXTAREA_CHAR_LIMIT - idea.description.length}
        </Text>
        <Textarea
          placeholder="Description"
          onFocus={() => {
            setShowCharsLeft(true);
          }}
          onBlur={() => {
            setShowCharsLeft(false);
          }}
          className={styles.input}
          value={idea.description}
          onInput={(e: any) => {
            updateIdea!({ ...idea, description: e.currentTarget.value });
          }}
          maxLength={TEXTAREA_CHAR_LIMIT}
          rows={5}
          resize={showCharsLeft ? "vertical" : "none"}
        ></Textarea>
      </Box>

      <Divider></Divider>

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box fontSize={"sm"}>
          <Text color={"gray.400"}>
            Created at: {getFormattedDate(idea.createdAt)}
          </Text>
          <Text color={"gray.400"}>
            Updated at: {getFormattedDate(idea.updatedAt)}
          </Text>
        </Box>

        <Button
          onClick={() => {
            removeIdea!(idea);
          }}
          colorScheme={"red"}
        >
          <FaTrash></FaTrash>
        </Button>
      </Stack>
    </Stack>
  );
}
