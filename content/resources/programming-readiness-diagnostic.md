---
title: Programming Readiness Diagnostic
group: Programming Readiness
group_order: 0
order: 2
quizzes:
  - programming-readiness-diagnostic
---

This is practice, not a grade.

Pick **Java or Python**. Use that language for both parts.

You will do two things:

1. Take a quiz to practice tracing.
1. Write code to answer 4 questions.

## 1. Take the tracing quiz

The quiz is at the **bottom of this page**.

1. Click **Take Quiz**.
1. Choose Java or Python.
1. Read each short program.
1. Choose what it does.

Work on your own.

## 2. Write code for 4 questions

Download the starter. Fill in each TODO. Then run the tests.

**Java:** [Diagnostic.java](/starter-code/programming-readiness/diagnostic/Diagnostic.java), [DiagnosticTest.java](/starter-code/programming-readiness/diagnostic/DiagnosticTest.java), [Card.java](/starter-code/programming-readiness/diagnostic/Card.java)

```bash
javac Diagnostic.java DiagnosticTest.java Card.java && java DiagnosticTest
```

**Python:** [diagnostic.py](/starter-code/programming-readiness/diagnostic/diagnostic.py)

```bash
python3 diagnostic.py
```

### Question A. Group words by first letter

Put each word into a list for its first letter.

Keep words in the order they appear.

Empty input → empty result.

**Java:** `groupByFirstLetter`

**Python:** `group_by_first_letter`

```
Input:  ["banana", "apple", "cat", "bear", "ant"]
Output: b → ["banana", "bear"]
        a → ["apple", "ant"]
        c → ["cat"]
```

### Question B. Target sum

You get a list of numbers and a target.

Return true if **two different spots** in the list add up to the target.

Otherwise return false.

Do not add a number to itself.

**Java:** `targetSum`

**Python:** `target_sum`

```
[2, 3, 5, 9, 12] and 5  → true   (2 + 3)
[2, 0, 5, 6, 4] and 12  → false
[3] and 6               → false
[] and 10               → false
```

### Question C. Count different numbers

Return how many **different** values are in the list.

**Java:** `countDistinct`

**Python:** `count_distinct`

```
[1, 3, 5, 3, 8, 5, 2]  → 5
[5]                    → 1
[]                     → 0
```

### Question D. Three of a kind

A `Card` has a `rank` (like `"9"` or `"K"`) and a `suit`.

Return true if any rank shows up **3 or more times**.

The `Card` class is already in the starter.

**Java:** `hasThreeOfAKind`

**Python:** `has_three_of_a_kind`

```
three 9s and one K  → true
two 9s and one K    → false
no cards            → false
```

## If something was hard

This does not count as a Satisfactory score. It only tells you what to practice.

| If this was hard | Open this next |
| --- | --- |
| Tracing loops or true/false checks | [Module 1](/resources/readiness-01-tracing) and [Module 2](/resources/readiness-02-methods-control-flow) |
| Nested loops over a list | [Module 3](/resources/readiness-03-lists-arrays) |
| Maps, grouping, or three of a kind | [Module 4](/resources/readiness-04-maps-sets) |
| Target sum | [Module 5](/resources/readiness-05-testing) |
| A test failed and you are not sure why | [Module 6](/resources/readiness-06-debugging) |
