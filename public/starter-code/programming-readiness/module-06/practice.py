class Card:
    def __init__(self, rank, suit):
        self.rank = rank
        self.suit = suit


def has_three_of_a_kind(cards):
    rank_counts = {}
    for card in cards:
        # TODO: this overwrites instead of incrementing. Repair it using the failing tests.
        rank_counts[card.rank] = 1
        if rank_counts[card.rank] == 3:
            return True
    return False


def can_place_flowers(flowerbed, n):
    # TODO: this loop goes one index too far. Repair it, plant without adjacent 1s, and return whether n flowers fit.
    planted = 0
    bed = list(flowerbed)
    for i in range(len(bed) + 1):
        left = i == 0 or bed[i - 1] == 0
        right = i == len(bed) - 1 or bed[i + 1] == 0
        if bed[i] == 0 and left and right:
            bed[i] = 1
            planted += 1
    return planted >= n


def check(expected, actual, name):
    if expected != actual:
        raise AssertionError(f"{name}: expected {expected} but got {actual}")


if __name__ == "__main__":
    tests = 0

    def run(expected, actual, name):
        global tests
        tests += 1
        check(expected, actual, name)

    nine_h = Card("9", "Hearts")
    nine_d = Card("9", "Diamonds")
    nine_s = Card("9", "Spades")
    king = Card("K", "Clubs")
    run(True, has_three_of_a_kind([nine_h, nine_d, nine_s, king]), "three nines")
    run(False, has_three_of_a_kind([nine_h, nine_d, king]), "two nines")
    run(False, has_three_of_a_kind([]), "empty cards")
    run(True, has_three_of_a_kind([nine_h, nine_d, nine_h, king, nine_d, nine_h]), "duplicate cards count")
    run(True, can_place_flowers([1, 0, 0, 0, 1], 1), "one flower fits")
    run(False, can_place_flowers([1, 0, 0, 0, 1], 2), "two flowers do not")
    run(False, can_place_flowers([1, 0, 1], 1), "adjacent blocked")
    run(True, can_place_flowers([0, 0, 0], 2), "two at the ends")
    print(f"Passed {tests} tests.")
