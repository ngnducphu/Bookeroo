package com.rmit.sept.bk_transactionmicroservices.controller;

import com.rmit.sept.bk_bookservices.model.Author;
import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.service.BookService;
import com.rmit.sept.bk_loginservices.service.UserService;
import com.rmit.sept.bk_transactionmicroservices.model.Order;
import com.rmit.sept.bk_transactionmicroservices.model.OrderLineItem;
import com.rmit.sept.bk_transactionmicroservices.payload.AddOrderRequest;
import com.rmit.sept.bk_transactionmicroservices.service.OrderLineItemService;
import com.rmit.sept.bk_transactionmicroservices.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/transactions")
public class TransactionController {

	@Autowired
    private UserService userService;
	
	@Autowired
    private BookService bookService;    
    
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private OrderLineItemService orderLineItemService;
    
    @GetMapping
    public ResponseEntity<?> getAllOrders(){
        return ResponseEntity.ok().body("get all and every orders");
    }
    
    // Get request for getting all orders made by user Id with order line items
    @GetMapping(value = "/userId={userId}")
    public ResponseEntity<?> getOrdersByUserId(@PathVariable String userId){
    	List<LinkedList<OrderLineItem>> allOrders = new LinkedList<LinkedList<OrderLineItem>>();  	
    	List<Order> orderList = orderService.getOrdersByUserId(Long.parseLong(userId));
    	for (Order order: orderList) {
    		allOrders.add((LinkedList<OrderLineItem>) orderLineItemService.getAllOrderLineItemsByOrderId(order.getOrderId()));
    	}
        return ResponseEntity.ok().body(allOrders);
    }
    
    // Get request for all order line item of a specific order id
    @GetMapping(value = "/orderId={orderId}")
    public ResponseEntity<?> getOrderLineItemsByOrderId(@PathVariable String orderId){
        return ResponseEntity.ok().body(orderLineItemService.getAllOrderLineItemsByOrderId(Long.parseLong(orderId)));
    }

    // Get request for all order line item fulfilled by a seller
    @GetMapping(value = "/sellerId={sellerId}")
    public ResponseEntity<?> getOrdersBySellerId(@PathVariable String sellerId){	
    	List<OrderLineItem> orderList = orderLineItemService.getAllOrderLineItemsBySellerId(Long.parseLong(sellerId));
        return ResponseEntity.ok().body(orderList);
    }
    
    // Post request for adding new order
    @PostMapping("/add")
    public ResponseEntity<?> addOrder(@RequestBody AddOrderRequest orderRequest, Principal principal){
    	// validations
    	if(!userService.isUserAuthorised(principal, orderRequest.getUserId())){
            return new ResponseEntity<>("User not authorised to order to this account.", HttpStatus.FORBIDDEN);
        }
    	
    	// add order
        Order newOrder = Order.builder().userId(orderRequest.getUserId()).build();
        
        newOrder = orderService.addOrder(newOrder);
        
        // add order line items, decrease/remove book as doing so
        Set<OrderLineItem> orderLineItems = orderRequest.getOrderLineItems();
        for (OrderLineItem line: orderLineItems) {        	
        	line.setOrderId(newOrder.getOrderId());
        	line.setCreatedDate(LocalDateTime.now());
        	Book book = bookService.getBookById(line.getBookId());        	
        	for (Author author:book.getAuthors()) {
        		line.setBookAuthor(author.getName());
        	}
        	line.setBookDescription(book.getShortDescription());
        	line.setBookTitle(book.getTitle());
        	line.setBookImageUrl(book.getCoverImageUrl());
        	orderLineItemService.addOrderLineItem(line);      
        	
        	// remove book/reduce quantity
        	//bookService.removeBook(bookService.getBookById(line.getBookId()));
        	//bookService.getBookById(line.getBookId()).setQuantity(bookService.getBookById(line.getBookId()).getQuantity() - 1);
        }
        return ResponseEntity.created(URI.create("api/transactions/ID=" + newOrder.getOrderId())).body(newOrder);
    }
}
