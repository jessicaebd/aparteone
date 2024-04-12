package com.com.aparteone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.Announcement;

@Repository
public interface AnnouncementRepo extends JpaRepository<Announcement, Integer>, JpaSpecificationExecutor<Announcement> {
}
