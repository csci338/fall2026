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
        Card nineH = new Card("9", "Hearts");
        Card nineD = new Card("9", "Diamonds");
        Card nineS = new Card("9", "Spades");
        Card king = new Card("K", "Clubs");
        check(true, Practice.hasThreeOfAKind(List.of(nineH, nineD, nineS, king)), "three nines");
        check(false, Practice.hasThreeOfAKind(List.of(nineH, nineD, king)), "two nines");
        check(false, Practice.hasThreeOfAKind(List.of()), "empty cards");
        check(true, Practice.hasThreeOfAKind(List.of(nineH, nineD, nineH, king, nineD, nineH)), "duplicate cards count");

        check(true, Practice.canPlaceFlowers(new int[]{1, 0, 0, 0, 1}, 1), "one flower fits");
        check(false, Practice.canPlaceFlowers(new int[]{1, 0, 0, 0, 1}, 2), "two flowers do not");
        check(false, Practice.canPlaceFlowers(new int[]{1, 0, 1}, 1), "adjacent blocked");
        check(true, Practice.canPlaceFlowers(new int[]{0, 0, 0}, 2), "two at the ends");
        System.out.println("Passed " + tests + " tests.");
    }
}
