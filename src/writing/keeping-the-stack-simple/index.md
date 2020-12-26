---
title: Keeping the Stack Simple
description: Experimenting with a new build system for my portfolio.
subhead: Experimenting with a new build system for my portfolio.
date: 2020-03-10
status: published
---

My colleague [Tyler Sticka](https://tylersticka.com/) recently published [Tiny Web Stacks](https://cloudfour.com/thinks/tiny-web-stacks/).
After reading it I was inspired to rethink the stack I use for my portfolio:

> I’ve grown to love small, simple tech stacks for those occasional side projects, micro-sites and one-off experiments that don’t demand as many features or justify such diligent maintenance.

I took a step back and considered what my needs were. There were four main capabilities I wanted that aren't provided by the web out of the box:

- HTML templating
- Hot reloading
- CSS mixins, imports, and nesting
- JS package management and transpilation

I wanted to see how I could achieve these capabilities without adding a beefy build step, or writing a bunch of configuration code. I reached for a few trusty tools:

## HTML Templating and Hot Reloading

First up is HTML templating and hot reloading. I absolutely _love_ using [Eleventy](https://www.11ty.dev/) for this. It makes static site generation a breeze. 

This was the portion of my stack that required the most [configuration](https://github.com/Paul-Hebert/portfolio-2020/blob/master/.eleventy.js). Luckily Eleventy allows you to write your configuration in JavaScript, and has solid documentation.

Eleventy provides numerous options for templating languages. I chose to use [Handlebars](https://handlebarsjs.com/) since it's very close to HTML. I wanted to minimize funky syntax in my templates, and handle complex logic in JS helpers.

Eleventy also provides hot reloading out of the box. By leveraging the `--watch` and `--serve` flags I can get Eleventy to launch a [browser-sync](https://www.browsersync.io/) instance that will serve my local files and automatically reload when there are changes. (As I'm writing this blog post, the preview is updated and reloaded every time I save.)

```zsh
npx @11ty/eleventy --watch --serve --quiet
```

## CSS and SASS

Next up was adding some niceties to my CSS work flow. [SASS](https://sass-lang.com/) is another of my favorite front-end tools. It adds "superpowers" to your CSS, allowing you to use mixins, imports, nesting, and more. Using a [JavaScript interpretation of SASS](https://www.npmjs.com/package/sass) I can recompile my CSS whenever I make CSS changes:

```zsh
sass src:dist --watch
```

It was a little tricky to get this working with Eleventy. Right now Eleventy puts all of my assets in a `dist` directory, including my SCSS files. I have SASS watch that folder. When Eleventy updates those SASS files, my SASS compiler kicks in and compiles them to CSS. Those CSS changes then trigger browser-sync to reload. This feels like a roundabout way to get CSS compilation and reloading working, but so far, so good!

## JavaScript and Rollup

In general I try to minimize client side JavaScript on my sites, but I knew I was going to want to add some fun interactivity with JavaScript. In order to set myself up for success I added [Rollup](https://rollupjs.org/) so I can easily bundle and transpile my JavaScript. I had to write a small amount of config code for this:

```js
const globby = require("globby");
const configs = globby.sync("src/**/*.js").map(inputFile => ({
  input: inputFile,
  output: {
    file: inputFile.replace("src", "dist"),
    format: "iife"
  }
}));
module.exports = configs;
```

Then I can boot up Rollup to watch for changes:

```zsh
rollup --config --watch
```

Whenever I make JavaScript changes it bundles up my JavaScript and copies it into the `dist` directory. Then browser-sync picks up that change and reloads.

## Putting it All Together

Traditionally, this is when I'd start reaching for a task runner like [Gulp](https://gulpjs.com/), but I'd really like to keep things simple and start building my site! Do I really _need_ a task runner?

Tyler had suggested using `npm-run-all` to run a bunch of npm tasks in parallel or sequence. I decided to try this out and see if I could use it to run all of my tools:

```json
"scripts": {
  "clean": "del-cli dist",
  "dev:content": "npx @11ty/eleventy --watch --serve --quiet",
  "dev:rollup": "rollup --config --watch",
  "dev:sass": "sass src:dist --watch",
  "start": "npm-run-all -s clean -p dev:*"
},
```

With this setup I can run `npm start` and boot up a dev environment with all of my tooling running and watching for changes!

My `start` task runs a `clean` task to delete any old content in my `dist` directory. Then it starts up Eleventy, SASS, and Rollup and runs them all in parallel. With this setup I can get coding!

## Publishing the Site

There's one final piece. I need a good way to deploy my site. I set up a [Netlify](https://www.netlify.com/) site since they work great for static sites. I then added some modified scripts to run whenever I deployed to Eleventy. The main change is that I don't need to watch for changes when I deploy:

```json
"scripts": {
  "clean": "del-cli dist",
  "dev:content": "npx @11ty/eleventy --watch --serve --quiet",
  "dev:rollup": "rollup --config --watch",
  "dev:sass": "sass src:dist --watch",
  "start": "npm-run-all -s clean -p dev:*",
  "build:content": "npx @11ty/eleventy",
  "build:rollup": "rollup --config",
  "build:sass": "sass src:dist",
  "build": "run-p build:*"
},
```

I then setup a GitHub integration, so pushing to my main branch would automatically redeploy my Netlify site. Time to commit this blog post and push it up! 
