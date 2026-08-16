class Card:
    def __init__(self, rank, suit):
        self.rank = rank
        self.suit = suit


def group_by_first_letter(words):
    # TODO: map each first letter to the words that start with it, preserving encounter order.
    return {}


def target_sum(numbers, target):
    # TODO: return True if two different indexes add to target.
    return False


def count_distinct(numbers):
    # TODO: return how many unique values are in the list.
    return 0


def has_three_of_a_kind(cards):
    # TODO: return True if any rank appears at least three times.
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

    run(
        {"a": ["apple", "ant"], "b": ["banana", "bear"], "c": ["cat"]},
        group_by_first_letter(["apple", "ant", "banana", "bear", "cat"]),
        "group by first letter",
    )
    run({}, group_by_first_letter([]), "empty groups")

    run(True, target_sum([2, 3, 5, 9, 12], 5), "2 + 3")
    run(True, target_sum([2, 2, 5, 1, 4], 7), "2 + 5")
    run(False, target_sum([2, 0, 5, 6, 4], 12), "no pair")
    run(False, target_sum([], 10), "empty target sum")
    run(False, target_sum([3], 6), "cannot reuse one 3")

    run(5, count_distinct([1, 3, 5, 3, 8, 5, 2]), "distinct mixed")
    run(2, count_distinct([0, 0, 0, 1, 1, 0, 1]), "distinct zeros")
    run(1, count_distinct([5]), "one value")
    run(0, count_distinct([]), "empty distinct")

    nine_h = Card("9", "Hearts")
    nine_d = Card("9", "Diamonds")
    nine_s = Card("9", "Spades")
    king = Card("K", "Clubs")
    run(True, has_three_of_a_kind([nine_h, nine_d, nine_s, king]), "three nines")
    run(False, has_three_of_a_kind([nine_h, nine_d, king]), "only two nines")
    run(False, has_three_of_a_kind([]), "no cards")
    run(True, has_three_of_a_kind([nine_h, nine_d, nine_h, king, nine_d, nine_h]), "duplicate entries still count")

    print(f"Passed {tests} tests.")
