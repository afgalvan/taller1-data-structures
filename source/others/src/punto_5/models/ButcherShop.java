package punto_5.models;

import java.util.ArrayList;
import java.util.List;
// import java.util.stream.Collectors;

public class ButcherShop {
    private final List<Beef> beefList;
    private List<String> fatBeefList;

    public ButcherShop() {
        this.beefList = new ArrayList<>(100);
        this.fatBeefList = new ArrayList<>(100);
    }

    public List<Beef> getBeefList() {
        return beefList;
    }

    public void addBeef(Beef beef) {
        this.beefList.add(beef);
    }

    /* public List<String> getFatBeefList() {
        fatBeefList = beefList.stream()
            .filter(b -> b.getWeight() > 40 && b.getGenre() == 'H')
            .map(Beef::getSerialNumber)
            .collect(Collectors.toList());
        return fatBeefList;
    }*/

    public List<String> getFatBeefList() {
        fatBeefList = new ArrayList<>(10);
        for (Beef beef: beefList) {
            if (beef.getWeight() > 40 && beef.getGenre() == 'H') {
                fatBeefList.add(beef.getSerialNumber());
            }
        }
        return fatBeefList;
    }
}
