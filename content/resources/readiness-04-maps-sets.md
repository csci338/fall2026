---
title: Maps/Sets and Frequency Counting
group: Programming Readiness
group_order: 0
order: 6
quizzes:
  - readiness-04-maps-sets
---

This module supports **R1, R4, and R6**. All work here is formative. Pick Java or Python and stay with it.

## Specification checklist

- [ ] I can append to a list stored in a map instead of replacing it.
- [ ] I can update a count with get-or-default plus one.
- [ ] I can trace the map after each insertion.

## Traced/worked example

```java
Map<Character, List<String>> groups = new LinkedHashMap<>();
for (String word : List.of("apple", "ant", "banana")) {
    char key = word.charAt(0);
    groups.putIfAbsent(key, new ArrayList<>());
    groups.get(key).add(word);
}
```

After `apple`: `{a=[apple]}`. After `ant`: `{a=[apple, ant]}`. After `banana`: `{a=[apple, ant], b=[banana]}`.

Replacing with `groups.put(key, List.of(word))` would leave only `ant` under `a`.

## Practice

**Guided:** Trace grouping by length for `apple`, `ant`, `banana`, `bear`, `cat`. After each word, write the map.

**Independent:** Implement `groupByFirstLetter` and `groupByLength`.

**Java:** [Practice.java](/starter-code/programming-readiness/module-04/Practice.java), [PracticeTest.java](/starter-code/programming-readiness/module-04/PracticeTest.java)

```bash
javac Practice.java PracticeTest.java && java PracticeTest
```

**Python:** [practice.py](/starter-code/programming-readiness/module-04/practice.py)

```bash
python3 practice.py
```

Python `dict` / `setdefault` matches Java `Map` / `putIfAbsent`.

## Common mistakes

- Overwriting the list for a key instead of appending.
- Using a set when you need to keep every word, not uniqueness of keys.
- Assuming hash-map iteration is sorted.

## Exit guidance

Complete the self-check and tests. Explain what one map entry represents after the five-word example.

[Return to Programming Readiness](/resources/programming-readiness)
