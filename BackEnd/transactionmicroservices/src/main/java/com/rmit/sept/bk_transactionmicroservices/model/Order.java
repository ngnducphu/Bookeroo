package com.rmit.sept.bk_transactionmicroservices.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customer_order")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long orderId;

    @NotNull(message = "UserId is required")
    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private LocalDateTime createdDate;

    @PrePersist
    private void preInsert(){
        createdDate = LocalDateTime.now();
    }

}
