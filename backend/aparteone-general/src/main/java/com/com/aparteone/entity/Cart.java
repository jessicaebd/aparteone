package com.com.aparteone.entity;

import com.com.aparteone.dto.request.CartRequest;
import com.com.aparteone.entity.audit.AuditEntity;

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
@Table(name = "carts")
@EqualsAndHashCode(callSuper = false)
public class Cart extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer residentId;
    private Integer merchantId;
    private Integer productId;
    private Integer quantity;
    private String notes;

    public Cart (CartRequest cart) {
        this.residentId = cart.getResidentId();
        this.merchantId = cart.getMerchantId();
        this.productId = cart.getProductId();
        this.quantity = cart.getQuantity();
        this.notes = cart.getNotes();
    }
}
