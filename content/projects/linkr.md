---
title: "Linkr"
date: 2020-07-01
image: "images/projects/linkr.png"
code_url: "https://github.com/liamrosenfeld/linkr"
categories: ["web", "rust"]
draft: false
blurb: "A modern self-hosted URL Shortener for both individuals and organizations that’s easy to set up and use."
---

A modern self-hosted URL Shortener for both individuals and organizations that’s easy to set up and use.

Before this project, I had been learning Rust but wanted to start a full project with it. Around that time, I was looking through self-hosted URL shorteners and found that they all had convoluted setup processes that were problematic for any non-developer. I decided to try to make my own to both do a project in Rust and to fill that gap.

I first planned the user experience during setup and then worked backwards. Writing a web server in Rust using the Rocket framework met my requirements. Rocket is a younger project so there isn't as many resources out yet; however, they greatly make up for that in a helpful community.

There are still more features to add, but the project has a fully functional and solid foundation.

The project is currently being used by Full Sail University to allow them to quickly and easily update external links across their learning management system.
