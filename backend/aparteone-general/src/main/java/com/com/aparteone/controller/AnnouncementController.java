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
import com.com.aparteone.entity.Announcement;
import com.com.aparteone.service.AnnouncementService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/announcement")
public class AnnouncementController {
    @Autowired
    private AnnouncementService announcementService;

    @GetMapping("")
    public ResponseEntity<PageDTO<Announcement>> getAnnouncementListByApartmentId(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "created_date") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
            @RequestParam Integer apartmentId) {
        log.info("[Facility] Get Facility List By Apartment Id: {}", apartmentId);
        PageDTO<Announcement> response = announcementService.getAnnouncementListByApartmentId(page, size, sortBy, sortDir, apartmentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/detail")
    public ResponseEntity<Announcement> getAnnouncementDetail(@RequestParam Integer announcementId) {
        log.info("[Facility] Get Facility Detail: {}", announcementId);
        Announcement response = announcementService.getAnnouncementById(announcementId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    public ResponseEntity<Announcement> insertAnnouncement(@RequestBody Announcement announcement) {
        log.info("[Facility] Insert Facility: " + announcement.toString());
        Announcement newAnnouncement = announcementService.insertAnnouncement(announcement);
        return ResponseEntity.ok(newAnnouncement);
    }

    @PutMapping("")
    public ResponseEntity<Announcement> updateAnnouncement(@RequestParam Integer announcementId, @RequestBody Announcement announcement) {
        log.info("[Facility] Update Facility: " + announcement.toString());
        Announcement updatedAnnouncement = announcementService.updateAnnouncement(announcementId, announcement);
        return ResponseEntity.ok(updatedAnnouncement);
    }
    
}
