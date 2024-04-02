package com.com.aparteone.entity;

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
@Table(name = "residents")
@EqualsAndHashCode(callSuper = false)
public class Resident extends AuditEntity {
    @Id
    private Integer id;
    private Integer apartmentUnitId;
    private String status;
    private Boolean isActive;
}
