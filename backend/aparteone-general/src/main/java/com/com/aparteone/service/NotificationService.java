package com.com.aparteone.service;

import java.util.List;

import com.com.aparteone.entity.Notification;

public interface NotificationService {
    public List<Notification> getNotifications(Integer userId);
    public void sendNotification(Integer userId, String title, String message);
}
