# Module 6: testing and debugging

Pick **Java or Python**. The starter is **broken on purpose**.

1. Run the tests. They should fail.
1. Read the error: expected vs actual.
1. Change one thing.
1. Run the tests again.

Do not change the expected values in the tests.

## Java

- `hasThreeOfAKind` — counts are wrong (it stores `1` every time)
- `canPlaceFlowers` — the loop goes one index too far

You also need `Card.java` in the same folder.

```bash
javac Practice.java PracticeTest.java Card.java && java PracticeTest
```

## Python

- `has_three_of_a_kind`
- `can_place_flowers`

```bash
python3 practice.py
```

Course page: [Module 6](/resources/readiness-06-debugging)
