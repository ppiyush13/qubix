import mock from "mock-require";
import { resolve } from "path";
import configOverridesModule from "./generateModules/config-overrides";
import slugify from "../slugify";

export default ({ input, output }) => {
  const cwd = process.cwd();

  const inputPath = resolve(cwd, input);
  const outputPath = resolve(cwd, output);

  const configOverrideModulePath = resolve(cwd, "config-overrides");

  // get module name of caller
  const packageJsonPath = resolve(cwd, "package.json");
  const { name } = require(packageJsonPath);

  const configOverrideModuleRaw = configOverridesModule({
    outputPath,
    inputPath,
    requireFrom: `qubix.${slugify(name)}`,
  });

  mock(configOverrideModulePath, configOverrideModuleRaw);
};
