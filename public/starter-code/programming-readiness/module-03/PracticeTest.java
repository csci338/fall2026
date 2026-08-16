import java.util.List;

public class PracticeTest {
    private static int tests = 0;

    private static void check(Object expected, Object actual, String name) {
        tests++;
        if (!expected.equals(actual)) {
            throw new AssertionError(name + ": expected " + expected + " but got " + actual);
        }
    }

    public static void main(String[] args) {
        check(true, Practice.targetSumNested(List.of(2, 3, 5, 9, 12), 5), "2 + 3");
        check(false, Practice.targetSumNested(List.of(2, 0, 5, 6, 4), 12), "no pair");
        check(false, Practice.targetSumNested(List.of(), 10), "empty");
        check(false, Practice.targetSumNested(List.of(3), 6), "one three");
        check(true, Practice.targetSumNested(List.of(3, 3), 6), "two threes");

        check(5, Practice.countDistinctNested(List.of(1, 3, 5, 3, 8, 5, 2)), "mixed");
        check(1, Practice.countDistinctNested(List.of(5)), "singleton");
        check(0, Practice.countDistinctNested(List.of()), "empty distinct");
        System.out.println("Passed " + tests + " tests.");
    }
}
