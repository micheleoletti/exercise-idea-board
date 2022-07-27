import IdeaCard from "@/components/IdeaCard";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Idea } from "models/idea";

let emptyIdea: Idea = {
  uuid: "uuid",
  title: "",
  description: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("Idea card", () => {
  it("title autofocused when empty idea is provided", () => {
    render(<IdeaCard idea={emptyIdea} />);

    expect(screen.getByPlaceholderText("Title")).toHaveFocus();
  });
});
