package com.rmit.sept.bk_bookservices.repository;

import com.rmit.sept.bk_bookservices.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    Author findByName(String name);
}
