package com.rmit.sept.bk_bookservices.payload;

import com.rmit.sept.bk_bookservices.model.Book;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Builder
@Setter
@Getter
public class AddEditBookRequest {

    private Book book;
    private Set<String> authorNames;
    private Set<String> categoryNames;
    private String publisherName;
}
