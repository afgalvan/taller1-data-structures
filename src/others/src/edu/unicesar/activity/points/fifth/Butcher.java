/*
 * Ejercicio 5.
 * El frigorífico de carnes de res “Camagüey” ubicado en Cartagena necesita
 * computarizar las medidas de las reses almacenadas allí. Por cada res se deben
 * almacenar los siguientes datos:
 *
 * –Número de serie: Cadena de caracteres
 * –Edad: Aleatoria en un rango entre 1 y 10
 * –Sexo: Si es macho (M) o hembra (H)
 * –Peso: En kilos
 * El frigorífico tiene una capacidad para recibir como máximo 100 reses.
 * Los  estudiantes  del  profesor  Braulio  debenrealizar  un  algoritmo
 * que  permita  ingresar  dicha información en un Array de Registros y validar
 * la información.
 * Luego,almacenaren un nuevo arreglo(simple)los números de series de todas las
 * reseshembras obesas (peso>40kg)y  mostrar  el  arreglo  con  los  números
 * de  serie.  En  caso  que  no  tuviera hembras obesas mostrar el mensaje
 * correspondiente.
 */

package edu.unicesar.activity.points.fifth;

import edu.unicesar.activity.points.fifth.models.Beef;
import edu.unicesar.activity.points.fifth.models.ButcherShop;

import java.io.IOException;
import java.util.List;
import java.util.Random;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Butcher {
    public static Scanner scanner = new Scanner(System.in);

    public static void main() {
        ButcherShop butcherShop = new ButcherShop();
        System.out.print("\033\143");
        do {
            menuPrompt();
        } while (choiceManager(butcherShop) != '0');
    }

    public static void menuPrompt() {
        System.out.print("\033\143");
        System.out.println("REGISTRO DE RESES");
        System.out.println("========================\n");
        System.out.println("1. Registrar nueva res.");
        System.out.println("2. Mostrar reses obesas.");
        System.out.println("\n0. Salir.\n");
        System.out.print("Escoga una opcion: ");
    }

    public static char choiceManager(ButcherShop butcherShop) {
        char choice;

        choice = scanner.next().charAt(0);
        scanner.nextLine();
        switch (choice) {
            case '1':
                registerBeef(butcherShop);
                break;
            case '2':
                if (butcherShop.getBeefList().size() == 0) {
                    System.out.println("Error, debe registrar almenos una res.");
                    keyPause();
                    break;
                }
                showFatBeefSerials(butcherShop);
                break;
            case '0':
                break;
            default:
                System.out.println("Opción inválida.\n\n");
                break;
        }
        return choice;
    }

    public static void registerBeef(ButcherShop butcherShop) {
        Beef beef = new Beef();
        Random random = new Random();
        String serial;
        boolean isValidInput;

        System.out.print("\033\143");
        System.out.println("REGISTRAR RES.\n");
        do {
            System.out.print("Ingrese el número de serie: ");
            serial = scanner.nextLine();
            isValidInput = isUnique(serial, butcherShop.getBeefList());
            if (!isValidInput) {
                System.out.printf("El serial \"%s\" ya se encuentra registrado.\n\n", serial);
            }
        } while (!isValidInput);
        beef.setAge(random.nextInt(9) + 1);
        System.out.printf("Edad aleatoria: %d\n", beef.getAge());
        do {
            System.out.print("Ingrese el sexo de la res. Macho(M) | Hembra(H): ");
            beef.setGenre(scanner.next().toUpperCase().charAt(0));
            isValidInput = beef.getGenre() == 'H' || beef.getGenre() == 'M';
            if (!isValidInput) {
                System.out.println("El sexo de la res sólo puede ser h/M.\n");
            }
        } while (!isValidInput);
        do {
            System.out.print("Ingrese el peso de la res (kg): ");
            beef.setWeight(scanner.nextDouble());
            isValidInput = beef.getWeight() > 0;
            if (!isValidInput) {
                System.out.println("El peso de la res no puede ser menor 0.1kg.\n");
            }
        } while (!isValidInput);


        beef.setSerialNumber(serial);
        butcherShop.addBeef(beef);
    }

    public static boolean isUnique(String serialNumber, List<Beef> beefList) {
        List<String> serialList = beefList.stream()
            .map(Beef::getSerialNumber)
            .collect(Collectors.toList());
        for (String serial : serialList) {
            if (serialNumber.equals(serial)) {
                return false;
            }
        }
        return true;
    }

    public static void showFatBeefSerials(ButcherShop butcherShop) {
        System.out.print("\033\143");
        System.out.println("SERIAL DE RESES OBESAS.");
        if (butcherShop.getFatBeefList().size() == 0) {
            System.out.println("╔═════════════════════════════════╗");
            System.out.println("║No se registraron hembras obesas.║");
            System.out.println("╚═════════════════════════════════╝");
            keyPause();
            return;
        }
        System.out.println("╔═════════════════════╗");
        butcherShop.getFatBeefList().forEach(s ->
            System.out.printf("║ %-20s║\n", s)
        );
        System.out.println("╚═════════════════════╝");
        keyPause();
    }

    public static void keyPause() {
        try {
            System.out.print("\nPresione cualquier tecla para volver al menu...");
            System.in.read();
        } catch (IOException ignore) {}
    }
}
