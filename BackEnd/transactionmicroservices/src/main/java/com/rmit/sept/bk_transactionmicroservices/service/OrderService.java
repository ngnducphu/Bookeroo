package com.rmit.sept.bk_transactionmicroservices.service;

import com.rmit.sept.bk_transactionmicroservices.model.Order;
import com.rmit.sept.bk_transactionmicroservices.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // get all orders
    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }
    
    // get orders by user id
    public List<Order> getOrdersByUserId(long userId){
        return orderRepository.findByUserId(userId);
    }    

    // add new order
    public Order addOrder(Order order){
        try{
            return orderRepository.save(order);
        }
        catch (Exception e){
            
        }
		return order;
    }


}
