package com.com.aparteone.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.MailboxDetail;

@Repository
public interface MailboxDetailRepo extends JpaRepository<MailboxDetail, Integer>, JpaSpecificationExecutor<MailboxDetail> {
    @Query(value = "select md.id, md.mailbox_id, md.resident_id, md.description, md.status, md.received_date,md.completed_date,md.created_date,md.modified_date " + 
                "from mailbox_details md join mailboxes m " + 
                "on md.mailbox_id = m.id " + 
                "join apartments a " + 
                "on m.apartment_id = a.id " + 
                "where a.id=:apartmentId", nativeQuery = true)
    public Page<MailboxDetail> findByApartmentId(Integer apartmentId, Pageable pageable);

    @Query(value = "select md.id, md.mailbox_id, md.resident_id, md.description, md.status, md.received_date,md.completed_date,md.created_date,md.modified_date " + 
                "from mailbox_details md join mailboxes m " + 
                "on md.mailbox_id = m.id " + 
                "join apartments a " + 
                "on m.apartment_id = a.id " + 
                "where a.id=:apartmentId " + 
                "and md.id = :id", nativeQuery = true)
    public Page<MailboxDetail> findByApartmentIdAndId(Integer apartmentId, Integer id, Pageable pageable);

    @Query(value = "select md.id, md.mailbox_id, md.resident_id, md.description, md.status, md.received_date,md.completed_date,md.created_date,md.modified_date " + 
                "from mailbox_details md join mailboxes m " + 
                "on md.mailbox_id = m.id " + 
                "join apartments a " + 
                "on m.apartment_id = a.id " + 
                "where a.id=:apartmentId " +
                "and md.status = :status", nativeQuery = true)
    public Page<MailboxDetail> findByApartmentIdAndStatus(Integer apartmentId, String status, Pageable pageable);

    public Integer countByResidentId(Integer residentId);
}