import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Idea } from "../models/idea";

export enum SortFieldOption {
  Title,
  Date,
}

export interface IdeaContextSchema {
  ideas: Idea[];
  setIdeas?: Dispatch<SetStateAction<Idea[]>>;
}

export const IdeaContext = React.createContext<IdeaContextSchema>({
  ideas: [],
});

/** Every time the idea state changes, Idea Provider is re-rendered and the callback methods are recreated
 *  could that be a performance issue? */
export function IdeaProvider({ children }: { children: ReactNode }) {
  const [ideas, setIdeas] = useState<Idea[]>([]);

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
        setIdeas: setIdeas,
      }}
    >
      {children}
    </IdeaContext.Provider>
  );
}
