def group_by_first_letter(words):
    # TODO: map each first letter to a list of words, preserving encounter order.
    return {}


def group_by_length(words):
    # TODO: map each word length to a list of words, preserving encounter order.
    return {}


def check(expected, actual, name):
    if expected != actual:
        raise AssertionError(f"{name}: expected {expected} but got {actual}")


if __name__ == "__main__":
    tests = 0

    def run(expected, actual, name):
        global tests
        tests += 1
        check(expected, actual, name)

    words = ["apple", "ant", "banana", "bear", "cat"]
    run(
        {"a": ["apple", "ant"], "b": ["banana", "bear"], "c": ["cat"]},
        group_by_first_letter(words),
        "group by letter",
    )
    run(
        {3: ["ant", "cat"], 4: ["bear"], 5: ["apple"], 6: ["banana"]},
        group_by_length(words),
        "group by length",
    )
    run({}, group_by_first_letter([]), "empty letter groups")
    run({}, group_by_length([]), "empty length groups")
    print(f"Passed {tests} tests.")
