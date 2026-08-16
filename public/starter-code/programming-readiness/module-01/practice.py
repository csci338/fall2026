def can_plant(prev, curr, next):
    # TODO: return True only when this plot and both neighbors are empty (0).
    return False


def can_plant_at(bed, i):
    # TODO: treat a missing neighbor at either edge as 0, then use can_plant.
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

    run(True, can_plant(0, 0, 0), "all empty")
    run(False, can_plant(1, 0, 0), "left planted")
    run(False, can_plant(0, 0, 1), "right planted")
    run(False, can_plant(0, 1, 0), "plot already filled")
    run(True, can_plant_at([0, 0, 1], 0), "left edge")
    run(False, can_plant_at([1, 0, 0, 0, 1], 1), "touches a flower")
    run(True, can_plant_at([1, 0, 0, 0, 1], 2), "middle gap")
    run(True, can_plant_at([0, 0], 1), "right edge empty")
    print(f"Passed {tests} tests.")
