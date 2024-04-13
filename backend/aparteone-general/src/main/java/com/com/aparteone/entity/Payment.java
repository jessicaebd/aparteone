package com.com.aparteone.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "payments")
public class Payment {
    @Id
    private Integer id; //transactionId
    private String paymentProofImage;
    private Boolean isValid;
    private Date paymentDate;
    private Date verifiedDate;

    public Payment(Integer transactionId, String paymentProofImage, Date paymentDate) {
        this.id = transactionId;
        this.paymentProofImage = paymentProofImage;
        this.paymentDate = paymentDate;
    }
}
