import java.util.List;
import java.util.Map;

public class DiagnosticTest {
    private static int tests = 0;

    private static void check(Object expected, Object actual, String name) {
        tests++;
        if (!expected.equals(actual)) {
            throw new AssertionError(name + ": expected " + expected + " but got " + actual);
        }
    }

    public static void main(String[] args) {
        check(
            Map.of(
                'a', List.of("apple", "ant"),
                'b', List.of("banana", "bear"),
                'c', List.of("cat")
            ),
            Diagnostic.groupByFirstLetter(List.of("apple", "ant", "banana", "bear", "cat")),
            "group by first letter"
        );
        check(Map.of(), Diagnostic.groupByFirstLetter(List.of()), "empty groups");

        check(true, Diagnostic.targetSum(List.of(2, 3, 5, 9, 12), 5), "2 + 3");
        check(true, Diagnostic.targetSum(List.of(2, 2, 5, 1, 4), 7), "2 + 5");
        check(false, Diagnostic.targetSum(List.of(2, 0, 5, 6, 4), 12), "no pair");
        check(false, Diagnostic.targetSum(List.of(), 10), "empty target sum");
        check(false, Diagnostic.targetSum(List.of(3), 6), "cannot reuse one 3");

        check(5, Diagnostic.countDistinct(List.of(1, 3, 5, 3, 8, 5, 2)), "distinct mixed");
        check(2, Diagnostic.countDistinct(List.of(0, 0, 0, 1, 1, 0, 1)), "distinct zeros");
        check(1, Diagnostic.countDistinct(List.of(5)), "one value");
        check(0, Diagnostic.countDistinct(List.of()), "empty distinct");

        Card nineH = new Card("9", "Hearts");
        Card nineD = new Card("9", "Diamonds");
        Card nineS = new Card("9", "Spades");
        Card king = new Card("K", "Clubs");
        check(true, Diagnostic.hasThreeOfAKind(List.of(nineH, nineD, nineS, king)), "three nines");
        check(false, Diagnostic.hasThreeOfAKind(List.of(nineH, nineD, king)), "only two nines");
        check(false, Diagnostic.hasThreeOfAKind(List.of()), "no cards");
        check(true, Diagnostic.hasThreeOfAKind(List.of(nineH, nineD, nineH, king, nineD, nineH)), "duplicate entries still count");

        System.out.println("Passed " + tests + " tests.");
    }
}
