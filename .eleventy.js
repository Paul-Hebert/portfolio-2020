const Handlebars = require("handlebars");
const prettyDate = require("./helpers/prettyDate");
const reverse = require("./helpers/reverse");
const { compare } = require("@cloudfour/hbs-helpers");
const ternary = require('handlebars-helper-ternary');
const hljs = require("highlight.js");
const path = require('path');
const fg = require('fast-glob');
const fs = require('fs');
const md = require("markdown-it")({
  html: true,
  typographer: true,
  highlight: function (str, lang) {
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
  },
});

module.exports = (eleventyConfig) => {
  // Rebuild the site when CSS or JS is updated
  // By default 11ty wouldn't know to watch these files since they're processed
  // by node-sass and rollup.
  eleventyConfig.addWatchTarget("./src/**/*.{js,scss}");

  eleventyConfig.addPassthroughCopy("./src/**/*.{png,svg,jpeg,jpg}");

  eleventyConfig.addCollection("writing", function (collection) {
    return collection.getFilteredByGlob("src/writing/*/*.md");
  });

  eleventyConfig.addCollection("art", function (collection) {
    return collection.getFilteredByGlob("src/art/**/*.md");
  });

  eleventyConfig.addCollection("identity", function (collection) {
    return collection.getFilteredByGlob(
      "src/style-guide/identity/*/*.{hbs,md}"
    );
  });

  eleventyConfig.addCollection("components", function (collection) {
    return collection.getFilteredByGlob(
      "src/style-guide/components/*/*.{hbs,md}"
    );
  });

  eleventyConfig.addCollection("prototypes", function (collection) {
    return collection.getFilteredByGlob(
      "src/style-guide/prototypes/*/*.{hbs,md}"
    );
  });


  Handlebars.registerHelper("prettyDate", prettyDate);
  Handlebars.registerHelper("reverse", reverse);
  Handlebars.registerHelper("compare", compare);
  Handlebars.registerHelper("ternary", ternary);

  // Register handlebars partials
  fg.sync('src/style-guide/components/**/partials/**/*.hbs').forEach(file => {
    const partial = fs.readFileSync(file, 'utf8');
    const pathSegments = file.split('/');
    let key = pathSegments[pathSegments.length - 1];
    key = key.replace(path.extname(file), '');
    Handlebars.registerPartial(key, partial);
  });

  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addFilter("markdown", (value) => {
    return md.render(value);
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
