import {findPackages, MonoRepo} from "@tsed/monorepo-utils";
import {dirname, join, relative} from "node:path";
import cloneDeep from "lodash/cloneDeep.js";
import omit from "lodash/omit.js";
import fs from "fs-extra";

const scriptDir = import.meta.dirname;

async function main() {
  const monoRepo = new MonoRepo({
    rootDir: process.cwd(),
    verbose: false
  });

  const pkgRoot = fs.readJsonSync(join(monoRepo.rootDir, "package.json"));

  const tsConfigTemplate = await fs.readJson(join(scriptDir, "./tsconfig.template.json"));
  const tsConfigBuildTemplate = await fs.readJson(join(scriptDir, "./tsconfig.build.template.json"));
  const viteConfig = fs.readFileSync(join(scriptDir, "./vite.config.mts"), {encoding: "utf8"});

  const tsConfigRootPath = join(monoRepo.rootDir, "tsconfig.json");
  const tsConfigRoot = await fs.readJson(tsConfigRootPath);
  tsConfigRoot.references = [];

  const packages = await findPackages(monoRepo);

  const packagesRefsMap = packages.reduce((map, pkg) => {
    if (pkg.pkg.source && pkg.pkg.source.endsWith(".ts")) {
      return map.set(pkg.pkg.name, dirname(pkg.path));
    }
    return map;
  }, new Map());

  const promises = packages.map(async (pkg) => {
    const path = dirname(pkg.path);

    if (pkg.pkg.source && pkg.pkg.source.endsWith(".ts")) {
      const tsConfig = cloneDeep(tsConfigTemplate);
      const tsConfigBuild = cloneDeep(tsConfigBuildTemplate);
      const tsConfigPath = join(path, "tsconfig.json");
      const tsConfigBuildPath = join(path, "tsconfig.build.json");
      const viteConfigPath = join(path, "vite.config.ts");

      Object.keys({
        ...(pkg.pkg.peerDependencies || {}),
        ...(pkg.pkg.devDependencies || {}),
        ...(pkg.pkg.dependencies || {})
      })
        .filter((peer) => {
          return packagesRefsMap.has(peer);
        })
        .map((peer) => {
          tsConfigBuild.references.push({
            path: join(relative(dirname(pkg.path), packagesRefsMap.get(peer)), "tsconfig.build.json")
          });
        });

      await fs.writeJson(tsConfigPath, tsConfig, {spaces: 2});
      await fs.writeJson(tsConfigBuildPath, tsConfigBuild, {spaces: 2});

      tsConfigRoot.references.push({
        path: `./${relative(process.cwd(), path)}`
      });

      pkg.pkg = {
        name: pkg.pkg.name,
        description: pkg.pkg.description,
        type: "module",
        ...omit(pkg.pkg, ["name", "description"])
      };
      pkg.pkg.scripts = {
        ...pkg.pkg.scripts,
        "build:ts": "tsc --build tsconfig.json"
      };

      pkg.pkg.devDependencies["@tsed/typescript"] = "workspace:*";
      pkg.pkg.devDependencies["typescript"] = pkgRoot.devDependencies["typescript"];

      // migrate task
      if (pkg.pkg.scripts["build:browser"] === "webpack") {
        delete pkg.pkg.devDependencies["webpack"];

        pkg.pkg.scripts["build:browser"] = "vite build";

        await fs.writeFile(
          viteConfigPath,
          viteConfig.replace("__PACKAGE__", pkg.pkg.name).replace("__NAME__", pkg.pkg.name.split("/")[1]),
          {
            encoding: "utf-8"
          }
        );
      }

      if (pkg.pkg.scripts["build:browser"]) {
        pkg.pkg.devDependencies["vite"] = pkgRoot.devDependencies["vite"];
      }

      // prepare exports

      pkg.pkg.main = pkg.pkg.main.replace("cjs/", "esm/");

      if (pkg.pkg.exports && !pkg.pkg.exports["."]) {
        pkg.pkg.exports = {
          ".": {
            ...pkg.pkg.exports,
            require: undefined
          }
        };
      }

      await fs.writeJson(pkg.path, pkg.pkg, {spaces: 2});

      try {
        fs.removeSync(join(path, "tsconfig.esm.json"));
      } catch {}
    }
  });

  await Promise.all(promises);

  await fs.writeJson(tsConfigRootPath, tsConfigRoot, {spaces: 2});
}

main();
