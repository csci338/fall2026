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
        check(true, Practice.isAnagram("listen", "silent"), "listen");
        check(true, Practice.isAnagram("evil", "vile"), "evil");
        check(true, Practice.isAnagram("rail safety", "fairy tales"), "ignore spaces");
        check(true, Practice.isAnagram("abc", "ab c"), "space in one side");
        check(false, Practice.isAnagram("apple", "pale"), "different counts");

        check(true, Practice.targetSumWithSet(List.of(2, 3, 5, 9, 12), 5), "2 + 3");
        check(false, Practice.targetSumWithSet(List.of(2, 0, 5, 6, 4), 12), "no pair");
        check(false, Practice.targetSumWithSet(List.of(3), 6), "do not reuse one value");
        check(false, Practice.targetSumWithSet(List.of(), 4), "empty");
        System.out.println("Passed " + tests + " tests.");
    }
}
