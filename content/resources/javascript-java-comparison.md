---
title: "JavaScript vs Java: Quick Reference"
group: Programming
group_order: 2
order: 3
quicklink: 1
heading_max_level: 3
---

## Goal
Compare JavaScript syntax and concepts to what you know from Java, focusing on key differences that commonly trip up Java developers.

## Quick Reference

| Topic | Description |
|-------|-------------|
| [Variable Declarations](#1-variable-declarations) | `let`, `const` vs Java types |
| [Function Syntax](#2-function-syntax) | Function declarations and arrow functions |
| [Equality Operators](#3-equality-operators) | `==` vs `===` (use `===`!) |
| [Loops](#4-loops) | Similar to Java, but with `let` |
| [Arrays](#5-arrays) | Dynamic arrays with mixed types |
| [String Formatting](#6-string-formatting) | Template literals vs format strings |
| [Practice Exercises](#practice-exercises) | Hands-on conversion exercises |
| [Common Pitfalls](#common-pitfalls-for-java-developers) | Things to watch out for |

## Key Differences Overview

### 1. Variable Declarations <a id="1-variable-declarations"></a>

**Java:**
```java
int age = 25;
String name = "Alice";
final int MAX_SIZE = 100;  // constant
```

**JavaScript:**
```javascript
let age = 25;              // can be reassigned
const name = "Alice";       // cannot be reassigned (like Java's final)
const MAX_SIZE = 100;       // constant
```

**Key Points:**
- JavaScript uses `let` and `const` (not `var` in modern code)
- No type declarations - JavaScript is dynamically typed
- `const` means the variable cannot be reassigned (but object properties can change)

### 2. Function Syntax <a id="2-function-syntax"></a>

**Java:**
```java
public static int add(int a, int b) {
    return a + b;
}
```

**JavaScript (Function Declaration):**
```javascript
function add(a, b) {
    return a + b;
}
```

**JavaScript (Arrow Function):**
```javascript
const add = (a, b) => {
    return a + b;
};

// Or shorter:
const add = (a, b) => a + b;
```

**Key Points:**
- No return type or parameter types
- Function declarations are "hoisted" (can be called before they're defined)
- Arrow functions are NOT hoisted

### 3. Equality Operators <a id="3-equality-operators"></a>

**Java:**
```java
if (a == b) { }  // compares values (primitives) or references (objects)
```

**JavaScript:**
```javascript
if (a == b) { }   // loose equality (type coercion)
if (a === b) { }  // strict equality (no type coercion) - USE THIS!
```

**Examples:**
```javascript
5 == "5"   // true (type coercion)
5 === "5"  // false (strict comparison)

null == undefined   // true
null === undefined  // false
```

**Key Point:** Always use `===` unless you have a specific reason to use `==`.

### 4. Loops <a id="4-loops"></a>

**Java:**
```java
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
```

**JavaScript:**
```javascript
for (let i = 0; i < 10; i++) {
    console.log(i);
}
```

**Key Points:**
- Very similar syntax!
- Use `let` instead of type declaration
- `console.log()` instead of `System.out.println()`

### 5. Arrays <a id="5-arrays"></a>

**Java:**
```java
int[] numbers = {1, 2, 3};
String[] names = new String[5];
```

**JavaScript:**
```javascript
const numbers = [1, 2, 3];
const names = [];  // empty array
```

**Key Points:**
- Arrays are objects in JavaScript (not a separate type)
- Arrays can hold mixed types: `[1, "hello", true]`
- Arrays are dynamic (no fixed size)

### 6. String Formatting <a id="6-string-formatting"></a>

**Java:**
```java
String name = "Alice";
int age = 25;
String message = String.format("Hi, I'm %s and I'm %d years old.", name, age);
// Or using printf-style:
System.out.printf("Hi, I'm %s and I'm %d years old.%n", name, age);
```

**JavaScript (Template Literals):**
```javascript
const name = "Alice";
const age = 25;
const message = `Hi, I'm ${name} and I'm ${age} years old.`;
```

**Key Points:**
- JavaScript uses template literals (backticks `` ` ``) instead of format strings
- Variables are embedded using `${variableName}`
- Template literals can span multiple lines
- Expressions can be used inside `${}`: `` `Result: ${a + b}` ``

## Practice Exercises <a id="practice-exercises"></a>

### Exercise 1: Convert Java to JavaScript

Convert the following Java code to JavaScript:

**Java:**
```java
public class Calculator {
    public static int multiply(int a, int b) {
        return a * b;
    }
    
    public static void main(String[] args) {
        int result = multiply(5, 3);
        System.out.println("Result: " + result);
    }
}
```

**JavaScript:**

<button data-toggle-answer="answer-1" class="bg-blue-500 hover:bg-blue-600 text-white border-0 px-4 py-2 rounded cursor-pointer mb-2 transition-colors duration-200">Show Answer</button>
<div id="answer-1" class="bg-green-50 rounded mt-2 mb-4 px-4 transition-all duration-[400ms] ease-out">

```javascript
function multiply(a, b) {
    return a * b;
}

const result = multiply(5, 3);
console.log("Result: " + result);
```

Or using an arrow function:
```javascript
const multiply = (a, b) => a * b;
const result = multiply(5, 3);
console.log("Result: " + result);
```
</div>

### Exercise 2: Type Coercion

What will each of these print? (Try to figure it out before running the code!)

```javascript
console.log(5 == "5");
console.log(5 === "5");
console.log(0 == false);
console.log(0 === false);
console.log(null == undefined);
console.log(null === undefined);
```

<button data-toggle-answer="answer-2" class="bg-blue-500 hover:bg-blue-600 text-white border-0 px-4 py-2 rounded cursor-pointer mb-2 transition-colors duration-200">Show Answers</button>
<div id="answer-2" class="bg-green-50 rounded mt-2 mb-4 px-4 transition-all duration-[400ms] ease-out">

```javascript
console.log(5 == "5");        // true (type coercion)
console.log(5 === "5");      // false (strict equality)
console.log(0 == false);     // true (type coercion)
console.log(0 === false);    // false (strict equality)
console.log(null == undefined);  // true (special case)
console.log(null === undefined); // false (strict equality)
```
</div>

### Exercise 3: Function Hoisting

What will this code print?

```javascript
console.log(add(2, 3));

function add(a, b) {
    return a + b;
}
```

What about this?

```javascript
console.log(subtract(5, 2));

const subtract = (a, b) => a - b;
```

<button data-toggle-answer="answer-3" class="bg-blue-500 hover:bg-blue-600 text-white border-0 px-4 py-2 rounded cursor-pointer mb-2 transition-colors duration-200">Show Answers</button>
<div id="answer-3" class="bg-green-50 rounded mt-2 mb-4 px-4 transition-all duration-[400ms] ease-out">

First example prints `5` - function declarations are hoisted, so they can be called before they're defined.

Second example throws an error - arrow functions are NOT hoisted, so you can't call them before they're defined.
</div>

## Common Pitfalls for Java Developers <a id="common-pitfalls-for-java-developers"></a>

1. **Forgetting `===`**: Always use strict equality (`===`) unless you specifically need type coercion
2. **Type assumptions**: JavaScript variables can change types - don't assume a variable stays the same type
3. **Array vs Object**: Arrays are objects in JavaScript, which can be confusing
4. **No access modifiers**: JavaScript doesn't have `public`, `private`, `protected` - everything is accessible
