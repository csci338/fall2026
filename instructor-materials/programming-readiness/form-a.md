# Programming Readiness Verification — Form A

**Secure instructor material**  
Suggested time: 45 minutes (40–50 minutes allowed)  
Allowed: writing tools and the provided Java reference sheet only

Name: ____________________________________  Date: __________________

Write legibly. Unless a prompt asks for a trace, write Java. You may add brief notes to clarify intent. Each section is evaluated **Satisfactory / Not Yet** under its named specification; there are no points and no averaging.

## R1 — Trace code (about 7 minutes)

Trace the code. After each list value, record `n`, `total`, and `kept`. Then give the exact printed output.

```java
int total = 1;
int kept = 0;
for (int n : List.of(3, 8, 4, 9)) {
    if (n % 2 == 0) {
        total += n;
        kept++;
    } else {
        total--;
    }
}
System.out.println(total + ":" + kept);
```

| After value `n` | `total` | `kept` |
| --- | --- | --- |
| 3 |  |  |
| 8 |  |  |
| 4 |  |  |
| 9 |  |  |

Printed output: ____________________________________________________

## R2 — Conditionals and loops (about 9 minutes)

Complete the method. Return the sum of all even ticket codes from `first` through `last`, inclusive. If `first > last`, return `0`.

Examples: `sumEvenCodes(3, 8)` returns `18`; `sumEvenCodes(5, 5)` returns `0`.

```java
public static int sumEvenCodes(int first, int last) {








}
```

## R3 — List traversal (about 8 minutes)

Complete the method. Return the number of strings whose length is at least `minimumLength`. The empty list must return `0`.

```java
public static int countLongLabels(List<String> labels, int minimumLength) {








}
```

## R4 — Set algorithm (about 10 minutes)

Complete the method. Return the **first label that appears a second time** while reading from left to right. Return `"NONE"` if no label repeats.

Examples:

- `["oak", "pine", "oak", "elm", "pine"]` returns `"oak"`
- `["oak", "pine"]` returns `"NONE"`

```java
public static String firstRepeatedLabel(List<String> labels) {










}
```

## R5 — Test and debug (about 9 minutes)

The method should count values greater than or equal to `threshold`.

```java
public static int countAtLeast(List<Integer> values, int threshold) {
    int count = 0;
    for (int i = 0; i <= values.size(); i++) {
        if (values.get(i) >= threshold) {
            count++;
        }
    }
    return count;
}
```

1. Give a representative test and expected result.

Input: _____________________________________________________________

Expected result: ___________________________________________________

2. Give an edge-case test and expected result.

Input: _____________________________________________________________

Expected result: ___________________________________________________

3. Identify the defect precisely, write the corrected line, and explain why it fixes the failure.

Defect: ____________________________________________________________

Corrected line: ____________________________________________________

Why: _______________________________________________________________

____________________________________________________________________

---

**END OF STUDENT FORM — COLLECT BEFORE DISTRIBUTING ANY KEY**

---

# Form A — Instructor Answer Key

Accept equivalent correct Java. Apply the essential criteria in `specifications-rubric.md`; do not score by matching surface syntax.

## R1 key

| After value `n` | `total` | `kept` |
| --- | ---: | ---: |
| 3 | 0 | 0 |
| 8 | 8 | 1 |
| 4 | 12 | 2 |
| 9 | 11 | 2 |

Printed output: `11:2`

## R2 key

```java
public static int sumEvenCodes(int first, int last) {
    int sum = 0;
    for (int code = first; code <= last; code++) {
        if (code % 2 == 0) {
            sum += code;
        }
    }
    return sum;
}
```

The natural zero-iteration behavior handles `first > last`.

## R3 key

```java
public static int countLongLabels(List<String> labels, int minimumLength) {
    int count = 0;
    for (String label : labels) {
        if (label.length() >= minimumLength) {
            count++;
        }
    }
    return count;
}
```

## R4 key

```java
public static String firstRepeatedLabel(List<String> labels) {
    Set<String> seen = new HashSet<>();
    for (String label : labels) {
        if (seen.contains(label)) {
            return label;
        }
        seen.add(label);
    }
    return "NONE";
}
```

`if (!seen.add(label)) return label;` is equivalent.

## R5 key

Representative example: `values = [2, 7, 7, 1], threshold = 7`, expected `2`.  
Edge example: `values = []`, expected `0` (a one-element list is also useful).

Defect: `i <= values.size()` permits index `size()`, which is outside the list.  
Corrected line:

```java
for (int i = 0; i < values.size(); i++) {
```

A Satisfactory response must pair meaningful expected results with the precise bound correction and explanation.
