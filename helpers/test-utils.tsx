import { render, RenderOptions } from "@testing-library/react";
import { IdeaContext } from "contexts/IdeaContext";
import { Idea } from "models/idea";
import { PropsWithChildren, ReactElement, useState } from "react";

interface AllTheProvidersProps extends PropsWithChildren<any> {
  initialIdeaState?: Idea[];
}

const AllTheProviders = ({
  initialIdeaState = [],
  children,
}: AllTheProvidersProps) => {
  const [ideas, setIdeas] = useState(initialIdeaState);

  return (
    <IdeaContext.Provider value={{ ideas, setIdeas }}>
      {children}
    </IdeaContext.Provider>
  );
};

interface CustomRenderOptions extends RenderOptions {
  allProvidersProps?: AllTheProvidersProps;
}

const customRender = (
  ui: ReactElement,
  { allProvidersProps, ...options }: Partial<CustomRenderOptions> = {
    allProvidersProps: { initialIdeaState: [] },
  }
) =>
  render(ui, {
    wrapper: (props) => <AllTheProviders {...props} {...allProvidersProps} />,
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
