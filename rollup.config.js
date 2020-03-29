const globby = require("globby");
const configs = globby.sync("src/**/*.js").map(inputFile => ({
  input: inputFile,
  output: {
    file: inputFile.replace("src", "dist"),
    format: "iife"
  }
}));
module.exports = configs;
