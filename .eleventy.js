const Handlebars = require("handlebars");
const prettyDate = require("./helpers/prettyDate");
const reverse = require("./helpers/reverse");
const { compare } = require("@cloudfour/hbs-helpers");
const hljs = require("highlight.js");
const md = require("markdown-it")({
  html: true,
  typographer: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs prose__breakout"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs prose__breakout"><code>' +
      md.utils.escapeHtml(str) +
      "</code></pre>"
    );
  }
});

module.exports = eleventyConfig => {
  // Rebuild the site when CSS or JS is updated
  // By default 11ty wouldn't know to watch these files since they're processed
  // by node-sass and rollup.
  eleventyConfig.addWatchTarget("./src/**/*.{js,scss}");

  eleventyConfig.addPassthroughCopy("./src/**/*.{png,svg,jpeg,jpg}");

  eleventyConfig.addCollection("writing", function(collection) {
    return collection.getFilteredByGlob("src/writing/*/*.md");
  });

  eleventyConfig.addCollection("identity", function(collection) {
    return collection.getFilteredByGlob(
      "src/style-guide/identity/*/*.{hbs,md}"
    );
  });

  eleventyConfig.addCollection("components", function(collection) {
    return collection.getFilteredByGlob(
      "src/style-guide/components/*/*.{hbs,md}"
    );
  });

  eleventyConfig.addCollection("prototypes", function(collection) {
    return collection.getFilteredByGlob("src/style-guide/prototypes/*/*.hbs");
  });

  Handlebars.registerHelper("prettyDate", prettyDate);
  Handlebars.registerHelper("reverse", reverse);
  Handlebars.registerHelper("compare", compare);

  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addFilter("markdown", value => {
    return md.render(value);
  });

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
