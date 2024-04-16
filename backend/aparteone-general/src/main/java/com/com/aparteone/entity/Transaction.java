package com.com.aparteone.entity;

import java.util.Date;

import com.com.aparteone.dto.request.TransactionRequest;
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
@Table(name = "transactions")
@EqualsAndHashCode(callSuper = false)
public class Transaction extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer residentId;
    private Integer merchantId;
    private Double grandTotal;
    private String status;
    private Integer paymentId; // null = belum bayar
    private Date deliveredDate;
    private Date completedDate;
    private Date cancelledDate;

    public Transaction(TransactionRequest request) {
        this.residentId = request.getResidentId();
        this.merchantId = request.getMerchantId();
    }
}
