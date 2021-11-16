package com.rmit.sept.bk_loginservices.exception;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class InvalidLoginResponse {

    private String message;

    public InvalidLoginResponse() {
        this.message = "Unauthorised Access. Make sure you use the right details to log in and have the right permissions.";
    }
}