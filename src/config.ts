export const devDepPackages = ["prettier", "jest", "ts-jest", "eslint"];

export const defaultPackageJSON = {
  jest: {
    preset: "ts-jest",
    testEnvironment: "node",
  },
  scripts: {
    "prettier:check": "prettier --check .",
    "prettier:fix": "prettier --fix .",
    "lint:check": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "types:check": "tsc --noEmit",
    ci:
      "yarn prettier:check && yarn lint:check && yarn types:check && yarn test",
    test: "jest",
  },
};
