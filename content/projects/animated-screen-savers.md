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

I started by implementing a basic differential equations approximator using Euler's method. That would produce an array of 3D points that needed to be drawn on screen. To slowly rotate, apply a gradual gradient, and then draw on screen, I used Metal Vector and Fragment shaders. This was my first time writing a shader, so it was a great learning experience.

#### Fourier Artist

This is an updated version of my [WWDC19 Scholar Submission](/projects/fourier-artist/). To improve the performance enough to run as a screen saver, I moved it from SpriteKit to CoreAnimation. In addition, I added intro and outro animations so that it would look better when playing many animations back to back as a screen saver.

#### Pseudo Hilbert Curves

This project started with me, once again, amazed by the mathematical concept in [a 3Blue1Brown video](https://www.youtube.com/watch?v=3s7h2MHQtxc). I immediately wanted to explore Hilbert Curves further by implementing the finite Pseudo-Hilbert Curve myself.

Hilbert curves are recursively constructed. A square is repeatedly divided into quarters which the curve traverses. In a Pseudo-Hilbert curve, the number of those divisions is finite (and called the order of the curve). The recursive nature of the construction is what gives Hilbert curves their interesting fractal appearance while still being continuous.

Likely because I am currently taking linear algebra, I thought of the construction of the curve as a series of linear transformations on overlapping subsets of points. Because this reduced calculating the points along the curve to a series of matrix multiplications (done in parallel for each point), I wrote the calculations as a vertex shader because the GPU is optimized for those types of operations.

For the visualization, I chose to highlight another cool property of Hilbert curves: as the order increases, a percentage  distance along the curve still falls in approximately the same location. I visualized that by mapping the percentage along the curve to the hue of the color at that point. As the order increases, the colors remain in approximately the same location on the screen.

#### Maurer Roses

I came across Maurer Roses when browsing the internet one day and then immediately knew that I wanted to add them. After reading about how they are created (it jumps around a polar rose by a set angle interval), the implementation was very straightforward. This was by far the simplest animation to implement—but it is still very entertaining to watch. After observing many roses, I started noticing patterns in the values that led to disappointing shapes. I then wrote a filter for the randomly generated properties based on those observations.

#### Perlin Noise Terrain

I had wanted to create a Perlin Noise terrain mesh animation for a while. I initially used SceneKit. However, the performance of SceneKit became problematic when running as a screensaver for a large monitor. After doing other animations using metal, I had learned enough that I was eventually able to return to the animation and rewrite it in Metal. Rewriting it and using the metal debugger to fine tune the positioning and scaling greatly improved my familiarity with Metal.
