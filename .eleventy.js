const Handlebars = require("handlebars");
const prettyDate = require("./helpers/prettyDate");
const uglyDate = require("./helpers/uglyDate");
const reverse = require("./helpers/reverse");
const preparePosts = require("./helpers/preparePosts");
const sortCollection = require("./helpers/sortCollection");
const { concat, compare, defaultTo } = require("@cloudfour/hbs-helpers");
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
          `<pre class="hljs prose__breakout"><code>${hljs.highlight(lang, str, true).value.trim()}</code></pre>`
        );
      } catch (e) {
        console.error('Code Highlighting Failed')
      }
    }

    return (
      '<pre class="hljs prose__breakout"><code>' +
      md.utils.escapeHtml(str) +
      "</code></pre>"
    );
  },
});

module.exports = (eleventyConfig) => {
  eleventyConfig.setDataDeepMerge(true);

  // Rebuild the site when CSS or JS is updated
  // By default 11ty wouldn't know to watch these files since they're processed
  // by node-sass and rollup.
  eleventyConfig.addWatchTarget("./src/**/*.{js,scss}");

  eleventyConfig.addPassthroughCopy("./src/**/*.{png,svg,jpeg,jpg}");
  eleventyConfig.addPassthroughCopy("./src/experiments/**/*.js");

  eleventyConfig.addCollection("work", function (collection) {
    return collection.getFilteredByGlob("src/work/*/*.{hbs,md}");
  });

  eleventyConfig.addCollection("writing", function (collection) {
    return collection.getFilteredByGlob("src/writing/*/*.md");
  });

  eleventyConfig.addCollection("art", function (collection) {
    return collection.getFilteredByGlob("src/art/**/*.md");
  });

  eleventyConfig.addCollection("identity", function (collection) {
    return collection.getFilteredByGlob(
      "src/design-system/identity/*/*.{hbs,md}"
    );
  });

  eleventyConfig.addCollection("components", function (collection) {
    return collection.getFilteredByGlob(
      "src/design-system/components/*/*.{hbs,md}"
    );
  });

  eleventyConfig.addCollection("prototypes", function (collection) {
    return collection.getFilteredByGlob(
      "src/design-system/prototypes/*/*.{hbs,md}"
    );
  });


  Handlebars.registerHelper("prettyDate", prettyDate);
  Handlebars.registerHelper("uglyDate", uglyDate);
  Handlebars.registerHelper("reverse", reverse);
  Handlebars.registerHelper("preparePosts", preparePosts);
  Handlebars.registerHelper("sortCollection", sortCollection);
  Handlebars.registerHelper("concat", concat);
  Handlebars.registerHelper("compare", compare);
  Handlebars.registerHelper("defaultTo", defaultTo);
  Handlebars.registerHelper("ternary", ternary);

  // Store handlebars template functions so we can use them from shortcodes
  const templates = {};

  // Register handlebars partials
  fg.sync('src/design-system/components/**/partials/**/*.hbs').forEach(file => {
    // Read our partial's markup
    const partial = fs.readFileSync(file, 'utf8');
    // Generate a simplied key from the final chunk of the path
    const pathSegments = file.split('/');
    let key = pathSegments[pathSegments.length - 1];
    key = key.replace(path.extname(file), '');

    // Register our partial
    Handlebars.registerPartial(key, partial);

    // Store the partial template for short code use later.
    templates[key] = Handlebars.compile(Handlebars.partials[key]);
  });

  // Add a shortcode to allow us to render Handlebars partials
  eleventyConfig.addShortcode("partial", (name, params) => {
    const HTML = templates[name](JSON.parse(params));
    // When used in markdown, anything indented 4 spaces is treated as
    // a code snippet. We can remove these spaces so HTML isn't escaped.
    // @see https://www.11ty.dev/docs/languages/markdown/#there-are-extra-and-in-my-output
    return HTML.replace(/    /g, '');
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
