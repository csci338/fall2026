# Java cheatsheet

Syntax only. This is not a list of solved problems.

## Compile and run

Keep all `.java` files for a program in the same folder.

```bash
javac Practice.java PracticeTest.java
java PracticeTest
```

If a file uses `Card`, compile that too:

```bash
javac Practice.java PracticeTest.java Card.java && java PracticeTest
```

The class name must match the file name. `public class Practice` lives in `Practice.java`.

## Types and variables

```java
int x = 10;
boolean ok = true;          // only true or false
String name = "Alice";
int[] nums = {1, 2, 3};     // array: fixed length
char letter = 'a';          // single quotes
```

`int` is a number. `Integer` is the object version. Use `Integer` inside `List` and `Map`.

```java
List<Integer> nums;
Map<String, Integer> counts;
```

## Methods

```java
public static int add(int a, int b) {
    return a + b;
}

int result = add(3, 5);     // 8
```

`void` means the method does not return a value.

```java
public static void greet() {
    System.out.println("Hello");
}
```

## Conditionals

```java
if (x > 0) {
    System.out.println("Positive");
} else if (x == 0) {
    System.out.println("Zero");
} else {
    System.out.println("Negative");
}

if (a > 0 && b > 0) { }     // both
if (a > 0 || b > 0) { }     // at least one
if (!done) { }              // not
```

Compare numbers with `==`. Compare strings with `.equals`:

```java
if (word.equals("cat")) { }
if (!word.equals("cat")) { }
```

## Arrays

```java
int[] bed = {1, 0, 0, 0, 1};
bed[0];                     // 1 (first item)
bed[bed.length - 1];        // 1 (last item)
bed.length;                 // 5
bed[i] = 1;                 // change one slot
```

Missing neighbor at an end: check the index before you read it.

```java
boolean leftEmpty = (i == 0) || bed[i - 1] == 0;
boolean rightEmpty = (i == bed.length - 1) || bed[i + 1] == 0;
```

A loop over an array uses `< length`, not `<= length`.

```java
for (int i = 0; i < bed.length; i++) { }
```

## Lists

```java
import java.util.ArrayList;
import java.util.List;

List<String> words = new ArrayList<>();
words.add("apple");
words.get(0);               // "apple"
words.size();               // length
words.isEmpty();
```

Loop by item or by index:

```java
for (String word : words) { }
for (int i = 0; i < words.size(); i++) {
    String word = words.get(i);
}
```

`List.of("a", "b")` makes a short list you should not change.

## Loops

```java
for (int i = 0; i < 5; i++) { }     // 0, 1, 2, 3, 4

int count = 0;
while (count < 5) {
    count++;
}
```

Two different indexes: start the inner loop at `i + 1`.

```java
for (int i = 0; i < nums.size(); i++) {
    for (int j = i + 1; j < nums.size(); j++) {
        // nums.get(i) and nums.get(j) are different spots
    }
}
```

## Maps

A map stores a value for a key.

```java
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

Map<String, Integer> counts = new HashMap<>();
counts.put("9", 1);
counts.get("9");            // 1, or null if missing
counts.containsKey("9");
counts.size();
```

`LinkedHashMap` keeps the order keys were first added. Use that when order matters.

Increment a count. Do not replace it with `1` every time.

```java
if (!counts.containsKey(rank)) {
    counts.put(rank, 0);
}
counts.put(rank, counts.get(rank) + 1);

// same idea:
counts.put(rank, counts.getOrDefault(rank, 0) + 1);
```

Append to a list stored in a map. Do not replace the list.

```java
Map<Character, List<String>> groups = new LinkedHashMap<>();
if (!groups.containsKey(key)) {
    groups.put(key, new ArrayList<>());
}
groups.get(key).add(word);

// same idea:
groups.putIfAbsent(key, new ArrayList<>());
groups.get(key).add(word);
```

Loop:

```java
for (String key : counts.keySet()) { }
for (Integer value : counts.values()) { }
for (Map.Entry<String, Integer> entry : counts.entrySet()) {
    String key = entry.getKey();
    Integer value = entry.getValue();
}
```

## Sets

A set stores each value once.

```java
import java.util.HashSet;
import java.util.Set;

Set<Integer> seen = new HashSet<>();
seen.add(3);
seen.contains(3);           // true
seen.size();
```

Add a number **after** you look for its partner if you must use two different spots.

## Strings

```java
String text = "hi there";
text.length();
text.charAt(0);             // 'h'
text.toLowerCase();
text.replace(" ", "");      // "hithere"
text.equals("hi there");
```

A `char` is one letter. A `String` is text.

```java
char first = word.charAt(0);
String rank = card.rank;    // if rank is a String field
```

## Easy mix-ups

| Goal | Use |
| --- | --- |
| Array length | `bed.length` (no `()`) |
| List length | `words.size()` |
| String length | `text.length()` |
| Same string? | `a.equals(b)` |
| Same number? | `a == b` |
| Missing map key | `get` returns `null` |
| Empty list vs missing | `new ArrayList<>()` is empty, not `null` |
| Last index | `length - 1` or `size() - 1` |
| Next index in nested loop | `j = i + 1` |
