package com.rmit.sept.bk_transactionmicroservices.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rmit.sept.bk_transactionmicroservices.model.Order;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAll();    

	List<Order> findByUserId(long userId);


}
