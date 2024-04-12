package com.com.aparteone.service;

import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.request.AnnouncementRequest;
import com.com.aparteone.dto.response.AnnouncementResponse;
import com.com.aparteone.entity.Announcement;

public interface AnnouncementService {
    public PageDTO<AnnouncementResponse> getAnnouncementListByApartmentId(int page, int size, String sortBy, String sortDir, String criteria, Integer apartmentId);
    public AnnouncementResponse getAnnouncementById(Integer announcementId);
    public Announcement insertAnnouncement(AnnouncementRequest announcementRequest);
    public Announcement updateAnnouncement(Integer announcementId, AnnouncementRequest announcementRequest);
}
