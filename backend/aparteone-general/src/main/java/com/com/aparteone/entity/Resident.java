package com.com.aparteone.entity;

import com.com.aparteone.entity.audit.AuditEntity;

import jakarta.persistence.Entity;
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
@Table(name = "residents")
@EqualsAndHashCode(callSuper = false)
public class Resident extends AuditEntity {
    @Id
    private Integer id; // residentId = userId
    private Integer apartmentUnitId;
    private String status;
    private Boolean isActive;
    private Boolean isApproved;
}
