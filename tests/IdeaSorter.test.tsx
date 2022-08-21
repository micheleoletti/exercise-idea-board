import IdeaList from "@/components/IdeaList";
import { fireEvent, render, screen } from "@testing-library/react";
import { IdeaProvider } from "contexts/IdeaContext";
import { Idea } from "models/idea";
import React from "react";
import { expect } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import IdeaSorter from "@/components/IdeaSorter";

import "@testing-library/jest-dom";

const renderSortableItems = () => {
  const ideas: Idea[] = [
    {
      uuid: "1",
      title: "idea title 3",
      description: "",
      createdAt: new Date("2020-01-01T00:00:00").toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      uuid: "2",
      title: "idea title 2",
      description: "",
      createdAt: new Date("2021-01-01T00:00:00").toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      uuid: "3",
      title: "idea title 1",
      description: "",
      createdAt: new Date("2022-01-01T00:00:00").toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  render(
    <IdeaProvider initialIdeas={ideas}>
      <IdeaSorter></IdeaSorter>
      <IdeaList></IdeaList>
    </IdeaProvider>
  );
};

describe("idea sorting", () => {
  it("can sort by name", async () => {
    renderSortableItems();

    const sortByTitleButton = screen.getByRole("button", {
      name: /sort by title/i,
    });
    await userEvent.click(sortByTitleButton);

    expect(screen.getByLabelText("sorting title desc")).toBeDefined();

    const ideaTitlesDesc = screen.queryAllByDisplayValue(/idea title [1-3]/i);
    expect(ideaTitlesDesc.length).toBe(3);

    // TODO: Ask Dan how to config the intellisense to detect this method
    expect(ideaTitlesDesc[0]).toHaveDisplayValue("idea title 3");
    expect(ideaTitlesDesc[1]).toHaveDisplayValue("idea title 2");
    expect(ideaTitlesDesc[2]).toHaveDisplayValue("idea title 1");

    await userEvent.click(sortByTitleButton);

    const ideaTitlesAsc = screen.queryAllByDisplayValue(/idea title [1-3]/i);
    expect(ideaTitlesDesc.length).toBe(3);

    expect(ideaTitlesAsc[0]).toHaveDisplayValue("idea title 1");
    expect(ideaTitlesAsc[1]).toHaveDisplayValue("idea title 2");
    expect(ideaTitlesAsc[2]).toHaveDisplayValue("idea title 3");
  });

  it("can sort by date", async () => {
    renderSortableItems();

    const sortByDateButton = screen.getByRole("button", {
      name: /sort by date/i,
    });
    await userEvent.click(sortByDateButton);

    expect(screen.getByLabelText("sorting date asc")).toBeDefined();

    const ideaTitlesAsc = screen.queryAllByDisplayValue(/idea title [1-3]/i);
    expect(ideaTitlesAsc.length).toBe(3);

    expect(ideaTitlesAsc[0]).toHaveDisplayValue("idea title 3");
    expect(ideaTitlesAsc[1]).toHaveDisplayValue("idea title 2");
    expect(ideaTitlesAsc[2]).toHaveDisplayValue("idea title 1");

    await userEvent.click(sortByDateButton);

    expect(screen.getByLabelText("sorting date desc")).toBeDefined();

    const ideaTitlesDesc = screen.queryAllByDisplayValue(/idea title [1-3]/i);
    expect(ideaTitlesDesc.length).toBe(3);

    expect(ideaTitlesDesc[0]).toHaveDisplayValue("idea title 1");
    expect(ideaTitlesDesc[1]).toHaveDisplayValue("idea title 2");
    expect(ideaTitlesDesc[2]).toHaveDisplayValue("idea title 3");
  });
});
