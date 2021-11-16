package com.rmit.sept.bk_bookservices.service;

import com.rmit.sept.bk_bookservices.exception.ItemAlreadyExistsException;
import com.rmit.sept.bk_bookservices.exception.ItemNotFoundException;
import com.rmit.sept.bk_bookservices.model.Category;
import com.rmit.sept.bk_bookservices.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public boolean checkCategoryExist(String name){
        return categoryRepository.findByName(name)!=null;
    }

    public Category getCategoryByName(String name){
        Category category = categoryRepository.findByName(name);
        if(!name.isBlank() && category == null){
            throw new ItemNotFoundException("Category: " + name + " not found.");
        }
        return category;
    }

    public Category addCategory(String name){
        if(categoryRepository.findByName(name) != null){
            throw new ItemAlreadyExistsException("Category: " + name + " already exists.");
        }
        return categoryRepository.save(Category.builder().name(name).build());
    }
}
