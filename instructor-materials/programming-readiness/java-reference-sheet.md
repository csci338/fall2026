# Java Reference Sheet

This sheet may be provided during Programming Readiness paper assessments. It contains syntax reminders, not solved target algorithms.

## Methods and variables

```java
public static int methodName(int x, String text) {
    int result = 0;
    return result;
}

boolean ready = true;
String word = "blue";
```

Common primitive types: `int`, `double`, `boolean`, `char`  
Common reference types: `String`, `List<Integer>`, `Map<String, Integer>`

## Conditionals and boolean expressions

```java
if (condition) {
    // statements
} else if (otherCondition) {
    // statements
} else {
    // statements
}
```

Comparisons: `==`, `!=`, `<`, `<=`, `>`, `>=`  
Logic: `&&` (and), `||` (or), `!` (not)  
Compare strings by content with `a.equals(b)`, not `a == b`.

## Loops

```java
for (int i = 0; i < limit; i++) {
    // use i
}

for (String item : items) {
    // use item
}

while (condition) {
    // update values used by condition
}
```

Loop controls: `break` exits the loop; `continue` starts the next iteration.

## List and ArrayList

```java
import java.util.List;
import java.util.ArrayList;

List<String> names = new ArrayList<>();
names.add("Ada");
String first = names.get(0);
names.set(0, "Grace");
int n = names.size();
boolean hasAda = names.contains("Ada");
names.remove(0);            // remove by index
```

List indices run from `0` through `size() - 1`.

## Map and HashMap

```java
import java.util.Map;
import java.util.HashMap;

Map<String, Integer> counts = new HashMap<>();
counts.put("red", 1);
int red = counts.get("red");
int blue = counts.getOrDefault("blue", 0);
boolean known = counts.containsKey("red");

for (String key : counts.keySet()) {
    int value = counts.get(key);
}
```

Useful methods: `put(key, value)`, `get(key)`, `getOrDefault(key, defaultValue)`, `containsKey(key)`, `remove(key)`, `size()`, `keySet()`.

## Set and HashSet

```java
import java.util.Set;
import java.util.HashSet;

Set<String> seen = new HashSet<>();
boolean wasNew = seen.add("oak"); // false if already present
boolean known = seen.contains("oak");
seen.remove("oak");
int n = seen.size();

for (String item : seen) {
    // use item
}
```

A set stores distinct values. Useful methods: `add(value)`, `contains(value)`, `remove(value)`, `size()`, `isEmpty()`.

## Other common methods

```java
text.length()
text.charAt(i)
text.substring(start, end) // end is excluded
text.equals(other)
text.toLowerCase()

Math.min(a, b)
Math.max(a, b)
Math.abs(x)
```

## Quick checks

- Does every non-`void` path return a value?
- Does the loop control variable change?
- For list indexing, is the index always less than `size()`?
- Is an accumulator initialized to a value appropriate for the task?
- Are empty, one-element, boundary, duplicate, and absent-value cases relevant?
