package com.com.aparteone.entity;

import java.util.Date;

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
@Table(name = "maintenance_requests")
@EqualsAndHashCode(callSuper = false)
public class MaintenanceRequest extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer maintenanceId;
    private Integer residentId;
    private String status;
    // private Date requestedDate; -> createdDate
    private String assignedTo;
    private Date assignedDate;
    private Date completedDate;
    private Date cancelledDate;
}