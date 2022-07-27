import React, { ReactNode, useEffect, useState } from "react";
import { Idea } from "../models/idea";
import { v4 as uuidv4 } from "uuid";
import { SortParams } from "../models/sort-params";

export enum SortFieldOption {
  Title,
  Date,
}

/** TODO: Refactor sort functions into external helper functions */
function sortIdeasByTitleComparisonFn(a: Idea, b: Idea) {
  if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
  if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
  return 0;
}

function sortIdeasByDateComparisonFn(a: Idea, b: Idea) {
  return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf();
}

export interface IdeaContextSchema {
  ideas: Idea[];
  createIdea?: () => void;
  updateIdea?: (idea: Idea) => void;
  removeIdea?: (idea: Idea) => void;
  sortIdeas?: (params: SortParams) => void;
}

export const IdeaContext = React.createContext<IdeaContextSchema>({
  ideas: [],
});

/** Every time the idea state changes, Idea Provider is re-rendered and the callback methods are recreated
 *  could that be a performance issue? */
export function IdeaProvider({ children }: { children: ReactNode }) {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  /** TODO: Refactor idea logic outside of context for easier testing, otherwise when you provide a mock context, you
   * have to mock these functions as well
   */
  const createIdea = () => {
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
  };
  const updateIdea = (idea: Idea) => {
    setIdeas((current) => {
      let updatedIdeas = [...current];

      let ideaIndex = updatedIdeas.findIndex((item) => item.uuid == idea.uuid);

      updatedIdeas[ideaIndex] = {
        ...idea,
        updatedAt: new Date().toISOString(),
      };

      return updatedIdeas;
    });
  };

  const removeIdea = (idea: Idea) => {
    setIdeas((current) => {
      return current.filter((item) => {
        return item.uuid != idea.uuid;
      });
    });
  };

  const sortIdeas = ({ field, desc }: SortParams) => {
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
  };

  useEffect(() => {
    if (ideas.length > 0) localStorage.setItem("ideas", JSON.stringify(ideas));
  }, [ideas]);

  useEffect(() => {
    if (localStorage.getItem("ideas")) {
      setIdeas(JSON.parse(localStorage.getItem("ideas") ?? ""));
    }
  }, []);

  return (
    <IdeaContext.Provider
      value={{
        ideas: ideas,
        createIdea: createIdea,
        updateIdea: updateIdea,
        removeIdea: removeIdea,
        sortIdeas: sortIdeas,
      }}
    >
      {children}
    </IdeaContext.Provider>
  );
}
