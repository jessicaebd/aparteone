package com.com.aparteone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.entity.Announcement;
import com.com.aparteone.repository.AnnouncementRepo;

@Service
public class AnnouncementServiceImpl implements AnnouncementService {

    @Autowired
    private AnnouncementRepo announcementRepo;

    @Override
    public PageDTO<Announcement> getAnnouncementListByApartmentId(int page, int size, String sortBy, String sortDir, Integer apartmentId) {
        Pageable pageable = null;
        if (sortBy != null && sortDir != null) {
            pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        } else {
            pageable = PageRequest.of(page, size);
        }
        Page<Announcement> announcements = announcementRepo.findByApartmentId(apartmentId, pageable);

        PageDTO<Announcement> response = new PageDTO<Announcement>(
                announcements.getTotalElements(),
                announcements.getTotalPages(),
                announcements.getNumber(),
                announcements.getSize(),
                announcements.getContent()
                );
        return response;
    }

    @Override
    public Announcement getAnnouncementById(Integer announcementId) {
        return announcementRepo.findById(announcementId).get();
    }

    @Override
    public Announcement insertAnnouncement(Announcement announcement) {
        return announcementRepo.save(announcement);
    }

    @Override
    public Announcement updateAnnouncement(Integer announcementId, Announcement announcement) {
        Announcement existingAnnouncement = announcementRepo.findById(announcementId).get();

        if(announcement.getDescription() != null) {
            existingAnnouncement.setDescription(announcement.getDescription());
        } else if(announcement.getEndDate() != null) {
            existingAnnouncement.setEndDate(announcement.getEndDate());
        }
        
        return announcementRepo.save(announcement);
    }
}
