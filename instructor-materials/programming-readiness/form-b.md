# Programming Readiness Verification — Form B

**Secure instructor material**  
Suggested time: 45 minutes (40–50 minutes allowed)  
Allowed: writing tools and the provided Java reference sheet only

Name: ____________________________________  Date: __________________

Write legibly. Unless a prompt asks for a trace, write Java. You may add brief notes to clarify intent. Each section is evaluated **Satisfactory / Not Yet** under its named specification; there are no points and no averaging.

## R1 — Trace code (about 7 minutes)

Trace the code. After each list value, record `reading`, `score`, and `alerts`. Then give the exact printed output.

```java
int score = 2;
int alerts = 0;
for (int reading : List.of(6, 3, 10, 5)) {
    if (reading > 5) {
        score += reading;
        alerts++;
    } else {
        score -= 2;
    }
}
System.out.println(score + "/" + alerts);
```

| After value `reading` | `score` | `alerts` |
| --- | --- | --- |
| 6 |  |  |
| 3 |  |  |
| 10 |  |  |
| 5 |  |  |

Printed output: ____________________________________________________

## R2 — Conditionals and loops (about 9 minutes)

Complete the method. Return the number of room numbers from `first` through `last`, inclusive, that are divisible by `5`. If `first > last`, return `0`.

Examples: `countCheckpointRooms(11, 25)` returns `3`; `countCheckpointRooms(7, 7)` returns `0`.

```java
public static int countCheckpointRooms(int first, int last) {








}
```

## R3 — List traversal (about 8 minutes)

Complete the method. Return the sum of all readings that are strictly below `limit`. The empty list must return `0`.

```java
public static int sumReadingsBelow(List<Integer> readings, int limit) {








}
```

## R4 — Map algorithm (about 10 minutes)

Complete the method. Return how many times `target` occurs in `codes`. Build a frequency map for the codes, then use the map to obtain the answer. An absent target returns `0`.

Example: `codes = ["N", "S", "N", "E", "N"]`, `target = "N"` returns `3`.

```java
public static int frequencyOf(List<String> codes, String target) {










}
```

## R5 — Test and debug (about 9 minutes)

The method should return the sum of every value in the list.

```java
public static int sumAll(List<Integer> values) {
    int sum = 0;
    for (int value : values) {
        sum = value;
    }
    return sum;
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

# Form B — Instructor Answer Key

Accept equivalent correct Java. Apply the essential criteria in `specifications-rubric.md`; do not score by matching surface syntax.

## R1 key

| After value `reading` | `score` | `alerts` |
| --- | ---: | ---: |
| 6 | 8 | 1 |
| 3 | 6 | 1 |
| 10 | 16 | 2 |
| 5 | 14 | 2 |

Printed output: `14/2`

## R2 key

```java
public static int countCheckpointRooms(int first, int last) {
    int count = 0;
    for (int room = first; room <= last; room++) {
        if (room % 5 == 0) {
            count++;
        }
    }
    return count;
}
```

## R3 key

```java
public static int sumReadingsBelow(List<Integer> readings, int limit) {
    int sum = 0;
    for (int reading : readings) {
        if (reading < limit) {
            sum += reading;
        }
    }
    return sum;
}
```

## R4 key

```java
public static int frequencyOf(List<String> codes, String target) {
    Map<String, Integer> frequencies = new HashMap<>();
    for (String code : codes) {
        int next = frequencies.getOrDefault(code, 0) + 1;
        frequencies.put(code, next);
    }
    return frequencies.getOrDefault(target, 0);
}
```

## R5 key

Representative example: `values = [4, -1, 3]`, expected `6`.  
Edge example: `values = []`, expected `0` (a one-element list also helps expose behavior).

Defect: `sum = value` replaces the accumulated sum on each iteration.  
Corrected line:

```java
sum += value;
```

The correction adds each value to the existing accumulator. A Satisfactory response includes meaningful expected results, the precise correction, and that causal explanation.
