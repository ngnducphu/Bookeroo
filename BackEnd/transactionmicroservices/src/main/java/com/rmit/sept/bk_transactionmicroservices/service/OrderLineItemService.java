package com.rmit.sept.bk_transactionmicroservices.service;

import com.rmit.sept.bk_transactionmicroservices.model.OrderLineItem;
import com.rmit.sept.bk_transactionmicroservices.repository.OrderLineItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class OrderLineItemService {
	@Autowired
    private OrderLineItemRepository orderLineItemRepository;

    public List<OrderLineItem> getAllOrderLineItems(){
        return orderLineItemRepository.findAll();
    }

    // get all order line items by a specific order id
    public List<OrderLineItem> getAllOrderLineItemsByOrderId(long orderId){
    	List<OrderLineItem> allOrderLineItems = orderLineItemRepository.findAll();
    	List<OrderLineItem> orderLineItemsByOrderId = new LinkedList<OrderLineItem>();
    	for (OrderLineItem orderLineItem : allOrderLineItems) {
    		if (orderLineItem.getOrderId() == orderId) {
    			orderLineItemsByOrderId.add(orderLineItem);
    		}
    	}
        return orderLineItemsByOrderId;
    }
    
    // get order line item by specific seller id
    public List<OrderLineItem> getAllOrderLineItemsBySellerId(long sellerId){
    	List<OrderLineItem> allOrderLineItems = orderLineItemRepository.findAll();
    	List<OrderLineItem> orderLineItemsBySellerId = new LinkedList<OrderLineItem>();
    	for (OrderLineItem orderLineItem : allOrderLineItems) {
    		if (orderLineItem.getSellerId() == sellerId) {
    			orderLineItemsBySellerId.add(orderLineItem);
    		}
    	}
        return orderLineItemsBySellerId;
    }
    
    // add new order line item
    public OrderLineItem addOrderLineItem(OrderLineItem orderLineItem){
        try{
            return orderLineItemRepository.save(orderLineItem);
        }
        catch (Exception e){
            
        }
		return orderLineItem;
    }

}
