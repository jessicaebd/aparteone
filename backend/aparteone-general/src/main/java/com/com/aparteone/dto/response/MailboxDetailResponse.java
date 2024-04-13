package com.com.aparteone.dto.response;

import java.util.Date;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
public class MailboxDetailResponse {
    Integer id;
    Integer residentId;
    String residentName;
    String residentUnit;
    Integer mailboxId;
    String mailboxCategory;
    String description;
    String status;
    Date receivedDate;
    Date completedDate;
}
