package com.com.aparteone.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
