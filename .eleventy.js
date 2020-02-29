module.exports = eleventyConfig => {
  eleventyConfig.addWatchTarget("./src/assets/");

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
