package com.com.aparteone.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.com.aparteone.dto.request.BillingDetailRequest;
import com.com.aparteone.entity.audit.AuditEntity;

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

    public BillingDetail(BillingDetailRequest request) {
        this.billingId = request.getBillingId();
        this.residentId = request.getResidentId();
        this.amount = request.getAmount();
        this.dueDate = request.getDueDate();
    }
}