package com.com.aparteone.entity.transaction;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.com.aparteone.dto.request.TransactionRequest;
import com.com.aparteone.entity.audit.AuditEntity;

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
