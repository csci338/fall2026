---
title: Python Practice
type: activity
draft: 1
start_date: 2026-09-17
date: 2026-09-17
---

This is **Practice**, not Programming Readiness Verification. Complete or review the corresponding Java solution first; then translate the same reasoning into Python so you can separate programming concepts from language syntax. If your Java readiness work is still incomplete, prioritize your assigned Java remediation module before this activity.

For each exercise:

1. Trace the Java version with one example.
1. Confirm that you can explain the Java logic.
1. Translate it into Python.
1. Run at least two tests in each language and compare the results.


## 1. Python Basics vs Java

### 1.1. Hello World
Write the equivalent in Python:

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```

**Answer:**
In Python, the whole program is just:
```py
print('Hello world!')
```
No class, no main, no semicolons -- just one line.

### 1.2. Variables & Types
Write the equivalent in Python:

```java
int x = 5;
double y = 3.14;
String name = "Alice";
boolean isHappy = true;
```

### 1.3. Exercise
Write a program that takes a string and counts the number of vowels in it.


## 2. Functions & Control Flow

### 2.1. Factorial
Write the equivalent in Python:

```java
public static int factorial(int n) {
    if (n <= 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
```

### 2.2. FizzBuzz
Write the equivalent in Python:

```java
for (int i = 1; i <= 20; i++) {
    if (i % 15 == 0) {
        System.out.println("FizzBuzz");
    } else if (i % 3 == 0) {
        System.out.println("Fizz");
    } else if (i % 5 == 0) {
        System.out.println("Buzz");
    } else {
        System.out.println(i);
    }
}
```

### 2.3. For Each Loop
Translate this into Python using a for ... in loop:

```java
String[] fruits = {"apple", "banana", "cherry"};

for (String fruit : fruits) {
    System.out.println(fruit.toUpperCase());
}
```

### 2.4. Classic For Loop
Translate this into Python using a for loop with the `range()` function:

```java
for (int i = 0; i < 10; i++) {
    System.out.println("Number: " + i);
}
```

### 2.5. Exercise

Write a function that takes a list of numbers and returns a list of their squares.
(Do it once with a loop, once with a comprehension.)

## 3. Objects & Classes
### 3.1. Simple Class
Translate this into a Python class.

```java
public class Car {
    private String make;
    private String model;

    public Car(String make, String model) {
        this.make = make;
        this.model = model;
    }

    public void drive() {
        System.out.println("Driving " + make + " " + model);
    }
}
```

### 3.2. Inheritance
Translate into Python with inheritance:

```java
public class ElectricCar extends Car {
    private int batteryLife;

    public ElectricCar(String make, String model, int batteryLife) {
        super(make, model);
        this.batteryLife = batteryLife;
    }

    public void charge() {
        System.out.println("Charging the car...");
    }
}
```

### 3.3. Exercise
Create a BankAccount class with methods:

```java
deposit(amount)
withdraw(amount)
getBalance()
```

## 4. Testing and Debugging Across Languages
Choose one function from Section 2 and intentionally introduce an off-by-one or incorrect-condition bug.

1. Write a test that exposes the bug in Java.
1. Write the equivalent test in Python.
1. Record the expected and actual results.
1. Repair both versions.
1. Explain which part of the reasoning transferred directly and which syntax changed.

This activity helps prepare you for R5 and R6, but only the individual paper Verification can earn a Satisfactory mark.


## Midterm Exam Study Questions
Each challenge can be solved with nested loops, but a **dictionary-based solution** will be much more efficient. You should be able to implement the solutions to these practice problems using both the nested loop and the dictionary solution (but the latter is more efficient):

1. **Word Frequency Counter:**<br>Given a paragraph of text, count how many times each word appears.  
    - **Naive way:** For each word, loop through the list to count occurrences.  
    - **Efficient way:** Use a dictionary with words as keys and counts as values.  


1. **First Duplicate Finder:**<br>Given a list of integers, find the first number that repeats.  
    - **Naive way:** Nested loops checking every pair.  
    - **Efficient way:** Keep a dictionary of numbers seen so far.  


1. **Anagram Checker:**<br>Given two strings, check if they are anagrams of each other.  An anagram is a word or phrase formed by rearranging the letters of another word or phrase, using all the original letters exactly once. Examples:
- "listen" → "silent"
- "evil" → "vile"
- "rail safety" → "fairy tales" 

1. **Student Grades:**<br>You are given a list of `(student, grade)` pairs. Compute the average grade for each student.  
- **Naive way:** For each student, scan the entire list for all their grades.  
- **Efficient way:** Use a dictionary mapping student → list (or sum/count).  


1. **Two-Sum Problem:**<br>Given a list of numbers and a target, find two numbers that add up to the target.  
- **Naive way:** Check all pairs with nested loops.  
- **Efficient way:** Use a dictionary to store numbers seen and check complements.  


1. **Inventory Management:**<br>You have two lists:  
    - `items = ["apple", "banana", "apple", "orange", "banana", "apple"]`  
    - `prices = {"apple": 2, "banana": 1, "orange": 3}`  

    Compute the **total cost** of the shopping list.  
  

1. **Character Frequency Histogram:**<br>Given a string, produce a dictionary showing how many times each character appears.  


1. **Course Enrollment:**<br>You have a list of `(student, course)` pairs. Build a dictionary mapping each course → list of students enrolled.  

1. **Common Elements in Two Lists:**<br>Find the elements that appear in both lists.  

1. **Most Frequent Number:**<br>Given a list of integers, find the number that occurs most frequently.  


