package com.rmit.sept.bk_transactionmicroservices.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@IdClass(PrimaryKeyOrderLineItem.class)
@Table(name = "orderLineItem")
public class OrderLineItem {
	
    @Id
    @Column(nullable = false)
    private Long order_line_item_no;

    @Id
    @Column
    private Long orderId;


    @Column(nullable = false)
    private Long sellerId;

    @Column(nullable = false)
    private Long bookId;

    @Column(nullable = false)
    private Long quantity;

    private double price;

    @Column(nullable = false)
    private LocalDateTime createdDate;
    
    // order line item book information, should have used many to many relation
    @Column
    private String bookTitle;
    
    @Column
    private String bookAuthor;
    
    @Column
    private String bookImageUrl;
    
    @Column
    private String bookDescription;
    
    

    @PrePersist
    private void preInsert(){
        createdDate = LocalDateTime.now();
    }

}
