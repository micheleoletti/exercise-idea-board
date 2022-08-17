import React, {
  Dispatch,
  PropsWithChildren,
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

interface IdeaProviderProps extends PropsWithChildren<any> {
  initialIdeas?: Idea[];
}
export function IdeaProvider({
  initialIdeas = [],
  children,
}: IdeaProviderProps) {
  const [ideas, setIdeas] = useState<Idea[]>(initialIdeas);

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
