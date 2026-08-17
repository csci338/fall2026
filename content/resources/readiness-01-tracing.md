---
title: Java Methods and Conditionals
group: Programming Readiness
group_order: 0
hide_from_list: 1
order: 3
quizzes:
  - readiness-01-tracing
---

This module supports **R1, R2, and R6**. All work here is formative. Pick Java or Python and stay with it.

## Specification checklist

- [ ] I can write a helper whose boolean conditions match a stated rule.
- [ ] I can treat a missing neighbor at an array edge as empty.
- [ ] I can trace which call returns true or false and explain why.

## Traced/worked example

A plot can hold a flower only when it and both neighbors are `0`. Missing neighbors at the ends count as `0`.

```java
static boolean canPlant(int prev, int curr, int next) {
    return curr == 0 && prev == 0 && next == 0;
}
```

`canPlant(1, 0, 0)` is false because the left neighbor is already planted. `canPlant(0, 0, 0)` is true.

For `bed = {1, 0, 0, 0, 1}` at index 1, `prev` is `1`, so that plot cannot be planted even though it is empty.

## Practice

**Guided:** Trace `canPlant` for `(0,0,0)`, `(1,0,0)`, `(0,1,0)`, and `(0,0,1)`.

**Independent:** Implement `canPlant` and `canPlantAt`. `canPlantAt` should read neighbors from the array and treat missing edges as `0`.

**Java:** [Practice.java](/starter-code/programming-readiness/module-01/Practice.java), [PracticeTest.java](/starter-code/programming-readiness/module-01/PracticeTest.java)

```bash
javac Practice.java PracticeTest.java && java PracticeTest
```

**Python:** [practice.py](/starter-code/programming-readiness/module-01/practice.py)

```bash
python3 practice.py
```

## Common mistakes

- Forgetting that an already filled plot (`curr == 1`) cannot be planted.
- Using `bed[-1]` or skipping the edge instead of treating a missing neighbor as `0`.
- Checking only one side.

## Exit guidance

Complete the self-check (Java or Python) and the starter tests, then explain one edge-plot decision in two sentences.

[Return to Programming Readiness](/resources/programming-readiness)
