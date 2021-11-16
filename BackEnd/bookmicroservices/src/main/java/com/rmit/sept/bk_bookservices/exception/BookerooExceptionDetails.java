package com.rmit.sept.bk_bookservices.exception;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Builder
@Getter
public class BookerooExceptionDetails {

    private final String message;
    private final HttpStatus httpStatus;
    private final LocalDateTime dateTime;

}
