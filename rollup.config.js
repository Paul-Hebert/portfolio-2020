const nodeResolve = require("@rollup/plugin-node-resolve");
const globby = require("globby");
const configs = globby.sync("src/!(experiments)/**/*.js").map((inputFile) => ({
  input: inputFile,
  output: {
    file: inputFile.replace("src", "dist"),
    format: "iife",
  },
  plugins: [nodeResolve()],
}));
module.exports = configs;
