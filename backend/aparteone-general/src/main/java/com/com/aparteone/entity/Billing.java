package com.com.aparteone.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.com.aparteone.dto.request.BillingRequest;
import com.com.aparteone.entity.audit.AuditEntity;

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