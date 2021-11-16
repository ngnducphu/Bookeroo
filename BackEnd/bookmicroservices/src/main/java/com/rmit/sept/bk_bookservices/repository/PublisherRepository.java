package com.rmit.sept.bk_bookservices.repository;

import com.rmit.sept.bk_bookservices.model.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long> {

    Publisher findByName(String name);
}
