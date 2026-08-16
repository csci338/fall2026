public class PracticeTest {
    private static int tests = 0;

    private static void check(Object expected, Object actual, String name) {
        tests++;
        if (!expected.equals(actual)) {
            throw new AssertionError(name + ": expected " + expected + " but got " + actual);
        }
    }

    public static void main(String[] args) {
        check(1, Practice.countPlantable(new int[]{1, 0, 0, 0, 1}), "one middle plant");
        check(2, Practice.countPlantable(new int[]{0, 0, 0}), "plant ends, skip middle");
        check(0, Practice.countPlantable(new int[]{1, 0, 1}), "no safe plot");
        check(0, Practice.countPlantable(new int[]{}), "empty bed");
        check(2, Practice.countOccurrences(new String[]{"red", "blue", "red"}, "red"), "two reds");
        check(0, Practice.countOccurrences(new String[]{}, "red"), "no words");
        System.out.println("Passed " + tests + " tests.");
    }
}
