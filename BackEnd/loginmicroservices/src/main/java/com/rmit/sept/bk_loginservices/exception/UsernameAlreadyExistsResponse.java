package com.rmit.sept.bk_loginservices.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class UsernameAlreadyExistsResponse {

    private String username;
}