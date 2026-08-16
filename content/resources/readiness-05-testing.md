---
title: Simple Algorithms and Edge Cases
group: Programming Readiness
group_order: 0
order: 7
quizzes:
  - readiness-05-testing
---

This module supports **R2, R4, R5, and R6**. All work here is formative. Pick Java or Python and stay with it.

## Specification checklist

- [ ] I can ignore spaces when comparing letter counts for an anagram.
- [ ] I can find a pair summing to a target with a seen-set, adding each value **after** the complement check.
- [ ] I can name empty, one-element, and “no pair” results before coding.

## Traced/worked example

```java
Set<Integer> seen = new HashSet<>();
for (int n : nums) {
    if (seen.contains(target - n)) return true;
    seen.add(n);
}
return false;
```

For `{2, 3, 5}` and target `5`: `2` is stored; `3` finds `2` already in the set and returns true.

For `{3}` and target `6`, `3` is not in the set yet, so `6 - 3` misses; then `3` is added. The method returns false. Adding **before** the check would treat `3 + 3` as a pair.

Anagrams: `"rail safety"` and `"fairy tales"` match once spaces are removed.

## Practice

**Guided:** Write two tests for `targetSum` before implementing: one true pair, one case that must be false (`[]` or `{3}` with target `6`).

**Independent:** Implement `isAnagram` (ignore spaces) and `targetSumWithSet`.

**Java:** [Practice.java](/starter-code/programming-readiness/module-05/Practice.java), [PracticeTest.java](/starter-code/programming-readiness/module-05/PracticeTest.java)

```bash
javac Practice.java PracticeTest.java && java PracticeTest
```

**Python:** [practice.py](/starter-code/programming-readiness/module-05/practice.py)

```bash
python3 practice.py
```

## Common mistakes

- Counting spaces as letters.
- Adding to the seen-set before looking for the complement.
- Returning true because the target itself appears in the list.

## Exit guidance

Complete the self-check and tests. Explain why `{3}` / target `6` is false in both the nested-loop and set solutions.

[Return to Programming Readiness](/resources/programming-readiness)
