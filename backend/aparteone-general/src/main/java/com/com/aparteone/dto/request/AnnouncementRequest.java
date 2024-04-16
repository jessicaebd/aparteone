package com.com.aparteone.dto.request;

import java.util.Date;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnouncementRequest{
    private Integer apartmentId;
    @Lob
    private String image;
    private String title;
    @Lob
    private String description;
    private Date startDate;
    private Date endDate;
}
