---
title: Lists/Arrays and Traversal
group: Programming Readiness
group_order: 0
order: 5
quizzes:
  - readiness-03-lists-arrays
---

This module supports **R3 and R6**. All work here is formative. Pick Java or Python and stay with it.

## Specification checklist

- [ ] I can visit every required pair or prefix with nested indexes.
- [ ] I start the inner index at `i + 1` when a pair must use two different positions.
- [ ] I get the empty-list and one-element results right.

## Traced/worked example

Target-sum with nested loops:

```java
for (int i = 0; i < nums.length; i++) {
    for (int j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] == target) return true;
    }
}
return false;
```

For `{2, 3, 5, 9, 12}` and target `5`, `i = 0`, `j = 1` finds `2 + 3` and returns true. For `{3}` and target `6`, `j` never runs, so the answer is false. If the inner loop started at `i`, `3 + 3` would incorrectly count as a pair.

## Practice

**Guided:** List every `(i, j)` pair for `{2, 0, 5, 6, 4}` with `j = i + 1`. Does any pair add to 12?

**Independent:** Implement nested-loop `targetSumNested` and `countDistinctNested`.

**Java:** [Practice.java](/starter-code/programming-readiness/module-03/Practice.java), [PracticeTest.java](/starter-code/programming-readiness/module-03/PracticeTest.java)

```bash
javac Practice.java PracticeTest.java && java PracticeTest
```

**Python:** [practice.py](/starter-code/programming-readiness/module-03/practice.py)

```bash
python3 practice.py
```

## Common mistakes

- Reusing the same index for both addends.
- Starting the distinct inner loop at `0` through `length` instead of only earlier indexes.
- Returning true for an empty list.

## Exit guidance

Complete the self-check and tests. Explain why `{3, 3}` and target `6` is true while `{3}` is false.

[Return to Programming Readiness](/resources/programming-readiness)
