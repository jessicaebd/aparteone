package com.com.aparteone.entity.transaction;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.com.aparteone.entity.merchant.Cart;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "transaction_details")
@EqualsAndHashCode(callSuper = false)
public class TransactionDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer transactionId;
    private Integer productId;
    private Integer quantity;
    private String notes;

    public TransactionDetail(Integer transactionId, Cart cart) {
        this.transactionId = transactionId;
        this.productId = cart.getProductId();
        this.quantity = cart.getQuantity();
        this.notes = cart.getNotes();
    }
}
