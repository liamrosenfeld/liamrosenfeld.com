---
title: "Animated Screen Savers"
date: 2021-06-01
image: "images/projects/animated-screen-savers.png"
code_url: "https://github.com/liamrosenfeld/AnimatedScreenSavers"
categories: ["swift", "academic"]
draft: false
blurb: "A collection of programmatic animations running as screen savers"
---

I have always enjoyed programming interesting animations because I found them to be an exciting intersection between computers and mathematics and results in some absolutely beautiful results.

However, it is hard to share those animations after they are built. When I was working on my internal cloud video screen saver, I had the idea to bundle my animations as a screen saver.

Does battery hogging animations kinda defeat the whole purpose of a screen saver? Maybe. Is it fun? Yes.

#### Chaotic Attractors

Chaotic attractors are three dimensional differential equations that while they always form a similar shape, follow very different paths with even a slight change to their initial conditions.

I started by implementing a basic diff eq approximator using Euler's method. That would produce an array of 3D points that needed to be drawn on screen. To slowly rotate, apply a gradual gradient, and then draw on screen, I used Metal Vector and Fragment shaders. This was my first time writing a shader, so it was a great learning experience.

#### Fourier Artist

This is an updated version of my [WWDC19 Scholar Submission](/projects/fourier-artist/). To improve the performance enough to run as a screen saver, I moved it from SpriteKit to CoreAnimation. In addition, I added intro and outro animations so that it would look better when playing many animations back to back as a screen saver.
