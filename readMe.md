# Paging and Scheduling Simulator

An interactive web-based visualization tool built to simulate **CPU Scheduling Algorithms** and **Page Replacement Algorithms**.  
Designed with an intuitive UI, dynamic visual frames, and clean modular code — this project bridges core Operating System concepts with modern web development practices.


##  Overview

This project demonstrates how fundamental OS-level algorithms work through **interactive, step-by-step simulation**.  
It provides both **CPU Scheduling** and **Memory Management (Paging)** modules, allowing users to visualize execution order, waiting times, and page faults in real time.

##  How to Run

1. Clone or download this repository.
2. Open `index.html` in any modern browser.
3. Choose a module — **Scheduling** or **Paging**.
4. Enter inputs and click **Run Simulation**.
5. Visualize step-by-step algorithm execution.


![alt text](<Index.png>)
![alt text](<CpuScheduler.png>) ![alt text](<SchedulingOutput.png>)
![alt text](<PagingExample1.png>) ![alt text](<PagingExample2.png>)

## Features

- **Dynamic Algorithm Visualization**
  - CPU Scheduling (FCFS, SJF, RR, Priority)
  - Paging (FIFO, LRU, MRU, Optimal)

- **Optimized Input Handling**
  - Accepts flexible inputs (space/comma-separated)
  - Real-time validation and error prevention

- **Clean UI / UX**
  - Responsive layout using Bootstrap 5
  - Minimal yet structured card-based design
  - Animated frame transitions for clarity

- **Scalable & Modular JavaScript**
  - Each algorithm encapsulated within logical functions
  - Easy to extend with new scheduling or paging strategies

- **Modern Frontend Stack**
  - HTML5 / CSS3 (Bootstrap)
  - JavaScript (ES6)
  - Fully client-side execution — no backend required

##  Future Enhancements

-  **Semaphores and Process Synchronization**  
  Add interactive visuals to demonstrate **wait** and **signal** operations, showing how semaphores prevent **race conditions** and manage **critical sections** in processes.

-  **Disk Scheduling Algorithms**  
  Extend the project with algorithms like **FCFS**, **SSTF**, **SCAN**, **C-SCAN**, and **LOOK**, featuring **real-time seek movement** and **track visualization** for deeper insight into disk performance.


##  Example Use Case

A Computer Science student or educator can use this simulator to:
- **Demonstrate** algorithm behavior in labs or classrooms  
- **Compare** performance of different algorithms  
- **Understand** how page faults and scheduling decisions occur step by step  


##  Algorithms Implemented

###  CPU Scheduling
- First Come First Serve (FCFS)
- Shortest Job First (SJF)
- Round Robin (RR)
- Priority Scheduling

###  Page Replacement
- FIFO (First In First Out)
- LRU (Least Recently Used)
- MRU (Most Recently Used)
- Optimal Algorithm



##  Tech Stack

| Technology | Purpose |
|-------------|----------|
| **HTML5** | Structure and layout |
| **CSS3 / Bootstrap 5** | Responsive and modern UI |
| **JavaScript (ES6)** | Algorithm logic and visualization |
| **DOM Manipulation** | Dynamic content rendering |


##  Credits

Developed by **Isha Patil**  

> Crafted with precision, logic, and design — reflecting both *technical depth* and *creative thought.*
