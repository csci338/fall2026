public class PracticeTest {
    private static int tests = 0;

    private static void check(Object expected, Object actual, String name) {
        tests++;
        if (!expected.equals(actual)) {
            throw new AssertionError(name + ": expected " + expected + " but got " + actual);
        }
    }

    public static void main(String[] args) {
        check(true, Practice.canPlant(0, 0, 0), "all empty");
        check(false, Practice.canPlant(1, 0, 0), "left planted");
        check(false, Practice.canPlant(0, 0, 1), "right planted");
        check(false, Practice.canPlant(0, 1, 0), "plot already filled");

        check(true, Practice.canPlantAt(new int[]{0, 0, 1}, 0), "left edge");
        check(false, Practice.canPlantAt(new int[]{1, 0, 0, 0, 1}, 1), "touches a flower");
        check(true, Practice.canPlantAt(new int[]{1, 0, 0, 0, 1}, 2), "middle gap");
        check(true, Practice.canPlantAt(new int[]{0, 0}, 1), "right edge empty");
        System.out.println("Passed " + tests + " tests.");
    }
}
