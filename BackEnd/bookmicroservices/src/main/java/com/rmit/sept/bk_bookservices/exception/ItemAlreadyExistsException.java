package com.rmit.sept.bk_bookservices.exception;

public class ItemAlreadyExistsException extends RuntimeException{

    public ItemAlreadyExistsException(String message){
        super(message);
    }

    public ItemAlreadyExistsException(String message, Throwable throwable){
        super(message, throwable);
    }
}

