# Programming Readiness Verification — Form C

**Secure instructor material**  
Suggested time: 45 minutes (40–50 minutes allowed)  
Allowed: writing tools and the provided Java reference sheet only

Name: ____________________________________  Date: __________________

Write legibly. Unless a prompt asks for a trace, write Java. You may add brief notes to clarify intent. Each section is evaluated **Satisfactory / Not Yet** under its named specification; there are no points and no averaging.

## R1 — Trace code (about 7 minutes)

Trace the code. After each list value, record `minutes`, `balance`, and `credits`. Then give the exact printed output.

```java
int balance = 20;
int credits = 0;
for (int minutes : List.of(4, 7, 2, 8)) {
    if (minutes < 5) {
        balance -= minutes;
    } else {
        balance += 3;
        credits++;
    }
}
System.out.println(balance + "," + credits);
```

| After value `minutes` | `balance` | `credits` |
| --- | --- | --- |
| 4 |  |  |
| 7 |  |  |
| 2 |  |  |
| 8 |  |  |

Printed output: ____________________________________________________

## R2 — Conditionals and loops (about 9 minutes)

Complete the method. Return the product of all odd shelf numbers from `first` through `last`, inclusive. If there are no odd numbers in the range, return `1`. If `first > last`, return `1`.

Examples: `oddShelfProduct(2, 6)` returns `15`; `oddShelfProduct(4, 4)` returns `1`.

```java
public static int oddShelfProduct(int first, int last) {








}
```

## R3 — List traversal (about 8 minutes)

Complete the method. Return the first string equal to `target`, ignoring case. Return `"NONE"` if it is absent. The empty list returns `"NONE"`.

```java
public static String findLabelIgnoreCase(
        List<String> labels, String target) {








}
```

## R4 — Set algorithm (about 10 minutes)

Complete the method. Return the number of distinct zone names in `zones`.

Example: `["west", "north", "west", "east", "north"]` returns `3`; an empty list returns `0`.

```java
public static int countDistinctZones(List<String> zones) {










}
```

## R5 — Test and debug (about 9 minutes)

The method should return the first negative value, or `0` if the list has no negative value.

```java
public static int firstNegativeOrZero(List<Integer> values) {
    for (int value : values) {
        if (value <= 0) {
            return value;
        }
    }
    return 0;
}
```

1. Give a representative test and expected result.

Input: _____________________________________________________________

Expected result: ___________________________________________________

2. Give an edge-case test that exposes the defect and its expected result.

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

# Form C — Instructor Answer Key

Accept equivalent correct Java. Apply the essential criteria in `specifications-rubric.md`; do not score by matching surface syntax.

## R1 key

| After value `minutes` | `balance` | `credits` |
| --- | ---: | ---: |
| 4 | 16 | 0 |
| 7 | 19 | 1 |
| 2 | 17 | 1 |
| 8 | 20 | 2 |

Printed output: `20,2`

## R2 key

```java
public static int oddShelfProduct(int first, int last) {
    int product = 1;
    for (int shelf = first; shelf <= last; shelf++) {
        if (shelf % 2 != 0) {
            product *= shelf;
        }
    }
    return product;
}
```

## R3 key

```java
public static String findLabelIgnoreCase(
        List<String> labels, String target) {
    for (String label : labels) {
        if (label.equalsIgnoreCase(target)) {
            return label;
        }
    }
    return "NONE";
}
```

Because `equalsIgnoreCase` is not on the reference sheet, also accept `label.toLowerCase().equals(target.toLowerCase())`. The returned string must be the matching list value.

## R4 key

```java
public static int countDistinctZones(List<String> zones) {
    Set<String> distinct = new HashSet<>();
    for (String zone : zones) {
        distinct.add(zone);
    }
    return distinct.size();
}
```

## R5 key

Representative example: `values = [5, -3, -8]`, expected `-3`.  
Defect-exposing edge example: `values = [0, -4]`, expected `-4`. An all-nonnegative or empty test should expect `0` but does not alone expose the defect.

Defect: `value <= 0` treats zero as a negative value and can return it before a later negative.  
Corrected line:

```java
if (value < 0) {
```

A Satisfactory response supplies expected results, distinguishes zero from negative values, and links the correction to the failing case.
