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

package punto_4;

import punto_5.Butcher;
import punto_3.ArrayOperations;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Scanner;
import java.util.function.BiFunction;

public class ArrayMenu {
    public static Scanner scanner = new Scanner(System.in);
    public static final int ARRAY_LIMIT = 20;
    public static int elementChunks = 0;

    public static void main(String[] args) {
        List<Integer> arrayA = new ArrayList<>(ARRAY_LIMIT);
        List<Integer> arrayB = new ArrayList<>(ARRAY_LIMIT);
        List<Integer> arrayC = new ArrayList<>(ARRAY_LIMIT);
        char choice;
        do {
            menuPrompt();
            System.out.print("\nIngrese una opción: ");
            choice = scanner.next().charAt(0);
            scanner.nextLine();
            choiceManager(choice, arrayA, arrayB, arrayC);
        } while (true);

    }

    public static void menuPrompt() {
        System.out.print("\033\143");
        System.out.println("\t   MENU");
        System.out.println("1. Llenar el vector A.");
        System.out.println("2. Llenar el vector B.");
        System.out.println("3. Realizar C = A + B.");
        System.out.println("4. Realizar C = B - A.");
        System.out.println("5. Mostrar vector.");
        System.out.println("6. Salir.");
    }

    public static void choiceManager(char choice, List<Integer> arrayA,
                                     List<Integer> arrayB, List<Integer> arrayC) {
        if (elementChunks == 0 && choice == '5') {
            System.out.print("\nNo hay arrays para mostrar.");
            Butcher.keyPause();
            return;
        } else if (elementChunks == 0 && choice != '6') {
            System.out.print("\nIngrese la cantidad de elementos: ");
            elementChunks = scanner.nextInt();
            scanner.nextLine();
        }
        switch (choice) {
            case '1':
                randomize(arrayA, elementChunks);
                System.out.println("\nvectorA llenado.");
                Butcher.keyPause();
                break;
            case '2':
                randomize(arrayB, elementChunks);
                System.out.println("\nvectorB llenado.");
                Butcher.keyPause();
                break;
            case '3':
                applyOperation(Integer::sum, arrayA, arrayB, arrayC);
                System.out.println("\nC = A + B.");
                Butcher.keyPause();
                break;
            case '4':
                applyOperation((a, b) -> a - b, arrayB, arrayA, arrayC);
                System.out.println("\nC = B - A.");
                Butcher.keyPause();
                break;
            case '5':
                displaySubMenu(arrayA, arrayB, arrayC);
                break;
            case '6':
                System.exit(0);
                break;
            default:
                break;
        }
    }

    public static void randomize(List<Integer> array, int size) {
        array.clear();
        Random random = new Random();
        for (int i = 0; i < size; i++) {
            array.add(random.nextInt(201) - 100);
        }
    }

    public static void applyOperation(BiFunction<Integer, Integer, Integer> operation,
                                      List<Integer> arrayA, List<Integer> arrayB,
                                      List<Integer> arrayC) {
        arrayC.clear();
        for (int i = 0; i < Math.min(arrayA.size(), arrayB.size()); i++) {
            arrayC.add(operation.apply(arrayA.get(i), arrayB.get(i)));
        }
    }

    public static void displaySubMenu(List<Integer> arrayA, List<Integer> arrayB,
                                   List<Integer> arrayC) {
        char choice;
        System.out.print("\033\143");
        System.out.println("Qué vector desea mostrar?");
        System.out.println("1. vector A.");
        System.out.println("2. vector B.");
        System.out.println("3. vector C.");
        System.out.println("4. Todos.");
        System.out.print("\nIngrese una opción: ");
        choice = scanner.next().charAt(0);
        switch (choice) {
            case '1':
                if (arrayA.size() == 0) {
                    System.out.println("El vector A no ha sido asignado.");
                    break;
                }
                System.out.println("\n\nVector A");
                ArrayOperations.displayArray(arrayA);
                break;
            case '2':
                if (arrayB.size() == 0) {
                    System.out.println("El vector B no ha sido asignado.");
                    break;
                }
                System.out.println("\n\nVector B");
                ArrayOperations.displayArray(arrayB);
                break;
            case '3':
                if (arrayC.size() == 0) {
                    System.out.println("El vector C no ha sido asignado.");
                    break;
                }
                System.out.println("\n\nVector C");
                ArrayOperations.displayArray(arrayC);
                break;
            case '4':
                if (arrayC.size() == 0) {
                    System.out.println("Todos los vectores deben ser asignados.");
                    break;
                }

                System.out.println("\n\nVector A");
                ArrayOperations.displayArray(arrayA);
                System.out.println("\n\nVector B");
                ArrayOperations.displayArray(arrayB);
                System.out.println("\n\nVector C");
                ArrayOperations.displayArray(arrayC);
                break;
            default:
                System.out.println("Opción inválida.");
                break;
        }
        Butcher.keyPause();
    }
}
