---
title: "STFT Explainer"
date: 2020-05-18
image: "images/projects/stfourier-explainer.png"
code_url: "https://github.com/liamrosenfeld/STFourierExplainer"
categories: ["academic", "swift", "WWDC"]
draft: false
blurb: "My WWDC20 Swift Student Challenge submission"
---

My WWDC20 Swift Student Challenge submission. It guides you along the creation of multiple live views that all utilize the Short Time Fast Fourier Transform and its inverse. The goal of the playground is to guide the user along a path of learning in the fields of both programming and digital signal processing.

The year prior I was lucky enough to earn a WWDC19 scholarship with a playground that used a discrete Fourier transform to draw a path using a series of orbiting epicycles. When explaining my project, the most common question I received was "what is it good for?". I would respond "well for this application? just looking cool." However, I continued learning about that area of mathematics and found how Fourier transforms apply to digital signal processing. As a member of my high school band, and general music lover, that intrigued me and I went down the rabbit hole of research.

They journey for this project was an interesting one. Like many WWDC Scholars, I would start working on my project around February in anticipation for a late March deadline. I knew I wanted to do something with digital signal processing and later became interested in Spectral Modeling Synthesis from some papers I found when doing cursory research. I first set out to create a playground that implements some SMS algorithms outlined in the papers in Swift. However, that proved to be beyond my skill level and understanding at the time and I started to hit lots of dead ends with the project.

Around that time, COVID-19 entered the international stage and the odds of a physical WWDC seemed next to none. Because of that, I decided to shelve the project with little more than a spectrogram built (though a lot of research done).

It was two weeks before AP exams (late May) that Apple announced that challenge was still on, and the due date was right smack in the middle of exams. Due to that constraint, I decided to focus and do a deeper exploration on a single topic using the research I had done in February. The topic I picked was the backbone of spectrograms: the Short Time Fast Fourier Transform.

I decided to do the project as an explorer because I learn from my prior submission that the aspect of prepared playgrounds I enjoyed the most is their educational potential. I had also spent the past year teaching a class Swift programming using Apple's curriculum which highly relied on playgrounds so I was aware of the benefit they can have in a real life setting.

One of my biggest takeaways from the project was how much I enjoyed working with Apple's Accelerate framework. I found the efficient implementation of mathematical concepts in code fascinating, and I dug into it again using the vImage section with Image to ASCII Art during my rewrite.
