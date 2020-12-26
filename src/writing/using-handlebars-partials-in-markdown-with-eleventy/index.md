---
title: Using Handlebars Partials In Markdown With Eleventy
description: Combining the power of Handlebars with the simplicity of Markdown.
date: 2020-12-13
status: draft
---

I've been rebuilding my portfolio with [Eleventy](https://www.11ty.dev/) and loving it. One of my favorite features is that I can use different templating languages for different files. I can harness all the strengths of a templating language like [Handlebars](https://handlebarsjs.com/) when building out pages, and enjoy the simplicity of [Markdown](https://daringfireball.net/projects/markdown/syntax) when writing blog posts.

One of the most useful aspects of Handlebars is the ability to store and reuse chunks of markup in partials. I've been using this as the underlying structure of my site, building a [set of components](/design-system/#components) that can be reused across pages.

Recently I was writing a blog post in Markdown and wanted to use [my figure component](/design-system/components/figure/). However, I could only access Handlebars partials from within Handlebars files... how could I configure Eleventy so that I could use these partials from Markdown files?

## Eleventy Shortcodes

Eleventy allows you to define ["shortcodes"](https://www.11ty.dev/docs/shortcodes/) to extend your templating engines. You can define special behavior that should be triggered by adding special strings to your templates.

In my case I wanted to create a shortcode which could render any of my Handlebars partials with dynamic content. Here's the syntax I was aiming for:

**TODO: Escape this correctly:**

```liquid
{%
  partial 
  'figure', '{"iframeSrc": "/experiments/spline/mushrooms", "caption": "A 3D rendering of mushrooms I designed using the awesome Spline tool. Click and drag to rotate."}' 
%}
```

My short code would be named `partial` and take two arguments: the name of the partial to render, and a JSON string containing parameters to pass to the partial.

## Accessing Handlebars Templates

Once I knew h

## Why is my code escaped?

## Putting It All Together

{% 
  partial 
  'figure', '{"iframeSrc": "/experiments/spline/mushrooms", "caption": "A 3D rendering of mushrooms I designed using the awesome Spline tool. Click and drag to rotate."}' 
%}
