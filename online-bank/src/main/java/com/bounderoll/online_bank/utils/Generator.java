package com.bounderoll.online_bank.utils;

public class Generator {

    public static int generateSecret() {
        return (int) (Math.random() * 900) + 100;
    }

    public static String generateCardNumber() {
        return generatePartOfCardNumber() + " " +
               generatePartOfCardNumber() + " " +
               generatePartOfCardNumber() + " " +
               generatePartOfCardNumber();
    }

    public static int generatePartOfCardNumber() {
        return (int) (Math.random() * 1000) + 1000;
    }
}
