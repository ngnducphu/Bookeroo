package com.rmit.sept.bk_bookservices.exception;

public class InvalidSearchTermException extends RuntimeException{

    public InvalidSearchTermException(String message){
        super(message);
    }

    public InvalidSearchTermException(String message, Throwable throwable){
        super(message, throwable);
    }
}
