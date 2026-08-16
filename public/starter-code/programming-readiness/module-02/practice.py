def count_plantable(bed):
    # TODO: walk left to right, plant when both neighbors are empty, mark the plot 1, and return how many were planted.
    return 0


def count_occurrences(words, target):
    # TODO: count how many times target appears.
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

    run(1, count_plantable([1, 0, 0, 0, 1]), "one middle plant")
    run(2, count_plantable([0, 0, 0]), "plant ends, skip middle")
    run(0, count_plantable([1, 0, 1]), "no safe plot")
    run(0, count_plantable([]), "empty bed")
    run(2, count_occurrences(["red", "blue", "red"], "red"), "two reds")
    run(0, count_occurrences([], "red"), "no words")
    print(f"Passed {tests} tests.")
