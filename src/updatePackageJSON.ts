import { devDepPackages, defaultPackageJSON } from "./config";
import { Dependencies, PackageJSON } from "./types";
import { merge } from "merge-anything";

export type LatestVersionFunc = (packageName: string) => Promise<string>;

function requiredDevDeps(pkgJSON: PackageJSON): string[] {
  const depsWithEslint = [...devDepPackages];
  if (pkgJSON.dependencies?.react) {
    depsWithEslint.push("@aussiegeek/eslint-config-react");
  } else {
    depsWithEslint.push("@aussiegeek/eslint-config-base");
  }
  return depsWithEslint;
}

export async function updatePackageJSON(
  pkgJSON: PackageJSON,
  latestVersion: LatestVersionFunc
): Promise<PackageJSON> {
  const newPkgJSON = merge({}, defaultPackageJSON, pkgJSON);
  const devDeps: Dependencies = newPkgJSON.devDependencies || {};

  for (const dep of requiredDevDeps(newPkgJSON)) {
    if (!devDeps[dep]) {
      devDeps[dep] = await latestVersion(dep);
    }
  }
  newPkgJSON.devDependencies = devDeps;

  return newPkgJSON;
}
