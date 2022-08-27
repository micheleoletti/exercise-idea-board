import IdeaList from "@/components/IdeaList";
import { fireEvent, screen } from "@testing-library/react";
import { IdeaProvider } from "contexts/IdeaContext";
import { Idea } from "models/idea";
import React from "react";
import { expect } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import { render } from "helpers/test-utils";

describe("todos methods", () => {
  it("can create a todo", () => {
    const ideas: Idea[] = [];

    render(<IdeaList></IdeaList>, {
      allProvidersProps: { initialIdeaState: [] },
    });

    const button = screen.getByRole("button", { name: /Add Idea/i });

    fireEvent.click(button);

    expect(screen.getAllByPlaceholderText("Title")).toHaveLength(
      ideas.length + 1
    );
  });

  it("can edit note", async () => {
    const ideas: Idea[] = [
      {
        uuid: "uuid",
        title: "initial title",
        description: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    render(<IdeaList></IdeaList>, {
      allProvidersProps: { initialIdeaState: ideas },
    });

    const titleInput = screen.getByPlaceholderText("Title");
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "modified title");

    expect(screen.getByDisplayValue("modified title")).not.toBeUndefined();
  });

  it("can delete note", async () => {
    const ideas: Idea[] = [
      {
        uuid: "uuid",
        title: "initial title",
        description: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    render(<IdeaList></IdeaList>, {
      allProvidersProps: { initialIdeaState: ideas },
    });

    const deleteButton = screen.getByRole("button", { name: /delete idea/i });

    await userEvent.click(deleteButton);

    expect(screen.queryByDisplayValue("initial title")).toBeNull();
  });
});
