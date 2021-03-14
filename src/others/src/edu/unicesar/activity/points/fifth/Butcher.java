/*
 * Ejercicio 5.
 * El frigorífico de carnes de res “Camagüey” ubicado en Cartagena necesita
 * computarizar las medidas de las reses almacenadas allí. Por cada resse deben
 * almacenar los siguientes datos:
 *
 * –Número de serie: Cadena de caracteres
 * –Edad: Aleatoria en un rango entre 1 y 10
 * –Sexo: Si es macho (M) o hembra (H)
 * –Peso: En kilos
 * El frigorífico tiene una capacidad para recibir como máximo 100 reses.
 * Los  estudiantes  del  profesor  Braulio  debenrealizar  un  algoritmo
 * que  permita  ingresar  dicha información en un Array de Registrosy validar
 * la información.
 * Luego,almacenaren un nuevo arreglo(simple)los números de series de todas las
 * reseshembras obesas (peso>40kg)y  mostrar  el  arreglo  con  los  números
 * de  serie.  En  caso  que  no  tuviera hembras obesas mostrar el mensaje
 * correspondiente.
 */

package edu.unicesar.activity.points.fifth;

import edu.unicesar.activity.points.fifth.models.Beef;
import edu.unicesar.activity.points.fifth.models.ButcherShop;

import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Butcher {
    public static Scanner scanner = new Scanner(System.in);

    public static void main() {
        ButcherShop butcherShop = new ButcherShop();
        do {
            menuPrompt();
        } while (choiceManager(butcherShop) != '0');
    }

    public static void menuPrompt() {
        System.out.print("\033\143");
        System.out.println("REGISTRO DE RESES");
        System.out.println("========================\n");
        System.out.println("1. Regisrar nueva res.");
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
                    scanner.next();
                    break;
                }
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
        String serial;
        boolean isValidInput;

        do {
            System.out.print("Ingrese el número de serie: ");
            serial = scanner.nextLine();
            isValidInput = isUnique(serial, butcherShop.getBeefList());
            if (!isValidInput) {
                System.out.printf("El serial \"%s\" ya se encuentra registrado.\n\n", serial);
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

    public static void showFatBeef() {
        
    }
}
