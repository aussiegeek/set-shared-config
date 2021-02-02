export const devDepPackages = [
  "eslint",
  "husky",
  "jest",
  "lint-staged",
  "prettier",
  "sort-package-json",
  "ts-jest",
];

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
  "lint-staged": {
    "*.{ts,tsx,js,json,yml,yaml,css,md}": "prettier --write",
    "*.{ts,tsx}": "eslint --fix",
    "package.json": "sort-package-json",
  },
  husky: {
    hooks: {
      "pre-commit": "lint-staged",
    },
  },
};
