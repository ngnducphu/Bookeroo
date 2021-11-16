package com.rmit.sept.bk_transactionmicroservices.model;

import java.io.Serializable;

// composite primary key for order line item
public class PrimaryKeyOrderLineItem implements Serializable  {
	private Long order_line_item_no;
	private Long orderId;
}
