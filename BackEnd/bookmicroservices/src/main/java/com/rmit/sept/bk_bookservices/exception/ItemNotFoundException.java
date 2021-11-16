package com.rmit.sept.bk_bookservices.exception;

public class ItemNotFoundException extends RuntimeException{

    public ItemNotFoundException(String message){
         super(message);
     }

     public ItemNotFoundException(String message, Throwable throwable){
        super(message, throwable);
     }
}
