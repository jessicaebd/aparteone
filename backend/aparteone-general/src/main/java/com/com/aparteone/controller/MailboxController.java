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
import com.com.aparteone.dto.request.category.MailboxCategoryRequest;
import com.com.aparteone.dto.response.category.MailboxCategoryResponse;
import com.com.aparteone.entity.Mailbox;
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
            @RequestParam(value = "sortBy", required = false, defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
            @RequestParam(value = "isActive", required = false) Boolean isActive,
            @RequestParam Integer apartmentId) {
        log.info("[Mailbox] Get Mailbox List By Apartment Id: {}", apartmentId);
        PageResponse<MailboxCategoryResponse> response = mailboxService.getMailboxListByApartmentId(page, size, sortBy, sortDir, isActive, apartmentId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    public ResponseEntity<Mailbox> addMailboxCategory(@RequestBody MailboxCategoryRequest request) {
        log.info("[Mailbox] Insert Mailbox: " + request.toString());
        Mailbox mailbox = mailboxService.addMailbox(request);
        return ResponseEntity.ok(mailbox);
    }

    @PostMapping("/update")
    public ResponseEntity<Mailbox> updateMailboxActiveStatus(
            @RequestParam Integer mailboxId,
            @RequestParam Boolean isActive) {
        log.info("[Mailbox] Update Mailbox Status: mailboxId-{} | isActive-{}", mailboxId, isActive);
        Mailbox mailbox = mailboxService.updateMailboxIsActive(mailboxId, isActive);
        return ResponseEntity.ok(mailbox);
    }



    // @GetMapping("/detail/resident")
    // public ResponseEntity<PageResponse<MailboxDetailResponse>>
    // getMailboxDetailByResidentId(
    // @RequestParam(value = "page", required = false, defaultValue = "0") int page,
    // @RequestParam(value = "size", required = false, defaultValue = "40") int
    // size,
    // @RequestParam(value = "sortBy", required = false, defaultValue =
    // "createdDate") String sortBy,
    // @RequestParam(value = "sortDir", required = false, defaultValue = "desc")
    // String sortDir,
    // @RequestParam(value = "status", required = false) String status,
    // @RequestParam Integer residentId) {
    // log.info("[Mailbox] Get Mailbox Request List By Resident Id: {}",
    // residentId);
    // PageResponse<MailboxDetailResponse> response =
    // mailboxService.getMailboxDetailListByResidentId(page, size, sortBy, sortDir,
    // status, residentId);
    // return ResponseEntity.ok(response);
    // }

    // @GetMapping("/detail/apartment")
    // public ResponseEntity<PageResponse<MailboxDetailResponse>>
    // getMailboxDetailByApartmentId(
    // @RequestParam(value = "page", defaultValue = "0") int page,
    // @RequestParam(value = "size", defaultValue = "10") int size,
    // @RequestParam(value = "sortBy", defaultValue = "created_date") String sortBy,
    // @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
    // @RequestParam(value = "status", required = false) String status,
    // @RequestParam Integer apartmentId) {
    // log.info("[Mailbox] Get Mailbox Request List By Apartment Id: {}",
    // apartmentId);
    // PageResponse<MailboxDetailResponse> response =
    // mailboxService.getMailboxDetailListByApartmentId(page, size, sortBy, sortDir,
    // status, apartmentId);
    // return ResponseEntity.ok(response);
    // }

    // @PostMapping("/detail")
    // public ResponseEntity<MailboxDetail> insertMailboxDetail(@RequestBody
    // MailboxDetailRequest request) {
    // log.info("[Mailbox] Insert Mailbox Request: " + request.toString());
    // MailboxDetail mailboxDetail = mailboxService.insertMailboxDetail(request);
    // return ResponseEntity.ok(mailboxDetail);
    // }

    // @PostMapping("/detail/update-status")
    // public ResponseEntity<MailboxDetail> updateMailboxDetailStatus(
    // @RequestParam Integer mailboxRequestId,
    // @RequestParam String status,
    // @RequestParam(required = false) String remarks) {
    // log.info("[Mailbox] Update Mailbox Request Status: mailboxRequestId-{} |
    // status-{} | remarks-{}", mailboxRequestId, status, remarks);
    // MailboxDetail mailboxRequest =
    // mailboxService.updateMailboxDetailStatusById(mailboxRequestId, status,
    // remarks);
    // return ResponseEntity.ok(mailboxRequest);
    // }
}
