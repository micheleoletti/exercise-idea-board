import IdeaList from "@/components/IdeaList";
import { fireEvent, render, screen } from "@testing-library/react";
import { IdeaProvider } from "contexts/IdeaContext";
import { Idea } from "models/idea";
import React from "react";
import { expect } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import IdeaSorter from "@/components/IdeaSorter";

describe("idea sorting", () => {
  it("can sort by name", async () => {
    const ideas: Idea[] = [
      {
        uuid: "1",
        title: "idea title 3",
        description: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        uuid: "2",
        title: "idea title 2",
        description: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        uuid: "3",
        title: "idea title 1",
        description: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    render(
      <IdeaProvider initialIdeas={ideas}>
        <IdeaSorter></IdeaSorter>
        <IdeaList></IdeaList>
      </IdeaProvider>
    );

    const sortByTitleButton = screen.getByRole("button", {
      name: /sort by title/i,
    });
    await userEvent.click(sortByTitleButton);

    expect(screen.getByLabelText("sorting title desc")).toBeDefined();

    screen.debug();

    const ideaTitles = screen.queryAllByDisplayValue(/idea title [1-3]/i);
    expect(ideaTitles.length).toBe(3);

    expect(ideaTitles[0]).toHaveTextContent("idea title 3");
  });
});
