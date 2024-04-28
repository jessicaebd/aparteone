package com.com.aparteone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.entity.Notification;
import com.com.aparteone.service.NotificationService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/notification")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping("")
    public ResponseEntity<List<Notification>> getNotifications(@RequestParam Integer userId) {
        log.info("[Notification] Get Notifications: userId-{}", userId);
        List<Notification> response = notificationService.getNotifications(userId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/billing")
    public ResponseEntity<Notification> sendBillingNotification(
            @RequestParam Integer userId,
            @RequestParam Integer billingDetailId) {
        log.info("[Billing] Send Billing Notification: userId-{} | billingDetailId-{}", userId, billingDetailId);
        Notification response = notificationService.sendBillingNotification(userId, billingDetailId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/mailbox")
    public ResponseEntity<Notification> sendMailboxNotification(
            @RequestParam Integer userId,
            @RequestParam Integer mailboxDetailId) {
        log.info("[Mailbox] Send Mailbox Notification: userId-{} | mailboxDetailId-{}", userId, mailboxDetailId);
        Notification response = notificationService.sendMailboxNotification(userId, mailboxDetailId);
        return ResponseEntity.ok(response);
    }
}
