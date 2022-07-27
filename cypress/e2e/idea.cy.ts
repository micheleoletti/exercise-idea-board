import { correctLogin } from "./login.cy";

describe("idea", () => {
  it("idea can be created", () => {
    correctLogin();
  });
});
