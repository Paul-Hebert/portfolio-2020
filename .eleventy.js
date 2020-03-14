const Handlebars = require("handlebars");
const prettyDate = require("./helpers/prettyDate");
const reverse = require("./helpers/reverse");

module.exports = eleventyConfig => {
  console.log(prettyDate);
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

  Handlebars.registerHelper("prettyDate", prettyDate);
  Handlebars.registerHelper("reverse", reverse);

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
