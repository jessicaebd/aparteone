package com.com.aparteone.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.Mailbox;

@Repository
public interface MailboxRepo extends JpaRepository<Mailbox, Integer> {
    public Page<Mailbox> findByApartmentId(Integer apartmentId, Pageable pageable);
}