const globby = require("globby");
const configs = globby.sync("src/!(experiments)/**/*.js").map(inputFile => ({
  input: inputFile,
  output: {
    file: inputFile.replace("src", "dist"),
    format: "iife"
  }
}));
module.exports = configs;
