---
title: "Image To ASCII Art"
date: 2017-12-30
image: "images/projects/ascii-art.png"
project_url: "https://apps.apple.com/us/app/image-to-ascii-art/id1329402459"
code_url: "https://github.com/liamrosenfeld/Image-to-Ascii-Art"
categories: ["native", "swift"]
draft: false
blurb: "An iOS app that converts images to ASCII art"
---

My first iOS app. It can turn any image into a representation fully constructed of ASCII characters. It was my first introduction to the Swift language and the Apple ecosystem as a whole.

In fall of 2017 I started working on the app because I wanted to build something for a device that I use every day: an iPhone. I don't exactly remember what gave me the idea but after researching the topic, I wrote a (naively implemented) ASCII conversion algorithm and a basic interface. Over the next couple months I worked on making the interface pleasant to use along with creating in iMessage extension to make the generated ASCII Art easier to share.

The iMessage extension presented one of the first technical roadblocks I encountered when making apps. The iMessage extension URL that was sent had a character limit that the art far exceeded. I solved that by using firebase to store the text and then passing a key to access it in the message. While that would now be a pretty simple solution, it was a pretty impactful experience as I was starting off development. It taught me to always look for alternate solutions because sometimes those are the only ones where it is feasible.

When working on my Short Time Fourier Explainer scholarship project, I was exposed to the Accelerate vDSP framework for the first time. I was fascinated by the amount of math it could do extremely efficiently, so after the project I started trying out the Accelerate vImage framework.

At that same time I wanted to learn SwiftUI. I had wanted to learn it ever since watching it announced at WWDC19 and decided rewriting the interface of a simpler project would be the perfect time to do so.

With my intentions set to make the app even better and learn new things, I started work on the new version. It was a lot of fun and I am very happy with the result. The interface felt a lot smoother and the conversion process was 552% faster. The interface being in SwiftUI even allowed it to also run on macOS after writing just a few AppKit shims.

One of the technical elements of the rewrite I am most proud of is the code that counts how many white pixels are in an image. That process is necessary to create the "palette" of ASCII symbols used to represent different shades of gray. I implemented that by combining all the channels into the blue channel and then calculating a histogram of that image. The function to do that can be seen [here](https://github.com/liamrosenfeld/Image-to-Ascii-Art/blob/c67f1240b76d2cfceb3751e874eec039ce68d73a/Shared/AsciiConverter/AsciiPalette.swift#L32).

Creating and then updating Image to ASCII Art has provided a really fun way to learn new frameworks, learn new math, and to create a fun app over many years.
