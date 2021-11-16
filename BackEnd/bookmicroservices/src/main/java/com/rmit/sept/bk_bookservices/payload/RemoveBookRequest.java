package com.rmit.sept.bk_bookservices.payload;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class RemoveBookRequest {

    private String bookTitle;
    private long userId;
}
