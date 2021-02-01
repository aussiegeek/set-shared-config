import { devDepPackages } from "./config";
import { Dependencies, PackageJSON } from "./types";
import { updatePackageJSON } from "./updatePackageJSON";

const latestVersion = jest.fn().mockResolvedValue("6.6.6");

describe("updatePackageJSON", () => {
  test("keeps unrelated values", async () => {
    const pkg = { name: "foo-bar" };
    const updated = await updatePackageJSON(pkg, latestVersion);
    expect(updated).toEqual(expect.objectContaining(pkg));
  });

  describe("prettier", () => {
    test("prettier is added if its not already in use", async () => {
      const updatedPackage = await updatePackageJSON({}, latestVersion);
      expect(updatedPackage.devDependencies).toEqual(
        expect.objectContaining({
          prettier: "6.6.6",
        })
      );
    });

    test("prettier version isn't changed if it's already added", async () => {
      const updatedPackage = await updatePackageJSON(
        { devDependencies: { prettier: "1.2.3" } },
        latestVersion
      );
      expect(updatedPackage.devDependencies).toEqual(
        expect.objectContaining({
          prettier: "1.2.3",
        })
      );
    });
  });

  describe("jest", () => {
    test("jest is added if its not already in use", async () => {
      const updatedPackage = await updatePackageJSON({}, latestVersion);
      expect(updatedPackage.devDependencies).toEqual(
        expect.objectContaining({ jest: "6.6.6" })
      );
    });

    test("jest version isn't changed if it's already added", async () => {
      const updatedPackage = await updatePackageJSON(
        { devDependencies: { jest: "1.2.3" } },
        latestVersion
      );
      expect(updatedPackage.devDependencies).toEqual(
        expect.objectContaining({ jest: "1.2.3" })
      );
    });
  });

  test("doesn't fetch package info if all dependencies are installed", async () => {
    const notCalledMock = jest.fn();
    const packageJSON: PackageJSON = {};
    packageJSON.devDependencies = devDepPackages.reduce<Dependencies>(
      (acc, val) => {
        acc[val] = "1.0.0";
        return acc;
      },
      { "@aussiegeek/eslint-config-base": "1.0.0" }
    );
    await updatePackageJSON(packageJSON, notCalledMock);
    expect(notCalledMock).not.toHaveBeenCalled();
  });

  describe("eslint", () => {
    test("it adds the correct eslint pkg if react is in use", async () => {
      const updatedPackage = await updatePackageJSON(
        { dependencies: { react: "1.0.0" } },
        latestVersion
      );
      expect(
        updatedPackage.devDependencies?.["@aussiegeek/eslint-config-react"]
      ).toEqual("6.6.6");
      expect(
        updatedPackage.devDependencies?.["@aussiegeek/eslint-config-base"]
      ).toBeUndefined();
    });

    test("it adds the base eslint package if react isn't being used", async () => {
      const updatedPackage = await updatePackageJSON({}, latestVersion);
      expect(
        updatedPackage.devDependencies?.["@aussiegeek/eslint-config-base"]
      ).toEqual("6.6.6");
    });
  });

  describe("custom package json", () => {
    test("default jest config is added", async () => {
      const pkg = await updatePackageJSON({}, latestVersion);
      expect(pkg.jest).toEqual(expect.objectContaining({ preset: "ts-jest" }));
    });

    test("custom jest config is respected", async () => {
      const pkg = await updatePackageJSON(
        { jest: { testEnvironment: "dom" } },
        latestVersion
      );
      expect(pkg.jest).toEqual(
        expect.objectContaining({ preset: "ts-jest", testEnvironment: "dom" })
      );
    });
  });
});
