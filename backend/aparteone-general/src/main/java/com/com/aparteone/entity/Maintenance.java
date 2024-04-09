package com.com.aparteone.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.com.aparteone.dto.request.MaintenanceCategoryRequest;
import com.com.aparteone.entity.audit.AuditEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "maintenances")
@EqualsAndHashCode(callSuper = false)
public class Maintenance extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Integer id;
    private Integer apartmentId;
    private Integer imageId;
    private String category;
    private String description;
    private Boolean isActive;

    public Maintenance (MaintenanceCategoryRequest maintenance) {
        this.apartmentId = maintenance.getApartmentId();
        // this.imageId = maintenance.getImageId();
        this.category = maintenance.getCategory();
        this.description = maintenance.getDescription();
        this.isActive = maintenance.getIsActive();
    }
}