package com.com.aparteone.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import com.com.aparteone.dto.request.AnnouncementRequest;
import com.com.aparteone.entity.audit.AuditEntity;

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
    private String image;
    private String title;
    @Lob
    private String description;
    private Date startDate;
    private Date endDate;

    public Announcement(AnnouncementRequest announcementRequest) {
        this.apartmentId = announcementRequest.getApartmentId();
        this.image = announcementRequest.getImage();
        this.title = announcementRequest.getTitle();
        this.description = announcementRequest.getDescription();
        this.startDate = announcementRequest.getStartDate();
        this.endDate = announcementRequest.getEndDate();
    }
}
