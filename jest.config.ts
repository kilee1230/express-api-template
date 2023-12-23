import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  rootDir: "./",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js"],
  testPathIgnorePatterns: ["/test\\.ts"],
  coveragePathIgnorePatterns: ["<rootDir>/src/middleware/.*.ts"],
  testRegex: "/src/.*.test.(ts|tsx|js)$",
  transform: {
    "\\.(ts|tsx)$": "ts-jest"
  },
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
export default config;
