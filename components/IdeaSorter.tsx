import { Button, Stack, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import {
  IdeaContextSchema,
  IdeaContext,
  SortFieldOption,
  SortParams,
} from "../contexts/IdeaContext";

export default function IdeaSorter() {
  const { sortIdeas } = useContext<IdeaContextSchema>(IdeaContext);

  const [sortParams, setSortParams] = useState<SortParams>({
    field: SortFieldOption.Title,
    desc: false,
  });

  function updateSortParams(field: SortFieldOption) {
    let updatedSortParams = {
      field: field,
      desc: !sortParams.desc,
    };

    if (field != sortParams.field) updatedSortParams.desc = false;

    setSortParams(updatedSortParams);
    sortIdeas!(updatedSortParams);
  }

  return (
    <Stack
      px={"1rem"}
      py={"0.5rem"}
      bg={"gray.200"}
      direction={"row"}
      alignItems={"center"}
    >
      <Text>Sort by:</Text>
      <Button
        size={"sm"}
        rightIcon={
          sortParams.field == SortFieldOption.Title ? (
            sortParams.desc ? (
              <FaArrowDown />
            ) : (
              <FaArrowUp />
            )
          ) : undefined
        }
        variant={"ghost"}
        onClick={() => {
          updateSortParams(SortFieldOption.Title);
        }}
      >
        Title
      </Button>
      <Button
        size={"sm"}
        rightIcon={
          sortParams.field == SortFieldOption.Date ? (
            sortParams.desc ? (
              <FaArrowDown />
            ) : (
              <FaArrowUp />
            )
          ) : undefined
        }
        variant={"ghost"}
        onClick={() => {
          updateSortParams(SortFieldOption.Date);
        }}
      >
        Date
      </Button>
    </Stack>
  );
}
