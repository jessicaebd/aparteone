package com.com.aparteone.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.Announcement;

@Repository
public interface AnnouncementRepo extends JpaRepository<Announcement, Integer> {
    public Page<Announcement> findByApartmentId(Integer apartmentId, Pageable pageable);
}
