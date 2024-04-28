package com.com.aparteone.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.com.aparteone.entity.Notification;
import com.com.aparteone.repository.NotificationRepo;
import com.com.aparteone.service.NotificationService;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepo notificationRepo;

    @Override
    public List<Notification> getNotifications(Integer userId) {
        List<Notification> notifications = notificationRepo.findFirst5ByUserIdOrderByCreatedDate(userId);
        return notifications;
    }

    @Override
    public Notification sendNotification(Integer userId, String title, String message) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setTitle(title);
        notification.setMessage(message);
        return notificationRepo.save(notification);
    }

    @Override
    public Notification sendBillingNotification(Integer userId, Integer billingDetailId) {
        return sendNotification(userId, "Bills BLN00" + billingDetailId, "You have a new billing");
    }

    @Override
    public Notification sendMailboxNotification(Integer userId, Integer mailboxDetailId) {
        return sendNotification(userId, "Mailbox MBX00" + mailboxDetailId, "You have a new mailbox");
    } 
}
