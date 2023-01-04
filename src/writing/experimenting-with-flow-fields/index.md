---
title: Experimenting With "Flow Fields"
description: Creating art with something that's not quite flow fields
subhead: Creating art with something that's not quite flow fields
date: 2023-01-03
status: published
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

<div class="prose__breakout">
  <figure class="figure">
    <div class="figure__content">
      <div class="flow-field flow-field--animated">
        <canvas class="flow-field__canvas"></canvas>
        <button class="flow-field__refresh">Refresh</button>
      </div>
    </div>
    <figcaption class="figure__caption">
      A finished piece of animated art
    </figcaption>
  </figure>
</div>

<div class="prose__breakout">
  <figure class="figure">
    <div class="figure__content">
      <div class="flow-field flow-field--anenome">
        <canvas class="flow-field__canvas"></canvas>
        <button class="flow-field__refresh">Refresh</button>
      </div>
    </div>
    <figcaption class="figure__caption">
      A piece inspired by sea anenomes
    </figcaption>
  </figure>
</div>
