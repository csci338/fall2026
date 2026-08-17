---
title: Testing and Debugging
group: Programming Readiness
group_order: 0
hide_from_list: 1
order: 8
quizzes:
  - readiness-06-debugging
---

This module supports **R5 and R6**, while reinforcing R1–R4. All work here is formative. Pick Java or Python and stay with it.

## Specification checklist

- [ ] I can write a representative test and an edge test with expected results **before** repairing code.
- [ ] I can use expected-versus-actual output to name the defective line.
- [ ] I can make one justified revision, rerun tests, and explain the cause.

## Traced/worked example

A three-of-a-kind test expects `true` for three 9s but gets `false`:

```java
rankCounts.put(card.rank, 1);
if (rankCounts.get(card.rank) == 3) return true;
```

Every put stores `1`, so the count never reaches 3. The smallest repair is increment: `getOrDefault(rank, 0) + 1`. Rerun the three-9s test and a two-9s test.

A flowerbed loop that uses `i <= flowerbed.length` reads off the end. Change it to `i < flowerbed.length`, mark planted plots, and recheck `{1, 0, 0, 0, 1}` with `n = 1` (true) and `n = 2` (false).

## Practice

**Guided:** For `hasThreeOfAKind`, write two tests first: three 9s (expected true) and two 9s (expected false). Then run the starter.

**Independent:** Repair `hasThreeOfAKind` and `canPlaceFlowers` using the supplied tests. Do not change expected values to hide a bug.

**Java:** [Practice.java](/starter-code/programming-readiness/module-06/Practice.java), [PracticeTest.java](/starter-code/programming-readiness/module-06/PracticeTest.java), [Card.java](/starter-code/programming-readiness/module-06/Card.java)

```bash
javac Practice.java PracticeTest.java Card.java && java PracticeTest
```

**Python:** [practice.py](/starter-code/programming-readiness/module-06/practice.py)

```bash
python3 practice.py
```

## Common mistakes

- Changing several lines before rerunning.
- Editing a test to match the buggy output.
- Planting next to an existing `1`, or not marking a planted plot.

## Exit guidance

For each fix, write: failing evidence, root cause, smallest revision, and which test now passes. This is practice for the typed follow-up; official Verification is scheduled separately.

[Return to Programming Readiness](/resources/programming-readiness)
