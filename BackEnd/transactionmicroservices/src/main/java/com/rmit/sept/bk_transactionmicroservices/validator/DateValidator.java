package com.rmit.sept.bk_transactionmicroservices.validator;

import java.time.LocalDateTime;

public class DateValidator {

    public boolean isDateValid(LocalDateTime dateTime){
        return dateTime.isBefore(LocalDateTime.now());
    }
}