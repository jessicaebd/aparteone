package com.com.aparteone.entity.merchant;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.com.aparteone.entity.audit.AuditEntity;

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
    private String image;
    private String name;
    private String bankName;
    private String accountNumber;
    private String accountName;
    private String phoneNumber;
    private String category;
    private String address;
    private Boolean isActive;
}
