const fileName = "assets/scripts/index.js";

module.exports = {
  input: `src/${fileName}`,
  output: {
    file: `dist/${fileName}`,
    format: "iife"
  }
};
