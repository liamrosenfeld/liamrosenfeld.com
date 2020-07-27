---
title: "Tonnetz"
date: 2019-08-24
image: "images/projects/tonnetz.png"
project_url: "https://tonnetz.liamrosenfeld.com/"
code_url: "https://github.com/liamrosenfeld/Tonnetz"
categories: ["academic", "web", music]
draft: false
blurb: "A website that visualizes concepts of Neo-Riemannian music theory"
---

My entry for the REPL.it music hackathon. It visualizes the Tonnetz, a mapping of tonal space which plays a crucial part in Neo-Riemannian theory.

Throughout my dealings with music, I've been fascinated by its underpinnings. This explores a lesser-known corner of music theory called Neo-Riemannian Theory, an alternative to the traditional Roman Numerals.

Because Neo-Riemannian Theory is lesser-known (and also possibly because it has a scary name), it is seldom taught before graduate degrees. I enjoy visualizing abstract concepts through code (as I have previously done with the Fourier Transform) so I saw this as an opportunity to visualize and explain Neo-Riemannian Theory in a way that any musician can learn and explore.

Constraints encourage new pursuits and this competition was certainly a case of that. The primary constraint was that it had to run on REPL.it which forced me to leave my comfort zone of developing for Apple platforms in Swift and build a web app to have a GUI.

The dynamic nature of JavaScript, while making it more fluid to type, has the drawbacks of being significantly less safe and self-documenting than statically typed languages (such as Swift) so I opted to use Typescript in lieu of Javascript. While it added additional hurdles during setup, I believe that the benefits I felt throughout the month of development were worth it.

Going in I knew that the lattice would require a large amount of custom geometric drawing, so I opted to build the graphical user interface using p5. It was an interesting return to P5—the javascript framework I initially learned to how to code using on Khan Academy.
