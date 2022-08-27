import { render, RenderOptions } from "@testing-library/react";
import { IdeaContext } from "contexts/IdeaContext";
import { Idea } from "models/idea";
import { PropsWithChildren, ReactElement, useState } from "react";

interface AllTheProvidersProps extends PropsWithChildren<any> {
  initialIdeaState?: Idea[];
}

/** ask Dan:
 * Is it the right approach to pass an initial state?
 * Or I should give the customRender consumer the ability the specify
 * manually the value(state + stateSetter)?
 * Naively I prefer this way because I can delegate the state management to React as soon as possible
 * and keep my test close to reality.
 * However I may be missing some testing scenarios where passing mock functions is mandatory.
 */
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
