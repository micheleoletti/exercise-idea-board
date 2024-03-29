const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/components/(.*)$": "<rootDir>/components/$1",

    "^@/pages/(.*)$": "<rootDir>/pages/$1",

    // https://www.sobyte.net/post/2022-06/jest/, 5 hours lost right there
    "^uuid$": require.resolve("uuid"),
  },
  testEnvironment: "jest-environment-jsdom",
  // add this to enable absolute paths
  modulePaths: ["<rootDir>"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
