---
title: "Structure of Intro Coding Classes"
date: 2020-09-07
tags: ["thoughts", "education"]
unlisted: true
---

This is an article intended to be a more specific analysis of my experiences instead of general thoughts on the subject.

## Background

Last year, I was a teacher's assistant in an AP Computer Science Principles class to help develop and implement a new curriculum. A group of twelve students volunteered to learn Swift as the programming language for the course. Using Apple’s curriculum, I taught them iOS development in Swift separate from the main class while working with the full teacher to tweak the curriculum to effectively use it in future years.

The curriculum was extremely well received by the class. Due to COVID-19 causing alternate AP exams to be used, the score distributions between years would not accurately reflect growth so we had to rely on more subjective observations. Over the span of the course, the students were highly engaged and it was an absolute joy to develop lessons for them. There were some hiccups along the way, but throughout the year we got them worked out.

## Structure

In my experience, all the lessons of an introduction to programming course seemed to fall under four categories:

- Basic programming fundamentals (if, while, variables vs constants, functions, arrays, for each, etc.)
- More advanced programming fundamentals (type systems, objects, instances, value types vs reference types, polymorphism and inheritance, etc.)
- Basic projects (ex: creating an app that has a single button that iterates a label)
- Individual more advanced projects (letting them have free reign to apply what they learned throughout the course and combine it with their creativity)

In order to prevent high achieving students from getting bored, certain subjects outside the scope of the introductory curriculum (such as generics and unsafe memory management) were available during individual projects.

The structure of the class ended up falling more into:

1. Basic programming fundamentals
2. Guided fundamental projects
3. More advanced programming fundamentals
4. Guided starter projects (+ basic source control)
5. Individual more advanced projects

(2) could have been merged with (4) with little impact on the actual material covered in the course. However, having a bit earlier provides a frame of reference and a boost in morale before getting into some harder concepts. Building an app that displays a preset image or has a single button may get old fast, but exploring it for the first time is exciting.

While separating the projects from the fundamentals is less efficient than combining them, that separation is very important to prevent presenting an overwhelming amount of new information. It is easy to lose track of how much boilerplate and complexity is present in just a new Xcode project after working with them for a while, but there is a considerable amount.

Source control was included as a necessity as we had little warning before a computer was wiped, though it quickly became a very valuable lesson for many reasons. First off, it is an often neglected topic in computer science education that is required for any involvement outside of the class. Additionally, having to summarize each change in a commit message helps students learn by having them explain it in a way someone else would understand along with helping them better understand the slow growth that goes into a full project.

## Motivation Through The Joy of Making

In my time interacting with my APCSP class, the coding club, fellow WWDC Scholars, and my general peers one thing generally drove them: making things. Whether it's programming, mechanical engineering, music, physical arts, or much more—the desire to make is a powerful one.

Harnessing the drive for individualistic creation was one of the most effective teaching strategies through the year. Very few classes give the opportunity to **make** in the way programming classes do, and embracing that desire to make helps the students learn by both engaging them and providing activities to help them learn.
