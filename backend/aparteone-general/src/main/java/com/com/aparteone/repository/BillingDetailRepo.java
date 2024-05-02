package com.com.aparteone.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.BillingDetail;

@Repository
public interface BillingDetailRepo extends JpaRepository<BillingDetail, Integer>, JpaSpecificationExecutor<BillingDetail> {
    @Query(value = "select bd.id,bd.billing_id,bd.resident_id,bd.payment_id,bd.status,bd.amount,bd.due_date,bd.completed_date,bd.cancelled_date,bd.created_date,bd.modified_date " +
    "from billing_details bd join billings b on bd.billing_id = b.id " +
    "where b.apartment_id = :apartmentId", nativeQuery = true)
    public Page<BillingDetail> findByApartmentId(Integer apartmentId, Pageable pageable);

    @Query(value = "select bd.id,bd.billing_id,bd.resident_id,bd.payment_id,bd.status,bd.amount,bd.due_date,bd.completed_date,bd.cancelled_date,bd.created_date,bd.modified_date " +
    "from billing_details bd join billings b on bd.billing_id = b.id " +
    "where b.apartment_id = :apartmentId " + 
    "and bd.id = :id", nativeQuery = true)
    public Page<BillingDetail> findByApartmentIdAndId(Integer apartmentId, Integer id, Pageable pageable);

    @Query(value = "select bd.id,bd.billing_id,bd.resident_id,bd.payment_id,bd.status,bd.amount,bd.due_date,bd.completed_date,bd.cancelled_date,bd.created_date,bd.modified_date " +
    "from billing_details bd join billings b on bd.billing_id = b.id " +
    "where b.apartment_id = :apartmentId " +
    "and bd.status = :status", nativeQuery = true)
    public Page<BillingDetail> findByApartmentIdAndStatus(Integer apartmentId, String status, Pageable pageable);

    public Integer countByResidentId(Integer residentId);
}