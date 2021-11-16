package com.rmit.sept.bk_bookservices.service;

import com.rmit.sept.bk_bookservices.exception.ItemAlreadyExistsException;
import com.rmit.sept.bk_bookservices.exception.ItemNotFoundException;
import com.rmit.sept.bk_bookservices.model.Author;
import com.rmit.sept.bk_bookservices.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorService {

    @Autowired
    AuthorRepository authorRepository;

    public Author getAuthorByName(String name){
        Author author = authorRepository.findByName(name);
        if(!name.isBlank() && author == null){
            throw new ItemNotFoundException("Author: " + name + " not found.");
        }
        return author;
    }

    public boolean checkAuthorExist(String name){
        return authorRepository.findByName(name)!=null;
    }

    public Author addAuthor(String name){
        if(authorRepository.findByName(name) != null){
            throw new ItemAlreadyExistsException("Author: " + name + " already exists.");
        }
        return authorRepository.save(Author.builder().name(name).build());
    }
}
