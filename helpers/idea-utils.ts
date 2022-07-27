import { SortFieldOption } from "contexts/IdeaContext";
import { Idea } from "models/idea";
import { SortParams } from "models/sort-params";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

export function createIdea(setIdeas: Dispatch<SetStateAction<Idea[]>>) {
  setIdeas((current) => {
    let newIdeas = [...current];

    newIdeas.push({
      uuid: uuidv4(),
      title: "",
      description: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return newIdeas;
  });
}

export function updateIdea(
  setIdeas: Dispatch<SetStateAction<Idea[]>>,
  idea: Idea
) {
  setIdeas((current) => {
    let updatedIdeas = [...current];

    let ideaIndex = updatedIdeas.findIndex((item) => item.uuid == idea.uuid);

    updatedIdeas[ideaIndex] = {
      ...idea,
      updatedAt: new Date().toISOString(),
    };

    return updatedIdeas;
  });
}

export function removeIdea(
  setIdeas: Dispatch<SetStateAction<Idea[]>>,
  idea: Idea
) {
  setIdeas((current) => {
    return current.filter((item) => {
      return item.uuid != idea.uuid;
    });
  });
}

export function sortIdeas(
  setIdeas: Dispatch<SetStateAction<Idea[]>>,
  { field, desc }: SortParams
) {
  setIdeas((current) => {
    let sortedIdeas = [...current];

    if (field == SortFieldOption.Title && !desc) {
      sortedIdeas.sort((a, b) => {
        return sortIdeasByTitleComparisonFn(a, b);
      });
    }

    if (field == SortFieldOption.Title && desc) {
      sortedIdeas.sort((a, b) => {
        return -sortIdeasByTitleComparisonFn(a, b);
      });
    }

    if (field == SortFieldOption.Date && !desc) {
      sortedIdeas.sort((a, b) => {
        return sortIdeasByDateComparisonFn(a, b);
      });
    }

    if (field == SortFieldOption.Date && desc) {
      sortedIdeas.sort((a, b) => {
        return -sortIdeasByDateComparisonFn(a, b);
      });
    }

    return sortedIdeas;
  });
}

export function sortIdeasByTitleComparisonFn(a: Idea, b: Idea) {
  if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
  if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
  return 0;
}

export function sortIdeasByDateComparisonFn(a: Idea, b: Idea) {
  return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf();
}
