import {
  Box,
  Button,
  Divider,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { getUpdatedIdea, removeIdea, updateIdea } from "helpers/idea-utils";
import { FormEvent, useCallback, useContext, useMemo, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IdeaContext } from "../contexts/IdeaContext";
import { Idea } from "../models/idea";
import styles from "../styles/IdeaCard.module.css";
import Card from "./Card";
import debounce from "../helpers/generic-utils";

interface IdeaCardProps {
  idea: Idea;
}

export const TEXTAREA_CHAR_LIMIT = 140;
const debounceTimeInMilliseconds = 3000;

export default function IdeaCard({ idea }: IdeaCardProps) {
  const [ideaState, setIdeaState] = useState<Idea>(idea);

  const { setIdeas } = useContext(IdeaContext);

  const [showCharsLeft, setShowCharsLeft] = useState(false);

  const handleIdeaUpdate = (updatedIdea: Idea) => {
    updateIdea!(setIdeas!, updatedIdea);
  };

  /** Why useCallback? https://www.joshwcomeau.com/snippets/javascript/debounce/  */
  const debouncedUpdate = useCallback(
    debounce(handleIdeaUpdate, debounceTimeInMilliseconds),
    []
  );

  function getFormattedDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function updateIdeaField(
    field: string,
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let updatedIdea = getUpdatedIdea({
      ...ideaState,
      [field]: e.currentTarget.value,
    });

    debouncedUpdate(updatedIdea);

    setIdeaState(updatedIdea);
  }

  return (
    <Card>
      <Input
        placeholder="Title"
        className={styles.input}
        autoFocus={ideaState.title.length == 0 ? true : false}
        fontWeight={"bold"}
        fontSize={"2xl"}
        value={ideaState.title}
        onInput={(e) => {
          updateIdeaField("title", e);
        }}
      ></Input>
      <Divider></Divider>
      <Box>
        <Text
          aria-label="char countdown"
          textAlign={"right"}
          opacity={showCharsLeft ? "1" : "0"}
          color={
            TEXTAREA_CHAR_LIMIT - ideaState.description.length == 0
              ? "red.300"
              : "gray.400"
          }
        >
          {TEXTAREA_CHAR_LIMIT - ideaState.description.length}
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
          value={ideaState.description}
          onInput={(e: any) => {
            updateIdeaField("description", e);
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
          <Text aria-label="created at time" color={"gray.400"}>
            Created at: {getFormattedDate(ideaState.createdAt)}
          </Text>
          <Text aria-label="updated at time" color={"gray.400"}>
            Updated at: {getFormattedDate(ideaState.updatedAt)}
          </Text>
        </Box>

        <Button
          aria-label="delete idea"
          onClick={() => {
            removeIdea!(setIdeas!, ideaState);
          }}
          colorScheme={"red"}
        >
          <FaTrash></FaTrash>
        </Button>
      </Stack>
    </Card>
  );
}
