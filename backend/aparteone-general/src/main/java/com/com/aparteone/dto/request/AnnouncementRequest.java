package com.com.aparteone.dto.request;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnouncementRequest{
    private Integer apartmentId;
    private String image;
    private String title;
    private String description;
    private Date startDate;
    private Date endDate;
}
