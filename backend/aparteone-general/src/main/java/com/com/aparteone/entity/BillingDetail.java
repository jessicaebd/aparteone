package com.com.aparteone.entity;

import java.util.Date;

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
@Table(name = "billing_details")
@EqualsAndHashCode(callSuper = false)
public class BillingDetail extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer billingId;
    private Integer residentId;
    private Integer paymentId;
    private String status;
    private Double amount;
    private Date dueDate;
    private Date completedDate;
    private Date cancelledDate;
}