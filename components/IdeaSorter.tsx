import { Button, Stack, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FaArrowDown, FaSortDown, FaArrowUp } from "react-icons/fa";
import {
  IdeaContext,
  IdeaContextSchema,
  SortFieldOption,
  SortParams,
} from "../contexts/IdeaContext";

export default function IdeaSorter() {
  const { ideas, sortIdeas } = useContext<IdeaContextSchema>(IdeaContext);

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
      bg={"gray.800"}
      px={"16px"}
      color={"gray.100"}
      direction={"row"}
      alignItems={"center"}
    >
      <Text color={"gray.300"}>Sort by:</Text>
      <Button
        opacity={sortParams.field == SortFieldOption.Title ? "1" : "0.7"}
        colorScheme={"white"}
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
        opacity={sortParams.field == SortFieldOption.Date ? "1" : "0.7"}
        colorScheme={"white"}
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
