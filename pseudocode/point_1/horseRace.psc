REGISTRO Caballo
    nombre: cadena[50]
    peso: decimal simple
    edad: entero
    raza: cadena[50]
    distancia: decimal simple
    tiempo: decimal simple
    jinete: cadena[50]
FIN REGISTRO

REGISTRO Carrera
    numero: entero
    DIMENSION listaCaballos[4]: Caballo
    caballoGanador: Caballo
    caballoSegundo: Caballo
    jiniteGandor: cadena[50]
FIN REGISTRO

PROGRAMA_PRINCIPAL
