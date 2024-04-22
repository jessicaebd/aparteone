package com.com.aparteone.entity;

import com.com.aparteone.entity.audit.AuditEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "merchants")
@EqualsAndHashCode(callSuper = false)
public class Merchant extends AuditEntity {
    @Id
    private Integer id; // merchantId = userId
    private Integer apartmentId;
    @Lob
    private String image;
    private String name;
    private String bankAccount;
    private String accountNumber;
    private String accountName;
    private String category;
    private String address;
    private Boolean isActive;
    private Boolean isApproved;
}
