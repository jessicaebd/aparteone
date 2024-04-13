package com.com.aparteone.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import com.com.aparteone.dto.request.FacilityCategoryRequest;
import com.com.aparteone.entity.audit.AuditEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "facilities")
@EqualsAndHashCode(callSuper = false)
public class Facility extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer apartmentId;
    @Lob
    private String image;
    private String category;
    private String description;
    private Boolean isActive;

    public Facility (FacilityCategoryRequest facility) {
        this.apartmentId = facility.getApartmentId();
        this.image = facility.getImage();
        this.category = facility.getCategory();
        this.description = facility.getDescription();
        this.isActive = facility.getIsActive();
    }
}