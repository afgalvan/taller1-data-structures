package edu.unicesar.activity.main;


import java.lang.reflect.Method;

public class Main {
    public static void main(String[] args) throws Exception {
        String className = "edu.unicesar.activity.points." + args[0];
        Class<?> pointClass = Class.forName(className);
        Method pointMethod = pointClass.getDeclaredMethod("main", String[].class);
        pointMethod.invoke(pointClass, (Object) new String[20]);
    }
}
