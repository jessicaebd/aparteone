package com.com.aparteone.service;

import java.util.List;

import com.com.aparteone.entity.Notification;

public interface NotificationService {
    public List<Notification> getNotifications(Integer userId);
    public Notification sendNotification(Integer userId, String title, String message);
    public Notification sendBillingNotification(Integer userId, Integer billingDetailId);
    public Notification sendMailboxNotification(Integer userId, Integer mailboxDetailId);
}
