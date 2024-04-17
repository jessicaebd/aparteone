package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.AnnouncementRequest;
import com.com.aparteone.dto.response.AnnouncementResponse;
import com.com.aparteone.entity.Announcement;
import com.com.aparteone.service.AnnouncementService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/announcement")
public class AnnouncementController {
    @Autowired
    private AnnouncementService announcementService;

    @GetMapping("")
    public ResponseEntity<PageResponse<AnnouncementResponse>> getAnnouncementListByApartmentId(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "40") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "createdDate") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
            @RequestParam(value = "criteria", required = false) String criteria,
            @RequestParam Integer apartmentId) {
        log.info("[Announcement] Get Announcement List By Apartment Id: {}", apartmentId);
        PageResponse<AnnouncementResponse> response = announcementService.getAnnouncementListByApartmentId(page, size, sortBy, sortDir, criteria, apartmentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/detail")
    public ResponseEntity<AnnouncementResponse> getAnnouncementDetail(@RequestParam Integer announcementId) {
        log.info("[Announcement] Get Announcement Detail: {}", announcementId);
        AnnouncementResponse response = announcementService.getAnnouncementById(announcementId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    public ResponseEntity<Announcement> addAnnouncement(@RequestBody AnnouncementRequest announcement) {
        log.info("[Announcement] Insert Announcement: " + announcement.toString());
        Announcement newAnnouncement = announcementService.addAnnouncement(announcement);
        return ResponseEntity.ok(newAnnouncement);
    }

    @PostMapping("/update")
    public ResponseEntity<Announcement> updateAnnouncement(@RequestParam Integer announcementId, @RequestBody AnnouncementRequest announcement) {
        log.info("[Announcement][Management] Update Announcement: " + announcement.toString());
        Announcement updatedAnnouncement = announcementService.updateAnnouncement(announcementId, announcement);
        return ResponseEntity.ok(updatedAnnouncement);
    }

}
