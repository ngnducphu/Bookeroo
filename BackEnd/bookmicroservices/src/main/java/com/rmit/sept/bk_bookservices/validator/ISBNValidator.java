package com.rmit.sept.bk_bookservices.validator;

public class ISBNValidator {

    public static boolean isISBN10(String ISBN){
        return ISBN != null && ISBN.matches("\\d{10}");
    }

    public static boolean isISBN13(String ISBN){
        return ISBN != null && ISBN.matches("\\d{13}");
    }

    public static boolean isValidISBN(String ISBN){
        return isISBN10(ISBN) || isISBN13(ISBN);
    }
}
