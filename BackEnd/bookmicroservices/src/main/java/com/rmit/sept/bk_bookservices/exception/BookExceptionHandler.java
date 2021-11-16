package com.rmit.sept.bk_bookservices.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class BookExceptionHandler {

    @ExceptionHandler(value = {ItemNotFoundException.class})
    public ResponseEntity<Object> handleNotFoundException(RuntimeException exception){
        BookerooExceptionDetails bookerooExceptionDetails = BookerooExceptionDetails.builder()
                .message(exception.getMessage())
                .httpStatus(HttpStatus.NOT_FOUND)
                .dateTime(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(bookerooExceptionDetails, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = {DateNotValidException.class, InvalidSearchTermException.class})
    public ResponseEntity<Object> handleNotValidException(RuntimeException exception){
        BookerooExceptionDetails bookerooExceptionDetails = BookerooExceptionDetails.builder()
                .message(exception.getMessage())
                .httpStatus(HttpStatus.BAD_REQUEST)
                .dateTime(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(bookerooExceptionDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {ItemAlreadyExistsException.class})
    public ResponseEntity<Object> handleConflictException(RuntimeException exception){
        BookerooExceptionDetails bookerooExceptionDetails = BookerooExceptionDetails.builder()
                .message(exception.getMessage())
                .httpStatus(HttpStatus.CONFLICT)
                .dateTime(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(bookerooExceptionDetails, HttpStatus.CONFLICT);
    }

}
