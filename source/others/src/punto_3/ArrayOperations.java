/*
 * Ejercicio 3
 * Dados DOS vectores A y B de números enteros, escribir una función
 * (algoritmo en pseudocódigo y luego programa fuente), tal que:
 * 1.Almacene en un vectorC la SUMAde los datos de A y B.
 * 2.Almacene en un vectorD los números que estén tanto en A como en B
 * 3.Almacene en un arrayE, los números almacenados en el vectorA, pero ahora
 * en orden INVERSO al que están en el array A.
 */

package punto_3;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

public class ArrayOperations {
    public static Scanner scanner = new Scanner(System.in);
    public static final int ARRAY_LIMIT = 10;

    public static void main(String[] args) {
        System.out.print("\033\143");

        int size;
        do {
            System.out.printf("Ingrese la cantidad de elementos (max %d): ", ARRAY_LIMIT);
            size = scanner.nextInt();
        } while (size < 0 || size > ARRAY_LIMIT);
        // List<Integer> arrayA = generateNumbers(size);
        // List<Integer> arrayB = generateNumbers(size);
        System.out.println("Array A");
        List<Integer> arrayA = askArrayValues(size);
        System.out.println("\nArray B");
        List<Integer> arrayB = askArrayValues(size);
        List<Integer> arrayC = sumArrays(arrayA, arrayB);
        List<Integer> arrayD = intersectArrays(arrayA, arrayB);
        List<Integer> arrayE = invertArray(arrayA);

        System.out.println("Array A");
        displayArray(arrayA);
        System.out.println("\nArray B");
        displayArray(arrayB);
        System.out.println("\nArray C (Suma)");
        displayArray(arrayC);
        System.out.println("\nArray D (Intersección)");
        displayArray(arrayD);
        System.out.println("\nArray E (Array A Invertido)");
        displayArray(arrayE);
    }

    public static List<Integer> generateNumbers(int size) {
        List<Integer> array = new ArrayList<>(ARRAY_LIMIT);
        Random random = new Random();
        for (int i = 0; i < size; i++) {
            array.add(random.nextInt(11));
        }
        return array;
    }

    public static void liner(int size, char separator) {
        String line = new String(new char[5]).replace("\0", "─");
        for (int i = 0; i < size; i++) {
            System.out.print(line);
            if (i < size - 1) {
                System.out.print(separator);
            }
        }
    }

    public static void displayArray(List<Integer> array) {
        System.out.print("┌");
        liner(array.size(), '┬');
        System.out.print("┐\n");

        System.out.print("│");
        array.forEach(element -> System.out.printf("%4d │", element));
        if (array.size() == 0) {
            System.out.print("│");
        }

        System.out.print("\n└");
        liner(array.size(), '┴');
        System.out.print("┘\n");
    }

    public static List<Integer> askArrayValues(int size) {
        List<Integer> array = new ArrayList<>(ARRAY_LIMIT);
        for (int i = 0; i < size; i++) {
            System.out.print("> ");
            array.add(scanner.nextInt());
        }
        return array;
    }

    public static List<Integer> sumArrays(List<Integer> arrayA,
                                          List<Integer> arrayB) {
        List<Integer> arrayC = new ArrayList<>(ARRAY_LIMIT);
        for (int i = 0; i < arrayA.size(); i++) {
            arrayC.add(arrayA.get(i) + arrayB.get(i));
        }
        return arrayC;
    }

    public static List<Integer> intersectArrays(List<Integer> arrayA,
                                                List<Integer> arrayB) {
        List<Integer> arrayD = new ArrayList<>(ARRAY_LIMIT);
        for (Integer valueA : arrayA) {
            for (Integer valueB : arrayB) {
                if (valueA.equals(valueB)) {
                    arrayD.add(valueA);
                }
            }
        }
        return arrayD;
    }

    public static List<Integer> invertArray(List<Integer> arrayA) {
        List<Integer> arrayE = new ArrayList<>(ARRAY_LIMIT);
        for (int i = arrayE.size() - 1; i >= 0; --i) {
            arrayE.add(arrayA.get(i));
        }
        return arrayE;
    }
}
