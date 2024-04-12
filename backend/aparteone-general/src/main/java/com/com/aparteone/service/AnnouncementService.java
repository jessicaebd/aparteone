package com.com.aparteone.service;

import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.entity.Announcement;

public interface AnnouncementService {
    public PageDTO<Announcement> getAnnouncementListByApartmentId(int page, int size, String sortBy, String sortDir, Integer apartmentId);
    public Announcement getAnnouncementById(Integer announcementId);
    public Announcement insertAnnouncement(Announcement announcement);
    public Announcement updateAnnouncement(Integer announcementId, Announcement announcement);
}
