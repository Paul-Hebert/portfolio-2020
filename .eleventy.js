module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy("src/assets/scripts/compiled/index.js");
  eleventyConfig.addPassthroughCopy("src/assets/styles/compiled/index.css");

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
