package com.com.aparteone.entity.general;

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
@Table(name = "apartments")
@EqualsAndHashCode(callSuper = false)
public class Apartment extends AuditEntity {
    @Id
    private Integer id; // apartmentId = userId
    private String name;
    private String address;
    private String province;
    private String city;
    private String postalCode;
    private String latitude;
    private String longitude;
    private Boolean isActive;
}
