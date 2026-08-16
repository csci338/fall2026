import java.util.List;
import java.util.Map;

public class PracticeTest {
    private static int tests = 0;

    private static void check(Object expected, Object actual, String name) {
        tests++;
        if (!expected.equals(actual)) {
            throw new AssertionError(name + ": expected " + expected + " but got " + actual);
        }
    }

    public static void main(String[] args) {
        List<String> words = List.of("apple", "ant", "banana", "bear", "cat");
        check(
            Map.of(
                'a', List.of("apple", "ant"),
                'b', List.of("banana", "bear"),
                'c', List.of("cat")
            ),
            Practice.groupByFirstLetter(words),
            "group by letter"
        );
        check(
            Map.of(
                3, List.of("ant", "cat"),
                4, List.of("bear"),
                5, List.of("apple"),
                6, List.of("banana")
            ),
            Practice.groupByLength(words),
            "group by length"
        );
        check(Map.of(), Practice.groupByFirstLetter(List.of()), "empty letter groups");
        check(Map.of(), Practice.groupByLength(List.of()), "empty length groups");
        System.out.println("Passed " + tests + " tests.");
    }
}
