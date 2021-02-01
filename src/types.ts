// package.json types

type PackageName = string;
type PackageVersion = string;

export type Dependencies = Record<PackageName, PackageVersion>;

export interface PackageJSON {
  name?: string;
  dependencies?: Dependencies;
  devDependencies?: Dependencies;
  jest?: Record<string, unknown>;
}
