---
title: Programming Practice
group: Programming
group_order: 2
order: 2
quicklink: 1
quizzes:
  - programming-readiness-diagnostic
---

This page lists resources to help you practice your programming skills. The quizzes on this site run entirely in your browser and are stored only on your computer – nothing is sent to a server or tracked.

## 1. Take the tracing quiz

The quiz is at the **bottom of this page**.

1. Click **Take Quiz**.
1. Choose Java or Python.
1. Read each short program.
1. Choose what it does.

Work on your own.

## 2. Practice these sample problems

There are so many wonderful websites that can help you practice your skills! Here are some good ones (feel free to practice Python or Java – it doesn't matter), with specific problems that map to the ideas in this project.

### CodingBat (<a href="https://codingbat.com/java" target="_blank" rel="noopener noreferrer">Java</a> · <a href="https://codingbat.com/python" target="_blank" rel="noopener noreferrer">Python</a>)

CodingBat problems are short methods. They are great for loops, arrays/lists, and maps. They do **not** practice designing your own classes (see OOP below for that).

Python only mirrors some of the Java problems (mostly under **List-2**). Map and AP problems are Java-only on CodingBat.

| Problem | Java | Python | What it evaluates |
|---------|------|--------|-------------------|
| has22 | <a href="https://codingbat.com/prob/p121853" target="_blank" rel="noopener noreferrer">Java</a> | <a href="https://codingbat.com/prob/p119308" target="_blank" rel="noopener noreferrer">Python</a> | Scan a list/array and detect a specific adjacent pair |
| countEvens | <a href="https://codingbat.com/prob/p162010" target="_blank" rel="noopener noreferrer">Java</a> | <a href="https://codingbat.com/prob/p189616" target="_blank" rel="noopener noreferrer">Python</a> | Loop + filtering: count elements that meet a condition |
| bigDiff | <a href="https://codingbat.com/prob/p196640" target="_blank" rel="noopener noreferrer">Java</a> | <a href="https://codingbat.com/prob/p184853" target="_blank" rel="noopener noreferrer">Python</a> | Track running min and max while scanning |
| twoTwo | <a href="https://codingbat.com/prob/p102145" target="_blank" rel="noopener noreferrer">Java</a> | — | Enforce a pairing rule: every occurrence of a value must have a matching neighbor |
| either24 | <a href="https://codingbat.com/prob/p191878" target="_blank" rel="noopener noreferrer">Java</a> | — | Check for one kind of adjacent pair while excluding another |
| countClumps | <a href="https://codingbat.com/prob/p193817" target="_blank" rel="noopener noreferrer">Java</a> | — | Count contiguous runs of equal values |
| maxSpan | <a href="https://codingbat.com/prob/p189576" target="_blank" rel="noopener noreferrer">Java</a> | — | Nested index comparison: largest distance between equal values |
| wordCount | <a href="https://codingbat.com/prob/p117630" target="_blank" rel="noopener noreferrer">Java</a> | — | Build a frequency map (`String` → count) while iterating |
| wordMultiple | <a href="https://codingbat.com/prob/p190862" target="_blank" rel="noopener noreferrer">Java</a> | — | Build a map of values to a boolean (“appears at least twice?”) |
| firstChar | <a href="https://codingbat.com/prob/p168493" target="_blank" rel="noopener noreferrer">Java</a> | — | Group strings by a key derived from each string (first character) |
| wordsWithoutList | <a href="https://codingbat.com/prob/p183407" target="_blank" rel="noopener noreferrer">Java</a> | — | Filter an `ArrayList` and return a new list of matching elements |
| scoresClump | <a href="https://codingbat.com/prob/p194530" target="_blank" rel="noopener noreferrer">Java</a> | — | Check whether any three consecutive values fall within a fixed range |

Suggested order: **has22** → **countEvens** → **either24** (Java) → **maxSpan** (Java) → **wordCount** (Java) → **wordMultiple** (Java) → **wordsWithoutList** (Java).

### Lists / collections (<a href="https://pynative.com/java-arraylist-exercises/" target="_blank" rel="noopener noreferrer">Java ArrayList</a> · <a href="https://pynative.com/python-list-exercise-with-solutions/" target="_blank" rel="noopener noreferrer">Python lists</a>)

| Focus | Java | Python | What it evaluates |
|-------|------|--------|-------------------|
| Iteration | <a href="https://pynative.com/java-arraylist-exercises/" target="_blank" rel="noopener noreferrer">Ex 2 – Iterating Elements</a> | <a href="https://pynative.com/python-list-exercise-with-solutions/" target="_blank" rel="noopener noreferrer">Ex 1–2 – Basic list ops</a> | Multiple ways to traverse a list |
| Search | <a href="https://pynative.com/java-arraylist-exercises/" target="_blank" rel="noopener noreferrer">Ex 7 – Search for an Element</a> | <a href="https://pynative.com/python-list-exercise-with-solutions/" target="_blank" rel="noopener noreferrer">Ex 14 – Check if list contains an item</a> | Membership testing and writing a manual search |
| Remove duplicates (with set) | <a href="https://pynative.com/java-arraylist-exercises/" target="_blank" rel="noopener noreferrer">Ex 23 – With Set</a> | <a href="https://pynative.com/python-list-exercise-with-solutions/" target="_blank" rel="noopener noreferrer">Ex 20 – Remove duplicates</a> | Using a set to recognize / eliminate repeats efficiently |
| Remove duplicates (nested loops) | <a href="https://pynative.com/java-arraylist-exercises/" target="_blank" rel="noopener noreferrer">Ex 24 – Without Set</a> | <a href="https://pynative.com/python-basic-exercise-for-beginners/" target="_blank" rel="noopener noreferrer">Ex 11 – Removing duplicates</a> | Nested-loop duplicate removal and its higher time cost |
| Frequency counting | <a href="https://pynative.com/java-arraylist-exercises/" target="_blank" rel="noopener noreferrer">Ex 26 – Frequency Counter</a> | <a href="https://pynative.com/python-list-exercise-with-solutions/" target="_blank" rel="noopener noreferrer">Ex 17 – Count occurrences</a> | Building counts of how often each element appears |

Suggested order: **iteration** → **search** → **duplicates with set** → **frequency** → **duplicates without set**.

### OOP practice (<a href="https://pynative.com/java-oop-exercises/" target="_blank" rel="noopener noreferrer">Java OOP</a> · <a href="https://pynative.com/python-object-oriented-programming-oop-exercise/" target="_blank" rel="noopener noreferrer">Python OOP</a>)

CodingBat will not ask you to invent classes. Use these for constructors, encapsulation, and inheritance.

| Focus | Java | Python | What it evaluates |
|-------|------|--------|-------------------|
| Encapsulation | <a href="https://pynative.com/java-oop-exercises/" target="_blank" rel="noopener noreferrer">Ex 1 – Book Repository</a> | <a href="https://pynative.com/python-object-oriented-programming-oop-exercise/" target="_blank" rel="noopener noreferrer">Ex 2 – Vehicle with attributes</a> | Fields + controlled access to stored data |
| Object state + validation | <a href="https://pynative.com/java-oop-exercises/" target="_blank" rel="noopener noreferrer">Ex 3 – Secure Bank Account</a> | <a href="https://pynative.com/python-object-oriented-programming-oop-exercise/" target="_blank" rel="noopener noreferrer">Ex 6 – Bank Account</a> | Rules on updates (deposit / withdraw) |
| Methods on instance data | <a href="https://pynative.com/java-oop-exercises/" target="_blank" rel="noopener noreferrer">Ex 5 – Student Grading</a> | <a href="https://pynative.com/python-object-oriented-programming-oop-exercise/" target="_blank" rel="noopener noreferrer">Ex 4 – Student average grade</a> | Instance methods that compute from an object's own data |
| Inheritance | <a href="https://pynative.com/java-oop-exercises/" target="_blank" rel="noopener noreferrer">Ex 15 – Vehicle Customization</a> | <a href="https://pynative.com/python-object-oriented-programming-oop-exercise/" target="_blank" rel="noopener noreferrer">Ex 13 – Bus inherits Vehicle</a> | Subclass extends a parent type |
| Overriding + `super` | <a href="https://pynative.com/java-oop-exercises/" target="_blank" rel="noopener noreferrer">Ex 18 – Polite Person</a> | <a href="https://pynative.com/python-object-oriented-programming-oop-exercise/" target="_blank" rel="noopener noreferrer">Ex 14 – Override with `super()`</a> | Method overriding and calling the parent version |
| Polymorphism | <a href="https://pynative.com/java-oop-exercises/" target="_blank" rel="noopener noreferrer">Ex 25 – Animal Chorus</a> | <a href="https://pynative.com/python-object-oriented-programming-oop-exercise/" target="_blank" rel="noopener noreferrer">Ex 16 – Dog & Cat `speak()`</a> | Same call, different subclass behavior |

For the midterm exam, you will be expected to understand how to write solutions that work and are efficient.

## 3. Other Coding Interview Resources
If you are interested in pursuing a software engineering type career, code interviews are – for better or for worse – the currency of the realm. Given this, I highly recommend that you dedicate some time to doing practice problems. Here are some useful resources:
* <a href="https://leetcode.com/discuss/post/460599/blind-75-leetcode-questions/" target="_blank">The Blind 75</a>
* <a href="https://www.techinterviewhandbook.org/grind75/" target="_blank">The Grind 75</a>
* <a href="https://www.youtube.com/@NeetCode/videos" target="_blank">NeetCode YouTube Channel</a>
