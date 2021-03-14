/*
 * Ejercicio 2
 * Genere (aletoriamente) 20 calificaciones en un array NOTAS, muestre las notas
 * en pantalla e indique cuántos estudiantes son:
 * Deficientes[0-1]
 * Regulares[1,1 –3]
 * Buenos[3,1 –4]
 * Excelentes[4,1 –5]
 */

package edu.unicesar.activity.points;

import java.util.List;
import java.util.ArrayList;
import java.util.Random;

public class Grades {

    public static void main() {
        System.out.print("\033\143");

        System.out.println("Calificaciones Aleatorias.\n");
        List<Double> gradeList = randomGrades();
        filterGrades(gradeList);
    }

    public static List<Double> randomGrades() {
        Random random = new Random();
        List<Double> gradeList = new ArrayList<>(20);

        for (int i = 0; i < 20; i++) {
            gradeList.add(5 * random.nextDouble());
        }

        System.out.print("┌");
        liner(gradeList.size(), '┬');
        System.out.print("┐\n");

        System.out.print("│");
        gradeList.forEach(grade -> System.out.printf(" %.2f │", grade));

        System.out.print("\n└");
        liner(gradeList.size(), '┴');
        System.out.print("┘\n");

        return gradeList;
    }

    public static void liner(int size, char separator) {
        String line = new String(new char[6]).replace("\0", "─");
        for (int i = 0; i < size; i++) {
            System.out.print(line);
            if (i < size - 1) {
                System.out.print(separator);
            }
        }
    }

    public static void filterGrades(List<Double> grades) {
        Integer[] gradesFiltered = {0, 0, 0, 0};
        grades.forEach(grade -> {
            if (grade >= 4.1) {
                gradesFiltered[3]++;
            } else if (grade >= 3.1 && grade < 4.1) {
                gradesFiltered[2]++;
            } else if (grade >= 1.1 && grade < 3.1) {
                gradesFiltered[1]++;
            } else {
                gradesFiltered[0]++;
            }
        });
        System.out.println();
        System.out.println("Mapeo de notas.\n");
        System.out.printf("Deficientes: %2d\n", gradesFiltered[0]);
        System.out.printf("Regulares  : %2d\n", gradesFiltered[1]);
        System.out.printf("Buenas     : %2d\n", gradesFiltered[2]);
        System.out.printf("Excelentes : %2d\n", gradesFiltered[3]);
    }
}
