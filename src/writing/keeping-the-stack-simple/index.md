---
title: Keeping the Stack Simple
description: Experimenting with a new build system for my portfolio.
date: 2020-03-10
---

# Keeping the Stack Simple

My colleague Tyler recently published [Tiny Web Stacks](https://cloudfour.com/thinks/tiny-web-stacks/).
After reading it I was inspired to rethink the stack I use for my portfolio:

> I’ve grown to love small, simple tech stacks for those occasional side projects, micro-sites and one-off experiments that don’t demand as many features or justify such diligent maintenance.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

```json
{
  "scripts": {
    "dev:clean": "del-cli dist",
    "dev:content": "npx @11ty/eleventy --watch --serve --quiet",
    "dev:rollup": "rollup --config --watch",
    "dev:sass": "sass src/assets/styles:dist/assets/styles --watch",

    "start": "run-p dev:*",

    "build:content": "npx @11ty/eleventy",
    "build:rollup": "rollup --config",
    "build:sass": "sass src/assets/styles:dist/assets/styles",

    "build": "run-p build:*"
  },
  "devDependencies": {
    "@11ty/eleventy": "^0.10.0",
    "del-cli": "^3.0.0",
    "handlebars": "^4.7.3",
    "npm-run-all": "^4.1.5",
    "rollup": "^1.32.0",
    "sass": "^1.26.2"
  }
}

```

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
