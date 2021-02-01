import typescript from "rollup-plugin-typescript2";

export default {
  external: ["fs", "prettier", "latest-version", "merge-anything"],
  input: "src/index.ts",
  output: {
    file: "dist/bin/set-shared-config.js",
    format: "cjs",
    banner: "#!/usr/bin/env node",
  },
  plugins: [typescript()],
};
