---
title: Code Blocks
notes: |
  Code blocks use [highlight.js](https://highlightjs.org/) for server side
  syntax highlighting.
---

## JavaScript Example: 

```js
const Handlebars = require("handlebars");
const prettyDate = require("./helpers/prettyDate");
const reverse = require("./helpers/reverse");
const { compare } = require("@cloudfour/hbs-helpers");
const hljs = require('highlight.js');
const md = require('markdown-it')({
  html: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs prose__breakout"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs prose__breakout"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

module.exports = eleventyConfig => {
  // Rebuild the site when CSS or JS is updated
  // By default 11ty wouldn't know to watch these files since they're processed
  // by node-sass and rollup.
  eleventyConfig.addWatchTarget("./src/**/*.{js,scss}");

  eleventyConfig.addCollection("writing", function(collection) {
    return collection.getFilteredByGlob("src/writing/*/*.md");
  });

  eleventyConfig.addCollection("identity", function(collection) {
    return collection.getFilteredByGlob(
      "src/style-guide/identity/*/*.{hbs,md}"
    );
  });

  eleventyConfig.addCollection("components", function(collection) {
    return collection.getFilteredByGlob("src/style-guide/components/*/*.{hbs,md}");
  });

  Handlebars.registerHelper("prettyDate", prettyDate);
  Handlebars.registerHelper("reverse", reverse);
  Handlebars.registerHelper("compare", compare);

  eleventyConfig.setLibrary('md', md);
  eleventyConfig.addFilter('markdown', value => { return md.render(value); });

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
```

## CSS Example: 

```scss 
@import "_config.scss";

// TODO: Optimize font loading strategy
// https://fonts.google.com/specimen/Roboto?query=robot&selection.family=Libre+Baskerville:ital,wght@0,700;1,400|Roboto:ital,wght@0,400;0,700;1,400;1,700&sidebar.open
@import url("https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,700;1,400&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap");

// Scale up our core font size as the screen size increases.
body {
  font-family: $font-body;
  // TODO: Change to SCSS lock when I have breakpoints?
  font-size: calc(1em + 0.25vw);
}

// Set default styles for non-heading text content.
p,
ul,
ol {
  line-height: 1.5;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: $font-display;
  font-weight: 700;
  line-height: 1.2;
}
```

## HTML Example

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>
    {{ title }}
  </title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- TODO: Meta Description -->
  <!-- TODO: Favicon -->

  <link rel="stylesheet" href="/assets/styles/index.css">
</head>

<body class="page">
  <header class="page__header">
    <nav class="nav">
      <a href="/" class="nav__left-item">Paul Hebert</a>
      <a href="/work">Work</a>
      <a href="/writing">Writing</a>
      <a href="/art">Art</a>
    </nav>
  </header>

  <main class="page__main">
    Hello World!
  </main>

  <footer class="page__footer">
    <nav class="nav">
      <a href="/style-guide">Style Guide</a>
      <a href="/work">Work</a>
      <a href="/writing">Writing</a>
      <a href="/art">Art</a>
      <a href="https://github.com/Paul-Hebert">Github</a>
      <a href="https://twitter.com/HaulPebert">Twitter</a>
    </nav>
  </footer>

  <script src="/assets/scripts/index.js"></script>
</body>

</html>
```
