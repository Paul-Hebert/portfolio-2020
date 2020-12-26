---
title: A CSS Polaroid Stack
description: Creating a stack of polaroids with a development animation and pseudo-random stacking.
subhead: With animation and pseudo-random stacking.
status: draft
date: 2020-12-03
---

Recently my girlfriend and I took our puppy to the coast for the first time. I thought it would be fun to commemorate our trip by creating a unique web page displaying our pictures as a stack of polaroids. Here's the finished product:

{% partial 'figure', '{"iframeSrc": "/experiments/polaroid-stack/"}' %}

I had to solve a few different problems to get this working how I wanted:

1. Building a polaroid layout in CSS
2. Adding polaroid "development" animation with CSS Keyframes
3. Trigger the animation when a polaroid scrolls into view
4. Create a pseudo-random stack of polaroids with `nth-child` and custom properties.
