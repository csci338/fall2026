def target_sum_nested(numbers, target):
    # TODO: use nested loops with j starting at i + 1. Do not reuse the same index.
    return False


def count_distinct_nested(numbers):
    # TODO: count values that have not already appeared at an earlier index.
    return 0


def check(expected, actual, name):
    if expected != actual:
        raise AssertionError(f"{name}: expected {expected} but got {actual}")


if __name__ == "__main__":
    tests = 0

    def run(expected, actual, name):
        global tests
        tests += 1
        check(expected, actual, name)

    run(True, target_sum_nested([2, 3, 5, 9, 12], 5), "2 + 3")
    run(False, target_sum_nested([2, 0, 5, 6, 4], 12), "no pair")
    run(False, target_sum_nested([], 10), "empty")
    run(False, target_sum_nested([3], 6), "one three")
    run(True, target_sum_nested([3, 3], 6), "two threes")
    run(5, count_distinct_nested([1, 3, 5, 3, 8, 5, 2]), "mixed")
    run(1, count_distinct_nested([5]), "singleton")
    run(0, count_distinct_nested([]), "empty distinct")
    print(f"Passed {tests} tests.")
