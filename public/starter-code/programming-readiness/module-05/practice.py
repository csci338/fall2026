def is_anagram(word1, word2):
    # TODO: ignore spaces and return True when the remaining letters have the same counts.
    return False


def target_sum_with_set(numbers, target):
    # TODO: use a set of values already seen. Add each number after checking for target - n.
    return False


def check(expected, actual, name):
    if expected != actual:
        raise AssertionError(f"{name}: expected {expected} but got {actual}")


if __name__ == "__main__":
    tests = 0

    def run(expected, actual, name):
        global tests
        tests += 1
        check(expected, actual, name)

    run(True, is_anagram("listen", "silent"), "listen")
    run(True, is_anagram("evil", "vile"), "evil")
    run(True, is_anagram("rail safety", "fairy tales"), "ignore spaces")
    run(True, is_anagram("abc", "ab c"), "space in one side")
    run(False, is_anagram("apple", "pale"), "different counts")
    run(True, target_sum_with_set([2, 3, 5, 9, 12], 5), "2 + 3")
    run(False, target_sum_with_set([2, 0, 5, 6, 4], 12), "no pair")
    run(False, target_sum_with_set([3], 6), "do not reuse one value")
    run(False, target_sum_with_set([], 4), "empty")
    print(f"Passed {tests} tests.")
