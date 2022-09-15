---
title: "Raspberry Pi OS in Rust"
date: 2022-07-02
image: "images/projects/rustos.png"
code_url: "https://github.com/liamrosenfeld/rustos"
categories: ["low level", "rust"]
draft: false
blurb: "A kernel and basic operating system for a Raspberry Pi built in Rust"
---

Two years back, I had come across [a course](https://tc.gts3.org/cs3210/2020/spring/lab.html) on building an operating system for a Raspberry Pi in Rust and had saved it for later. After really enjoying my spring computer organization class, I decided it would be the perfect summer project.

The skeleton for the project made the whole endeavor a lot more accessible. Structuring and testing low-level projects are difficult to handle when getting started. The skeleton provided a largely linear progression of tasks and checkpoints to validate that there are no fundamental flaws that could go unnoticed. That was central to why I was able to build this as my first low-level project.

Building this project was a fun experience overall and a wonderful learning experience about booting, GPIO, UART, chain-loading, allocation, and Fat32 filesystems.

The two sections I enjoyed the most were implementing the GPIO wrapper and the allocator. The GPIO wrapper was nice because I built an API that used the state machine design pattern to replace previously verbose unsafe with concise, compile-time checked code. The allocator was fun because the skeleton provided a lot of freedom in the implementation. Designing and testing to reduce fragmentation in a simple allocator was an interesting and educational experience.

The project also included a very *interesting* debugging experience early on. When building the shell, I encountered my first kernel crash. After running the program with a modified version of the rust core library, I narrowed it down to the internal write function. To help diagnose the issue, I got a JLink Edu Mini, soldered an adapter, and then debugged it using OpenOCD and GDB. That’s when things got wild. Whenever running via the debugger, the issue *went away*. That was initially a very confusing result; however, looking through the steps of running the debugger led me to the root of the issue. The GDB script copied over the text section of the executable on startup. That fixing the crash made me realize it was a stack issue. The stack is above the text section in memory, and the way it was initialized caused a crash when pushing to the stack.  After some digging, I found that it was caused by my bootloader config file and linker scripts being in disagreement. A tweak to those files fixed the issue, and I had my working shell via UART.

The second major bug I encountered was with the bootloader that can load a kernel via TTY and XModem (removing the need to constantly mount and unmount the SD card). After building the bootloader, it started regularly failing. Fortunately, this time  the problem remained consistent when the debugger was attached. That allowed me to debug via GDB and find out that the issue was it was dropping data at semi-regular intervals. I ruled out the CP2102 being faulty by wiring the write to the read and sending data through it. That left the BAUD rate as the last possible cause. Decreasing it resolved the problem. This whole experience significantly improved my debugging skills within the terminal.

Because of some opportunities that arose during the second half of my summer, I have not gotten to implement multiple processes yet. However, I do plan to in the future.
