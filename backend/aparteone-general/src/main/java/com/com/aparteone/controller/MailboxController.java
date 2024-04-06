package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.response.MailboxDetailResponse;
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
    public ResponseEntity<PageDTO<Mailbox>> getMailboxListByApartmentId(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size,
            @RequestParam Integer apartmentId) {
        log.info("[Mailbox] Get Mailbox List By Apartment Id: {}", apartmentId);
        PageDTO<Mailbox> response = mailboxService.getMailboxListByApartmentId(page, size, apartmentId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    public ResponseEntity<Mailbox> insertMailbox(@RequestBody Mailbox mailbox) {
        log.info("[Mailbox] Insert Mailbox: " + mailbox.toString());
        Mailbox newMailbox = mailboxService.insertMailbox(mailbox);
        return ResponseEntity.ok(newMailbox);
    }

    @PutMapping("")
    public ResponseEntity<Mailbox> updateMailboxActiveStatus(@RequestParam Integer mailboxId, @RequestParam Boolean isActive) {
        log.info("[Mailbox] Update Mailbox Status: mailboxId-{} | isActive-{}", mailboxId, isActive);
        Mailbox mailbox = mailboxService.updateMailboxIsActive(mailboxId, isActive);
        return ResponseEntity.ok(mailbox);
    }

    @GetMapping("/detail/resident")
    public ResponseEntity<PageDTO<MailboxDetailResponse>> getMailboxDetailByResidentId(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "createdDate") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
            @RequestParam Integer residentId) {
        log.info("[Mailbox] Get Mailbox Request List By Resident Id: {}", residentId);
        PageDTO<MailboxDetailResponse> response = mailboxService.getMailboxDetailListByResidentId(page, size, sortBy, sortDir, residentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/detail/apartment")
    public ResponseEntity<PageDTO<MailboxDetailResponse>> getMailboxDetailByApartmentId(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "created_date") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
            @RequestParam Integer apartmentId) {
        log.info("[Mailbox] Get Mailbox Request List By Apartment Id: {}", apartmentId);
        PageDTO<MailboxDetailResponse> response = mailboxService.getMailboxDetailListByApartmentId(page, size, sortBy, sortDir, apartmentId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/request")
    public ResponseEntity<MailboxDetail> insertMailboxDetail(@RequestBody MailboxDetail mailboxRequest) {
        log.info("[Mailbox] Insert Mailbox Request: " + mailboxRequest.toString());
        MailboxDetail newMailboxDetail = mailboxService.insertMailboxDetail(mailboxRequest);
        return ResponseEntity.ok(newMailboxDetail);
    }

    @PutMapping("/request")
    public ResponseEntity<MailboxDetail> updateMailboxDetailStatus(
            @RequestParam Integer mailboxRequestId,
            @RequestParam String status, @RequestParam String remarks) {
        log.info("[Mailbox] Update Mailbox Request Status: mailboxRequestId-{} | status-{} | remarks-{}", mailboxRequestId, status, remarks);
        MailboxDetail mailboxRequest = mailboxService.updateMailboxDetailStatusById(mailboxRequestId, status, remarks);
        return ResponseEntity.ok(mailboxRequest);
    }
}
