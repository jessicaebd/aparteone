package com.com.aparteone.entity;

import java.util.Date;

import com.com.aparteone.dto.request.AnnouncementRequest;
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
@Table(name = "announcements")
@EqualsAndHashCode(callSuper = false)
public class Announcement extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer apartmentId;
    @Lob
    private String image;
    private String title;
    @Lob
    private String description;
    private Date startDate;
    private Date endDate;
}
