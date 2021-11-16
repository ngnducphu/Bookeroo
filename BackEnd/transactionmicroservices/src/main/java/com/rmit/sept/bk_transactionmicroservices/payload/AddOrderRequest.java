package com.rmit.sept.bk_transactionmicroservices.payload;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

import com.rmit.sept.bk_transactionmicroservices.model.Order;
import com.rmit.sept.bk_transactionmicroservices.model.OrderLineItem;

@Builder
@Setter
@Getter
public class AddOrderRequest {

    private Long userId;
    private Set<OrderLineItem> orderLineItems;

}
