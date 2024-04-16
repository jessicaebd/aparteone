package com.com.aparteone.dto.response;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
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
