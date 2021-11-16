package com.rmit.sept.bk_transactionmicroservices.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rmit.sept.bk_transactionmicroservices.model.OrderLineItem;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderLineItemRepository extends JpaRepository<OrderLineItem, Long> {

    List<OrderLineItem> findAll();


}