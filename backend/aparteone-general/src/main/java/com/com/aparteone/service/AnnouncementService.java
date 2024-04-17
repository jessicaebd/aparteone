package com.com.aparteone.service;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.AnnouncementRequest;
import com.com.aparteone.dto.response.AnnouncementResponse;
import com.com.aparteone.entity.Announcement;

public interface AnnouncementService {
    public Announcement addAnnouncement(AnnouncementRequest announcementRequest);
    public Announcement updateAnnouncement(Integer announcementId, AnnouncementRequest announcementRequest);
    public AnnouncementResponse getAnnouncementById(Integer announcementId);
    public PageResponse<AnnouncementResponse> getAnnouncementListByApartmentId(int page, int size, String sortBy, String sortDir, String criteria, Integer apartmentId);
}
