package com.rmit.sept.bk_bookservices.service;

import com.rmit.sept.bk_bookservices.exception.ItemAlreadyExistsException;
import com.rmit.sept.bk_bookservices.exception.ItemNotFoundException;
import com.rmit.sept.bk_bookservices.model.Publisher;
import com.rmit.sept.bk_bookservices.repository.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PublisherService {

    @Autowired
    PublisherRepository publisherRepository;

    public Publisher getPublisherByName(String name){
        Publisher publisher = publisherRepository.findByName(name);
        if(!name.isBlank() && publisher == null){
            throw new ItemNotFoundException("Publisher: " + name + " not found.");
        }
        return publisher;
    }

    public Publisher addPublisher(String name){
        if(publisherRepository.findByName(name) != null){
            throw new ItemAlreadyExistsException("Publisher: " + name + " already exists.");
        }
        return publisherRepository.save(Publisher.builder().name(name).build());
    }

    public boolean checkPublisherExist(String name){
        return publisherRepository.findByName(name)!=null;
    }
}
