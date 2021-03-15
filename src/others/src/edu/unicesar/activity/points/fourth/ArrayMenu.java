/*
 * Ejercicio 4
 * Escriba una solución algorítmica que muestre y gestione el siguiente Menú:
 * 1.Llenar Vector A de manera aleatoria.
 * 2.Llenar Vector B de manera aleatoria.
 * 3.Realizar C=A+B
 * 4.Realizar C=B-A
 * 5.Mostrar VECTOR (Permitiendo al usuario elegir entre el Vector A, B, o C).
 * 6.Salir.
 *
 * NOTA.
 * El rango de los números aleatorios para los Vectores será de [-100 a 100].
 * La Cantidad de datos delos Vectores es la misma, por lo tanto,solo se
 * solicitará una vez.
 */

package edu.unicesar.activity.points.fourth;

import edu.unicesar.activity.points.fifth.Butcher;
import edu.unicesar.activity.points.third.ArrayOperations;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Scanner;
import java.util.function.BiFunction;

public class ArrayMenu {
    public static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        List<Integer> arrayA = new ArrayList<>(10);
        List<Integer> arrayB = new ArrayList<>(10);
        List<Integer> arrayC = new ArrayList<>(10);
        char choice;
        do {
            menuPrompt();
            System.out.print("\nIngrese una opción: ");
            choice = scanner.next().charAt(0);
            choiceManager(choice, arrayA, arrayB, arrayC);
        } while (true);

    }

    public static void menuPrompt() {
        System.out.print("\033\143");
        System.out.println("MENU");
        System.out.println("1. Llenar el vector A.");
        System.out.println("2. Llenar el vector B.");
        System.out.println("3. Realizar C=A+B.");
        System.out.println("4. Realizar C=A-B.");
        System.out.println("5. Mostrar vector.");
        System.out.println("6. Salir.");
    }

    public static boolean choiceManager(char choice, List<Integer> arrayA,
                                        List<Integer> arrayB, List<Integer> arrayC) {
        switch (choice) {
            case '1':
                randomize(arrayA, 10);
                break;
            case '2':
                randomize(arrayB, 10);
                break;
            case '3':
                arrayC = applyOperation(Integer::sum, arrayA, arrayB);
                break;
            case '4':
                arrayC = applyOperation((a, b) -> a - b, arrayB, arrayA);
                break;
            case '5':
                displayMenu(arrayA, arrayB, arrayC);
                break;
            case '6':
                System.exit(0);
                break;
            default:
                return false;
        }
        return true;
    }

    public static void randomize(List<Integer> array, int size) {
        Random random = new Random();
        for (int i = 0; i < size; i++) {
            array.add(random.nextInt(200) - 100);
        }
    }

    public static List<Integer> applyOperation(BiFunction<Integer, Integer, Integer> operation,
                                               List<Integer> arrayA, List<Integer> arrayB) {
        List<Integer> arrayC = new ArrayList<>();
        for (int i = 0; i < arrayA.size(); i++) {
            arrayC.add(operation.apply(arrayA.get(i), arrayB.get(i)));
        }
        return arrayC;
    }

    public static void displayMenu(List<Integer> arrayA, List<Integer> arrayB,
                                    List<Integer> arrayC) {
        char choice;
        System.out.print("\033\143");
        System.out.print("Qué vector desea mostrar?");
        System.out.print("1. vector A.");
        System.out.print("2. vector B.");
        System.out.print("3. vector C.");
        System.out.print("4. Todos.");
        choice = scanner.next().charAt(0);
        switch (choice) {
            case '1':
                ArrayOperations.displayArray(arrayA);
                break;
            default:
                System.out.println("Opción inválida.");
                break;
        }
        Butcher.keyPause();
    }
}
