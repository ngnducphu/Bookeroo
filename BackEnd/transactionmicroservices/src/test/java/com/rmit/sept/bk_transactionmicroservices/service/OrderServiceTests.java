package com.rmit.sept.bk_transactionmicroservices.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.rmit.sept.bk_transactionmicroservices.model.Order;
import com.rmit.sept.bk_transactionmicroservices.repository.OrderRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Stream;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


@SpringBootTest
public class OrderServiceTests {

	@InjectMocks
	private OrderService orderService;
	
	@Mock
	private OrderRepository orderRepository;
       
    @Test
    void test_addOrder_successful(){
    	Order order = Order.builder().orderId(1L).userId(1L).build();
    	doReturn(order).when(orderRepository).save(any());
    	assertEquals(order, orderService.addOrder(order), "add order successfully");	    
	           
    }
    
    @Test
    void test_getOrderByUserId_successful(){
    	Order order = Order.builder().orderId(2L).userId(1L).build();    	
    	List<Order> orders = new LinkedList<Order>();
    	orders.add(order);
    	doReturn(orders).when(orderRepository).findByUserId(2);
    	assertEquals(orders, orderService.getOrdersByUserId(2), "get order by user id successfully");	    
	           
    }
    
}
