---
title: Coding Practice in Python
type: activity
draft: 0
start_date: 2026-09-15
date: 2026-09-15
---

Here are some practice problems for the midterm exam. You are also welcome to solve these problems in Java if Java is more comfortable to you. That said, our software engineering projects will be mostly utilizing Python and JavaScript, so it's good practice to work with both languages.

{:.info}
> If your solution uses **nested loops**, there is probably a better way — often a **set** or **dictionary**. Prefer the clearer, more efficient approach when you can.

Copy a stub into a file (or a notebook cell), fill in the body, and run the two asserts.

## 1. Word frequency

Count how often each word appears. Ignore capitalization; treat punctuation as part of the word for now (split on spaces only).

```python
def word_frequency(text: str) -> dict[str, int]:
    """Return a map from lowercase word -> count."""
    pass


assert word_frequency("to be or not to be") == {"to": 2, "be": 2, "or": 1, "not": 1}
assert word_frequency("Hi hi HI") == {"hi": 3}
```

## 2. First duplicate

Return the first value that appears a second time. If none, return `None`.

```python
def first_duplicate(nums: list[int]) -> int | None:
    pass


assert first_duplicate([2, 5, 1, 2, 3, 5]) == 2
assert first_duplicate([1, 2, 3, 4]) is None
```

## 3. Anagrams

Return `True` if `a` and `b` use the same letters with the same counts (ignore spaces and capitalization).

```python
def are_anagrams(a: str, b: str) -> bool:
    pass


assert are_anagrams("listen", "silent") is True
assert are_anagrams("hello", "world") is False
```

Walkthrough: [NeetCode – Valid Anagram](https://www.youtube.com/watch?v=9UtInBqnCgA)

## 4. Student averages

Given `(student, grade)` pairs, return each student's average grade.

```python
def student_averages(pairs: list[tuple[str, float]]) -> dict[str, float]:
    pass


assert student_averages([("Ada", 90), ("Ada", 100), ("Bob", 80)]) == {"Ada": 95.0, "Bob": 80.0}
assert student_averages([("Kai", 70), ("Kai", 80), ("Kai", 90)]) == {"Kai": 80.0}
```

## 5. Two-sum

Return any two **indices** whose values add to `target`. Assume exactly one solution exists.

```python
def two_sum(nums: list[int], target: int) -> tuple[int, int]:
    pass


assert sorted(two_sum([2, 7, 11, 15], 9)) == [0, 1]
assert sorted(two_sum([3, 2, 4], 6)) == [1, 2]
```

Walkthrough: [NeetCode – Two Sum](https://www.youtube.com/watch?v=KLlXCFG5TnA)

## 6. Shopping total

```python
def shopping_total(items: list[str], prices: dict[str, int]) -> int:
    """Sum price[item] for each item in items."""
    pass


assert shopping_total(
    ["apple", "banana", "apple", "orange", "banana", "apple"],
    {"apple": 2, "banana": 1, "orange": 3},
) == 11
assert shopping_total(["orange"], {"apple": 2, "banana": 1, "orange": 3}) == 3
```

## 7. Character histogram

Count every character, including spaces.

```python
def char_histogram(s: str) -> dict[str, int]:
    pass


assert char_histogram("aab") == {"a": 2, "b": 1}
assert char_histogram("hi hi") == {"h": 2, "i": 2, " ": 1}
```

## 8. Course enrollment

Map each course to the list of students enrolled (preserve encounter order; allow duplicates if a student appears twice).

```python
def course_enrollment(pairs: list[tuple[str, str]]) -> dict[str, list[str]]:
    """pairs are (student, course)."""
    pass


assert course_enrollment([("Ada", "338"), ("Bob", "202"), ("Ada", "202")]) == {
    "338": ["Ada"],
    "202": ["Bob", "Ada"],
}
assert course_enrollment([("Kai", "101"), ("Kai", "101")]) == {"101": ["Kai", "Kai"]}
```

## 9. Common elements

Return values that appear in **both** lists (any order is fine; no duplicates in the result).

```python
def common_elements(a: list[int], b: list[int]) -> list[int]:
    pass


assert sorted(common_elements([1, 2, 2, 3], [2, 3, 4])) == [2, 3]
assert sorted(common_elements([1, 2], [3, 4])) == []
```

## 10. Most frequent

Return the integer that occurs most often. If there is a tie, return any of the tied values.

```python
def most_frequent(nums: list[int]) -> int:
    pass


assert most_frequent([1, 3, 2, 3, 1, 3]) == 3
assert most_frequent([7, 7, 1, 1, 7]) == 7
```

## Harder

### 11. Group anagrams

Group words that are anagrams of each other. Order of groups and words within a group does not matter.

```python
def group_anagrams(words: list[str]) -> list[list[str]]:
    pass


def _normalize(groups: list[list[str]]) -> list[tuple[str, ...]]:
    return sorted(tuple(sorted(g)) for g in groups)


assert _normalize(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])) == _normalize(
    [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
)
assert _normalize(group_anagrams(["a"])) == _normalize([["a"]])
```

Walkthrough: [NeetCode – Group Anagrams](https://www.youtube.com/watch?v=vzdNOK2oB2A)

### 12. First unique character

Return the first character that appears exactly once. If none, return `None`.

```python
def first_unique_char(s: str) -> str | None:
    pass


assert first_unique_char("leetcode") == "l"
assert first_unique_char("aabb") is None
```

Walkthrough: [NeetCode – First Unique Character](https://www.youtube.com/watch?v=rBENYgWy3xU)

### 13. Top-k frequent

Return the `k` most frequent numbers (any order is fine among ties).

```python
def top_k_frequent(nums: list[int], k: int) -> list[int]:
    pass


assert sorted(top_k_frequent([1, 1, 1, 2, 2, 3], 2)) == [1, 2]
assert sorted(top_k_frequent([4, 4, 4, 5], 1)) == [4]
```

Walkthrough: [NeetCode – Top K Frequent Elements](https://www.youtube.com/watch?v=YPTqKIgVk-k)

### 14. Subarray sum equals k

Return how many contiguous subarrays sum to `k`.

```python
def subarray_sum(nums: list[int], k: int) -> int:
    pass


assert subarray_sum([1, 1, 1], 2) == 2  # because [1,1] at indices 0–1 and [1,1] at indices 1–2
assert subarray_sum([1, 2, 3], 3) == 2  # because [1, 2] and [3]
```

Walkthrough: [NeetCode – Subarray Sum Equals K](https://www.youtube.com/watch?v=fFVZt-6sgyo)

### 15. Longest consecutive sequence

Return the length of the longest run of consecutive integers (order in the list does not matter). Aim for better than sorting if you can.

```python
def longest_consecutive(nums: list[int]) -> int:
    pass


assert longest_consecutive([100, 4, 200, 1, 3, 2]) == 4  # 1,2,3,4
assert longest_consecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]) == 9
```

Walkthrough: [NeetCode – Longest Consecutive Sequence](https://www.youtube.com/watch?v=P6RZZMu_maU)
