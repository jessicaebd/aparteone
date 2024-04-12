package com.com.aparteone.entity;

import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
@Table(name = "facility_times")
@EqualsAndHashCode(callSuper = false)
public class FacilityTime extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer facilityId;
    private LocalTime startTime;
    private LocalTime endTime;
    private Boolean isActive;
}