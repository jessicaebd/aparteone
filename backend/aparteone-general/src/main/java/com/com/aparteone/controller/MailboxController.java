package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.MailboxDetailRequest;
import com.com.aparteone.dto.request.category.MailboxCategoryRequest;
import com.com.aparteone.dto.response.MailboxDetailResponse;
import com.com.aparteone.dto.response.category.MailboxCategoryResponse;
import com.com.aparteone.entity.Mailbox;
import com.com.aparteone.entity.MailboxDetail;
import com.com.aparteone.service.MailboxService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/mailbox")
public class MailboxController {
    @Autowired
    private MailboxService mailboxService;

    @GetMapping("")
    public ResponseEntity<PageResponse<MailboxCategoryResponse>> getMailboxCategoryList(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "40") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "category") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "ASC") String sortDir,
            @RequestParam(value = "isActive", required = false) Boolean isActive,
            @RequestParam Integer apartmentId) {
        log.info("[Mailbox] Get Mailbox Category List: apartmentId-{}", apartmentId);
        PageResponse<MailboxCategoryResponse> response = mailboxService.getMailboxListByApartmentId(page, size, sortBy, sortDir, isActive, apartmentId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    public ResponseEntity<Mailbox> addMailboxCategory(@RequestBody MailboxCategoryRequest mailboxCategoryRequest) {
        log.info("[Mailbox] Add Mailbox Category: {}", mailboxCategoryRequest.toString());
        Mailbox mailbox = mailboxService.addMailbox(mailboxCategoryRequest);
        return ResponseEntity.ok(mailbox);
    }

    @PostMapping("/update")
    public ResponseEntity<Mailbox> updateMailboxCategoryStatus(
            @RequestParam Integer mailboxId,
            @RequestParam Boolean isActive) {
        log.info("[Mailbox] Update Mailbox Category Status: mailboxId-{} | isActive-{}", mailboxId, isActive);
        Mailbox mailbox = mailboxService.updateMailboxIsActive(mailboxId, isActive);
        return ResponseEntity.ok(mailbox);
    }

    @GetMapping("/detail/apartment")
    public ResponseEntity<PageResponse<MailboxDetailResponse>> getApartmentMailboxDetailList(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "DESC") String sortDir,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam Integer apartmentId) {
        log.info("[Mailbox] Get Mailbox Detail - Apartment: apartmentId-{}", apartmentId);
        PageResponse<MailboxDetailResponse> response = mailboxService.getMailboxDetailListByApartmentId(page, size, sortBy, sortDir, status, apartmentId, search);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/detail/resident")
    public ResponseEntity<PageResponse<MailboxDetailResponse>> getResidentMailboxDetailList(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam Integer residentId) {
        log.info("[Mailbox] Get Mailbox Detail - Resident: residentId-{}", residentId);
        PageResponse<MailboxDetailResponse> response = mailboxService.getMailboxDetailListByResidentId(page, size, sortBy, sortDir, status, residentId, search);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/detail")
    public ResponseEntity<MailboxDetailResponse> getMailboxDetail(@RequestParam Integer mailboxDetailId) {
        log.info("[Mailbox] Get Mailbox Detail: mailboxDetailId-{}", mailboxDetailId);
        MailboxDetailResponse response = mailboxService.getMailboxDetailById(mailboxDetailId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/detail/add")
    public ResponseEntity<MailboxDetail> addMailboxDetail(@RequestBody MailboxDetailRequest mailboxDetailRequest) {
        log.info("[Mailbox] Add Mailbox Detail: {}", mailboxDetailRequest.toString());
        MailboxDetail mailboxDetail = mailboxService.addMailboxDetail(mailboxDetailRequest);
        return ResponseEntity.ok(mailboxDetail);
    }

    @PostMapping("/detail/update")
    public ResponseEntity<MailboxDetail> updateMailboxDetailStatus(
            @RequestParam Integer mailboxRequestId,
            @RequestParam String status) {
        log.info("[Mailbox] Update Mailbox Detail Status: mailboxRequestId-{} | status-{}", mailboxRequestId, status);
        MailboxDetail mailboxRequest = mailboxService.updateMailboxDetailStatus(mailboxRequestId, status);
        return ResponseEntity.ok(mailboxRequest);
    }

    @PostMapping("/notification/send") 
    public void sendMailboxNotification(@RequestParam Integer userId, @RequestParam Integer mailboxDetailId) {
        log.info("[Mailbox] Send Mailbox Notification: userId-{} | mailboxDetailId-{}", userId, mailboxDetailId);
        mailboxService.sendMailboxDetailNotification(userId, mailboxDetailId);
    }
}
