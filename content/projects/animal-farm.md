---
title: "Animal Farm"
date: 2018-11-14
image: "images/projects/animal-farm.png"
project_url: "https://top.gg/bot/511688790994059267"
code_url: "https://github.com/liamrosenfeld/AnimalFarmBot"
categories: ["comical", "swift"]
draft: false
blurb: "A Discord bot that sends custom animal ASCII art messages"
---

A Discord bot that sends custom animal ASCII art messages. (I just really like coding ascii art generators).

I initially wrote the bot in python for a repl.it challenge, though I decided to rewrite it in Swift as I kept adding features because I find it a much more maintainable language.

The project was my first introduction to running code on a server, which presented a set of new challenges. I ended up with running it in a Docker container on Heroku.

Later on, the Discord API started changing and the community maintained Swift Discord framework wasn't keeping up with the changes so stability suffered. I submitted many pull requests patching small issues but there was a seemingly constant stream. By the end, it was crashing on every startup so I set off to completely rewrite the bot for a second time using a new framework. I chose Rust because I very much enjoyed my time writing and deploying a Dockerized web server written in it for Linkr. It also has Serenity, a very well supported discord framework.

I also took the opportunity to refocus the bot to its core functionality. Over time, I added more and more easter eggs until the eater eggs became the main features and the bot was too clunky to easily understand. I learned the lesson to carefully consider new functionality before adding it instead of after.
