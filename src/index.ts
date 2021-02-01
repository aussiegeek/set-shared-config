import * as fs from "fs";
import { format } from "prettier";
import latestVersion from "latest-version";
import { updatePackageJSON } from "./updatePackageJSON";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));

updatePackageJSON(pkg, latestVersion)
  .then((update) => {
    console.log(update);

    const output = format(JSON.stringify(update), { filepath: "package.json" });

    // eslint-disable-next-line promise/always-return
    if (process.argv[2] == "--write") {
      fs.writeFileSync("package.json", output);
    } else {
      console.log("Dry run");
      console.log(output);
    }
  })
  .catch(() => {
    console.warn("Something went wrong");
  });
