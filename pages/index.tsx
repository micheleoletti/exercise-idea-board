import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import {
  IdeaContext,
  IdeaContextSchema,
  SortFieldOption,
} from "../contexts/IdeaContext";
import { Idea } from "../models/idea";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { ideas, createIdea, updateIdea, removeIdea, sortIdeas } =
    useContext<IdeaContextSchema>(IdeaContext);

  function updateIdeaField(idea: Idea, field: string, value: any) {
    updateIdea!({ ...idea, [field]: value });
  }

  return (
    <>
      <button
        onClick={() => {
          sortIdeas!({ field: SortFieldOption.Title, desc: false });
        }}
      >
        Sort ideas TITLE ASC
      </button>
      <button
        onClick={() => {
          sortIdeas!({ field: SortFieldOption.Title, desc: true });
        }}
      >
        Sort ideas TITLE DESC
      </button>
      <button
        onClick={() => {
          sortIdeas!({ field: SortFieldOption.Date, desc: false });
        }}
      >
        Sort ideas DATE ASC
      </button>
      <button
        onClick={() => {
          sortIdeas!({ field: SortFieldOption.Date, desc: true });
        }}
      >
        Sort ideas TITLE DESC
      </button>
      {ideas.map((idea) => {
        return (
          <div key={idea.uuid}>
            <div>
              <input
                autoFocus
                type="text"
                value={idea.title}
                onInput={(e) => {
                  updateIdeaField(idea, "title", e.currentTarget.value);
                }}
              />
            </div>

            <div>
              <input
                type="text"
                value={idea.description}
                onInput={(e) => {
                  updateIdeaField(idea, "description", e.currentTarget.value);
                }}
              />
            </div>

            <p>{idea.createdAt}</p>
            <p>{idea.updatedAt}</p>

            <button
              onClick={() => {
                removeIdea!(idea);
              }}
            >
              Remove idea
            </button>
          </div>
        );
      })}

      <button onClick={createIdea}>add idea</button>
    </>
  );
};

export default Home;
