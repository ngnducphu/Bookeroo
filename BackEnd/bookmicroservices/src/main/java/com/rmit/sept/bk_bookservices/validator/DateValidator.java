package com.rmit.sept.bk_bookservices.validator;

import java.time.LocalDateTime;

public class DateValidator {

    public boolean isDateValid(LocalDateTime dateTime){
        return dateTime.isBefore(LocalDateTime.now());
    }
}