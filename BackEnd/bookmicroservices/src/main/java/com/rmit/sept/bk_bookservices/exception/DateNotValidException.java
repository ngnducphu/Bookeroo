package com.rmit.sept.bk_bookservices.exception;

public class DateNotValidException extends RuntimeException{
    public DateNotValidException(String message){
        super(message);
    }

    public DateNotValidException(String message, Throwable throwable){
        super(message, throwable);
    }
}
