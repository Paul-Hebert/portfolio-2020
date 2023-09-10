---
title: Experimenting With Flow Fields
description: Creating generative art with organic flow patterns, math, and code.
date: 2023-01-22
status: published
ogImage: writing/experimenting-with-flow-fields/flow-fields.jpg
cover: flow-fields.jpg
---

<style>
  .flow-field {
    display: grid;
    position: relative;
  }

  .flow-field__canvas {
    aspect-ratio: 2;
    width: 100%;
    height: auto;
  }

  .flow-field__refresh {
    position: absolute;
    right: 1em;
    bottom: 1em;
    padding: 0.5em 1em;
    cursor: pointer;
    font-family: inherit;
  }
</style>

<script src="./scripts/animated.js" type="module"></script>
<script src="./scripts/anenome.js" type="module"></script>
<script src="./scripts/traditional.js" type="module"></script>
<script src="./scripts/ebb-and-flow.js" type="module"></script>

<div class="prose__breakout">
  <figure class="figure">
    <div class="figure__content">
      <div class="flow-field flow-field--traditional">
        <canvas class="flow-field__canvas"></canvas>
        <button class="flow-field__refresh">New Pattern!</button>
      </div>
    </div>
    <figcaption class="figure__caption">
      A more "traditional" flow field
    </figcaption>
  </figure>
</div>

Flow fields are a technique for creating patterns in generative art.
For a long time I've been impressed by art generated using this technique
but I couldn't wrap my head around the concepts.

<div class="prose__breakout">
  <figure class="figure">
    <div class="figure__content">
      <div class="flow-field flow-field--animated">
        <canvas class="flow-field__canvas"></canvas>
        <button class="flow-field__refresh">New Pattern!</button>
      </div>
    </div>
    <figcaption class="figure__caption">
      A finished piece of animated art heavily inspired by Stanko's <a href="https://muffinman.io/art/neon/">Neon art work</a>.
    </figcaption>
  </figure>
</div>

Recently I read a couple of great articles that really helped the concepts click for me:

- Tyler Hobbs is a fantastic generative artist. [His article about flow fields](https://tylerxhobbs.com/essays/2020/flow-fields) is where I was first introduced to the concept.
- Stanko wrote [a great article](https://muffinman.io/blog/neon-generative-art-piece-made-using-2d-vector-field/)
  with illustrations that helped things finally click for me.

I experimented with these techniques and made a few generative art pieces that I'm reasonably happy with.

<div class="prose__breakout">
  <figure class="figure">
    <div class="figure__content">
      <div class="flow-field flow-field--anenome">
        <canvas class="flow-field__canvas"></canvas>
        <button class="flow-field__refresh">New Pattern!</button>
      </div>
    </div>
    <figcaption class="figure__caption">
      A piece inspired by sea anenomes
    </figcaption>
  </figure>
</div>

I'm excited to keep exploring how flow fields can be used to generate art. In particular I'm interested in:

- Improving the performance! Using lines instead of dots could make this a lot more performant...
- Using more advanced functions like Perlin noise to place the "vectors."
- Combining flow fields with other generative art techniques.
- Making some physical art pieces with a pen plotter! (Hint, hint Santa!)
- Integrating flow fields into video game logic.

<div class="prose__breakout">
  <figure class="figure">
    <div class="figure__content">
      <div class="flow-field flow-field--ebb-and-flow">
        <canvas class="flow-field__canvas"></canvas>
        <button class="flow-field__refresh">New Pattern!</button>
      </div>
    </div>
    <figcaption class="figure__caption">
      More experimentation...
    </figcaption>
  </figure>
</div>
