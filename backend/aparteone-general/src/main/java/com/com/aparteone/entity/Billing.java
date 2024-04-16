package com.com.aparteone.entity;

import com.com.aparteone.dto.request.BillingRequest;
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
@Table(name = "billings")
@EqualsAndHashCode(callSuper = false)
public class Billing extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer apartmentId;
    private String category;
    private Boolean isActive;

    public Billing(BillingRequest request) {
        this.apartmentId = request.getApartmentId();
        this.category = request.getCategory();
        this.isActive = request.getIsActive();
    }
}