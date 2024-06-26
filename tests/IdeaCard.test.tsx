import IdeaList from "@/components/IdeaList";
import { expect } from "@jest/globals";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "helpers/test-utils";
import { Idea } from "models/idea";
import IdeaCard, { TEXTAREA_CHAR_LIMIT } from "../components/IdeaCard";

let emptyIdea: Idea = {
  uuid: "uuid",
  title: "",
  description: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("Idea card", () => {
  it("title autofocused when empty idea is provided", () => {
    // TODO: fix state not working correctly
    render(<IdeaCard idea={emptyIdea} />, {
      allProvidersProps: { initialIdeaState: [] },
    });

    expect(screen.getByPlaceholderText("Title")).toHaveFocus();
  });

  it("show char countdown", async () => {
    render(<IdeaList></IdeaList>, {
      allProvidersProps: { initialIdeaState: [emptyIdea] },
    });

    let charsCountdown = screen.getByLabelText("char countdown");
    const descriptionTextarea = screen.getByPlaceholderText("Description");

    const description = "this is the description";

    expect(charsCountdown).toHaveTextContent(TEXTAREA_CHAR_LIMIT.toString());

    await userEvent.type(descriptionTextarea, description);

    charsCountdown = screen.getByLabelText("char countdown");

    expect(charsCountdown).toHaveTextContent(
      (TEXTAREA_CHAR_LIMIT - description.length).toString()
    );
  });

  it("updates update time", async () => {
    const oldUpdateTime = new Date("2000-01-01T00:00:00");
    const oldIdea: Idea = {
      ...emptyIdea,
      updatedAt: oldUpdateTime.toISOString(),
    };

    render(<IdeaList></IdeaList>, {
      allProvidersProps: { initialIdeaState: [oldIdea] },
    });

    const titleInput = screen.getByPlaceholderText("Title");
    await userEvent.type(titleInput, "new updated title");

    const updatedAtText = (
      await screen.findByLabelText("updated at time")
    ).textContent?.replace("Updated at: ", "");
    const updatedTime = new Date(Date.parse(updatedAtText!));

    expect(updatedTime.getTime()).toBeGreaterThan(oldUpdateTime.getTime());
  });
});
