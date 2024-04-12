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
@Table(name = "mailbox_details")
@EqualsAndHashCode(callSuper = false)
public class MailboxDetail extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer mailboxId;
    private Integer residentId;
    private String description;
    private String status;
    private String location;
    private Date arrivedDate;
    private Date completedDate;
}