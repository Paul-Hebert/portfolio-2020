module.exports = eleventyConfig => {
  // Rebuild the site when CSS or JS is updated
  // By default 11ty wouldn't know to watch these files since they're processed
  // by node-sass and rollup.
  eleventyConfig.addWatchTarget("./src/assets/");

  eleventyConfig.addCollection("writing", function(collection) {
    return collection.getFilteredByGlob("src/writing/*/*.md");
  });

  eleventyConfig.addCollection("identity", function(collection) {
    return collection.getFilteredByGlob(
      "src/style-guide/identity/*/*.{hbs,md}"
    );
  });

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
