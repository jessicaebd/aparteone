package com.com.aparteone.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String paymentProofImage;
    private Boolean isValid;
    private Date paymentDate;
    private Date verifiedDate;

    public Payment(String paymentProofImage, Date paymentDate) {
        this.paymentProofImage = paymentProofImage;
    }
}
