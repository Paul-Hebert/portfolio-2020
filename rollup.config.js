const rootPath = "src/assets/scripts";
const fileName = "index.js";

module.exports = {
  input: `${rootPath}/${fileName}`,
  output: {
    file: `${rootPath}/compiled/${fileName}`,
    format: "iife"
  }
};
