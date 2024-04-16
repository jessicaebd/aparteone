package com.com.aparteone.entity;

import com.com.aparteone.dto.request.CategoryRequest;
import com.com.aparteone.entity.audit.AuditEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer apartmentId;
    @Lob
    private String image;
    private String category;
    private String description;
    private Boolean isActive;

    public Maintenance (CategoryRequest maintenance) {
        this.apartmentId = maintenance.getApartmentId();
        this.image = maintenance.getImage();
        this.category = maintenance.getCategory();
        this.description = maintenance.getDescription();
        this.isActive = maintenance.getIsActive();
    }
}