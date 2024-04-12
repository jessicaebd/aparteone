package com.com.aparteone.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.com.aparteone.constant.AparteoneConstant;
import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.request.AnnouncementRequest;
import com.com.aparteone.dto.response.AnnouncementResponse;
import com.com.aparteone.entity.Announcement;
import com.com.aparteone.repository.AnnouncementRepo;
import com.com.aparteone.specification.AnnouncementSpecification;

@Service
public class AnnouncementServiceImpl implements AnnouncementService {

    @Autowired
    private AnnouncementRepo announcementRepo;

    public Pageable pagination(int page, int size, String sortBy, String sortDir) {
        Pageable pageable = null;
        if (sortBy != null && sortDir != null) {
            pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        } else {
            pageable = PageRequest.of(page, size);
        }
        return pageable;
    }

    @Override
    public PageDTO<AnnouncementResponse> getAnnouncementListByApartmentId(int page, int size, String sortBy, String sortDir, String criteria, Integer apartmentId) {
        Specification<Announcement> spec = Specification.where(AnnouncementSpecification.hasApartmentId(apartmentId));
        if (criteria != null) {
            if (criteria.equals(AparteoneConstant.STATUS_ACTIVE)) {
                spec = spec.and(AnnouncementSpecification.isStarted(new Date())).and(AnnouncementSpecification.isActive(new Date()));
            } else if (criteria.equals(AparteoneConstant.STATUS_INACTIVE)) {
                spec = spec.and(AnnouncementSpecification.isInactive(new Date()));
            }
        }
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<Announcement> announcements = announcementRepo.findAll(spec, pageable);
        List<AnnouncementResponse> data = new ArrayList<>();

        announcements.forEach(announcement -> {
            String status = (announcement.getEndDate().before(new Date())) ? AparteoneConstant.STATUS_INACTIVE : AparteoneConstant.STATUS_ACTIVE;
            AnnouncementResponse response = new AnnouncementResponse(
                    announcement.getId(),
                    announcement.getApartmentId(),
                    announcement.getImage(),
                    announcement.getTitle(),
                    announcement.getDescription(),
                    announcement.getStartDate(),
                    announcement.getEndDate(),
                    status,
                    announcement.getCreatedDate(),
                    announcement.getModifiedDate());
            data.add(response);
        });

        PageDTO<AnnouncementResponse> response = new PageDTO<>(
                announcements.getTotalElements(),
                announcements.getTotalPages(),
                announcements.getNumber(),
                announcements.getSize(),
                data);
        return response;
    }

    @Override
    public AnnouncementResponse getAnnouncementById(Integer announcementId) {
        Announcement announcement = announcementRepo.findById(announcementId).get();
        AnnouncementResponse response = null;
        if(announcement != null) {
            String status = (announcement.getEndDate().before(new Date())) ? AparteoneConstant.STATUS_INACTIVE : AparteoneConstant.STATUS_ACTIVE;
            response = new AnnouncementResponse(
                    announcement.getId(),
                    announcement.getApartmentId(),
                    announcement.getImage(),
                    announcement.getTitle(),
                    announcement.getDescription(),
                    announcement.getStartDate(),
                    announcement.getEndDate(),
                    status,
                    announcement.getCreatedDate(),
                    announcement.getModifiedDate());
        }
        return response;
    }

    @Override
    public Announcement insertAnnouncement(AnnouncementRequest announcementRequest) {
        Announcement announcement = new Announcement(announcementRequest);
        return announcementRepo.save(announcement);
    }

    @Override
    public Announcement updateAnnouncement(Integer announcementId, AnnouncementRequest announcementRequest) {
        Announcement announcement = announcementRepo.findById(announcementId).get();
        if(announcementRequest.getImage() != null) {
            announcement.setImage(announcementRequest.getImage());
        }
        if(announcementRequest.getTitle() != null) {
            announcement.setTitle(announcementRequest.getTitle());
        }
        if(announcementRequest.getDescription() != null) {
            announcement.setDescription(announcementRequest.getDescription());
        }
        if(announcementRequest.getStartDate() != null) {
            announcement.setStartDate(announcementRequest.getStartDate());
        }
        if(announcementRequest.getEndDate() != null) {
            announcement.setEndDate(announcementRequest.getEndDate());
        }
        return announcementRepo.save(announcement);
    }
}
