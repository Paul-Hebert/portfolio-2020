module.exports = eleventyConfig => {
  // Rebuild the site when CSS or JS is updated
  // By default 11ty wouldn't know to watch these files since they're processed
  // by node-sass and rollup.
  eleventyConfig.addWatchTarget("./src/assets/");

  eleventyConfig.addCollection("writing", function(collection) {
    return collection.getFilteredByGlob("src/writing/*/*.md");
  });

  eleventyConfig.addCollection("styleGuide", function(collection) {
    return collection.getFilteredByGlob("src/style-guide/*/*.hbs");
  });

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
