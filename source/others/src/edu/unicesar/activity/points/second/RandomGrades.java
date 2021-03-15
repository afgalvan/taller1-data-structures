/*
 * Ejercicio 2
 * Genere (aletoriamente) 20 calificaciones en un array NOTAS, muestre las notas
 * en pantalla e indique cuántos estudiantes son:
 * Deficientes[0-1]
 * Regulares[1,1 –3]
 * Buenos[3,1 –4]
 * Excelentes[4,1 –5]
 */

package edu.unicesar.activity.points.second;

import java.util.List;
import java.util.ArrayList;
import java.util.Random;

public class RandomGrades {

    public static void main(String[] args) {
        System.out.print("\033\143");

        System.out.println("Calificaciones Aleatorias.\n");
        List<Double> gradeList = randomize(20);
        displayArray(gradeList);
        filterGrades(gradeList);
    }

    public static List<Double> randomize(int size) {
        List<Double> array = new ArrayList<>(size);
        Random random = new Random();
        for (int i = 0; i < size; i++) {
            array.add(5 * random.nextDouble());
        }
        return array;
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

    public static void displayArray(List<Double> array) {
        System.out.print("┌");
        liner(array.size(), '┬');
        System.out.print("┐\n");

        System.out.print("│");
        array.forEach(element -> System.out.printf(" %.2f │", element));

        System.out.print("\n└");
        liner(array.size(), '┴');
        System.out.print("┘\n");
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
        System.out.println("\nMapeo de notas.");
        System.out.println("===============");
        System.out.printf("Deficientes: %2d\n", gradesFiltered[0]);
        System.out.printf("Regulares  : %2d\n", gradesFiltered[1]);
        System.out.printf("Buenas     : %2d\n", gradesFiltered[2]);
        System.out.printf("Excelentes : %2d\n", gradesFiltered[3]);
    }
}
