package com.rmit.sept.bk_loginservices.repository;

import com.rmit.sept.bk_loginservices.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    List<User> findAll();
    User getById(Long id);
}