package com.com.aparteone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.Notification;

@Repository
public interface NotificationRepo extends JpaRepository<Notification, Integer> {
    public List<Notification> findFirst5ByUserIdOrderByCreatedDate(Integer userId);
}
