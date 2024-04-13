package com.com.aparteone.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MailboxCategoryRequest {
    private Integer apartmentId;
    private String category;
    private Boolean isActive;
}
