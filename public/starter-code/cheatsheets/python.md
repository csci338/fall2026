# Python cheatsheet

Syntax only. This is not a list of solved problems.

## Run a file

```bash
python3 practice.py
```

Tests in the starters live at the bottom of the file, under `if __name__ == "__main__":`.

## Variables and data types

```python
x = 10
name = "Alice"
nums = [1, 2, 3]
info = {"name": "Alice", "age": 20}
is_student = True
is_parent = False
empty = None
```

`True` and `False` are capitalized. `None` means “no value.”

## Functions

```python
def greet():
    print("Hello!")

greet()
```

With parameters:

```python
def add(a, b):
    return a + b

result = add(3, 5)          # 8
```

Default parameter:

```python
def power(base, exp=2):
    return base ** exp

power(3)                    # 9
power(3, 3)                 # 27
```

## Conditionals

```python
if x > 0:
    print("Positive")
elif x == 0:
    print("Zero")
else:
    print("Negative")

if a > 0 and b > 0:         # both
    pass
if a > 0 or b > 0:          # at least one
    pass
if not done:
    pass
```

Indentation is required. Use `==` for numbers and strings.

```python
if word == "cat":
    pass
```

## Lists

```python
nums = []
nums = [10, 20, 30, 40, 50]
nums[0]                     # 10 (first item)
nums[-1]                    # 50 (last item)
len(nums)                   # 5
```

Add or remove:

```python
nums.append(40)
nums.remove(20)             # removes the first 20
nums.pop()                  # removes last item
nums[i] = 1                 # change one slot
```

Loop through a list:

```python
for num in nums:
    print(num)

for i in range(len(nums)):
    print(nums[i])
```

Missing neighbor at an end: check the index before you read it.

```python
left_empty = (i == 0) or bed[i - 1] == 0
right_empty = (i == len(bed) - 1) or bed[i + 1] == 0
```

A loop over a list uses `range(len(bed))`, not `range(len(bed) + 1)`.

## Loops

```python
for num in [1, 2, 3]:
    print(num)

for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

count = 0
while count < 5:
    count += 1
```

Two different indexes: start the inner loop at `i + 1`.

```python
for i in range(len(nums)):
    for j in range(i + 1, len(nums)):
        # nums[i] and nums[j] are different spots
        pass
```

## Dictionaries

A dictionary stores a value for a key.

```python
grades = {"Alice": 90, "Bob": 85}
grades["Alice"]             # 90
grades["Eve"] = 95          # add or update
```

Check if a key exists:

```python
if "Bob" in grades:
    print("Bob found!")
```

Increment a count. Do not replace it with `1` every time.

```python
if rank not in counts:
    counts[rank] = 0
counts[rank] += 1

# same idea:
counts[rank] = counts.get(rank, 0) + 1
```

Append to a list stored in a dict. Do not replace the list.

```python
groups = {}
if key not in groups:
    groups[key] = []
groups[key].append(word)

# same idea:
groups.setdefault(key, []).append(word)
```

A regular `dict` keeps insertion order in current Python.

Loop:

```python
for student, score in grades.items():
    print(student, score)

for student in grades:
    print(student)

for score in grades.values():
    print(score)
```

## Sets

A set stores each value once.

```python
seen = set()
seen.add(3)
3 in seen                   # True
len(seen)
```

From a list (drops duplicates):

```python
numbers = set([1, 2, 3, 3]) # {1, 2, 3}
```

Add a number **after** you look for its partner if you must use two different spots.

```python
if (target - n) in seen:
    found = True
seen.add(n)
```

## Strings

```python
text = "hi there"
words = text.split(" ")     # ['hi', 'there']
joined = " ".join(words)    # 'hi there'
lower = text.lower()
no_space = text.replace(" ", "")
text[0]                     # 'h'
len(text)
```

Loop one character at a time:

```python
for item in text:
    print(item)
```

## Easy mix-ups

| Goal | Use |
| --- | --- |
| Length of a list or string | `len(nums)` |
| Last item | `nums[-1]` or `nums[len(nums) - 1]` |
| Same string? | `a == b` |
| Missing dict key | `d[key]` raises `KeyError`; use `in` or `.get` |
| Empty list vs missing | `[]` is empty, not `None` |
| True / False | capital T and F |
| Next index in nested loop | `range(i + 1, len(nums))` |
| Object field | `card.rank` |
