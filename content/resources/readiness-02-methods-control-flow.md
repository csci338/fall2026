---
title: Loops, Counters, and Accumulators
group: Programming Readiness
group_order: 0
order: 4
quizzes:
  - readiness-02-methods-control-flow
---

This module supports **R1, R2, and R6**. All work here is formative. Pick Java or Python and stay with it.

## Specification checklist

- [ ] I can walk every index once and update a counter.
- [ ] I can mutate state so a later iteration sees the change.
- [ ] I can explain how many times the body runs and why.

## Traced/worked example

To plant as many flowers as possible with no two adjacent, plant from the left and **mark** each planted plot `1` so the next index sees a neighbor.

```java
int[] bed = {0, 0, 0};
int n = 0;
for (int i = 0; i < bed.length; i++) {
    boolean left = i == 0 || bed[i - 1] == 0;
    boolean right = i == bed.length - 1 || bed[i + 1] == 0;
    if (bed[i] == 0 && left && right) {
        bed[i] = 1;
        n++;
    }
}
```

Index 0 is planted (`n = 1`). Index 1 then has a left neighbor, so it is skipped. Index 2 is planted (`n = 2`). If you forget to write `1` back, every plot still looks empty and `n` becomes 3.

## Practice

**Guided:** Trace `{1, 0, 0, 0, 1}` with marking. After each `i`, write the bed and `n`.

**Independent:** Implement `countPlantable` (mark as you plant) and `countOccurrences`.

**Java:** [Practice.java](/starter-code/programming-readiness/module-02/Practice.java), [PracticeTest.java](/starter-code/programming-readiness/module-02/PracticeTest.java)

```bash
javac Practice.java PracticeTest.java && java PracticeTest
```

**Python:** [practice.py](/starter-code/programming-readiness/module-02/practice.py)

```bash
python3 practice.py
```

Copy the array before mutating if you need the original later.

## Common mistakes

- Counting a plant without marking the plot.
- Stopping the loop early instead of visiting every index.
- Off-by-one: `i <= length`.

## Exit guidance

Complete the self-check and tests. Explain why `{0, 0, 0}` plants 2 flowers, not 3.

[Return to Programming Readiness](/resources/programming-readiness)
