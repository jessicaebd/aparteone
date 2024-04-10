package com.com.aparteone.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import com.com.aparteone.dto.request.CategoryRequest;
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
    @Lob
    private byte[] image;
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