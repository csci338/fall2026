import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Practice {
    public static boolean hasThreeOfAKind(List<Card> cards) {
        Map<String, Integer> rankCounts = new HashMap<>();
        for (Card card : cards) {
            // TODO: this overwrites instead of incrementing. Repair it using the failing tests.
            rankCounts.put(card.rank, 1);
            if (rankCounts.get(card.rank) == 3) {
                return true;
            }
        }
        return false;
    }

    public static boolean canPlaceFlowers(int[] flowerbed, int n) {
        // TODO: this loop goes one index too far. Repair it, plant without adjacent 1s, and return whether n flowers fit.
        int planted = 0;
        for (int i = 0; i <= flowerbed.length; i++) {
            boolean left = i == 0 || flowerbed[i - 1] == 0;
            boolean right = i == flowerbed.length - 1 || flowerbed[i + 1] == 0;
            if (flowerbed[i] == 0 && left && right) {
                flowerbed[i] = 1;
                planted++;
            }
        }
        return planted >= n;
    }
}
