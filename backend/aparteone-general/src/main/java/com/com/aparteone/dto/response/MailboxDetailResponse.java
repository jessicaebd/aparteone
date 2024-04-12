package com.com.aparteone.dto.response;

import java.util.Date;

import com.com.aparteone.entity.Mailbox;
import com.com.aparteone.entity.MailboxDetail;
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
    Integer mailboxId;
    String mailboxCategory;
    String description;
    String status;
    String location;
    Date arrivedDate;
    Date completedDate;

    public MailboxDetailResponse(MailboxDetail request, Mailbox mailbox) {
        this.id = request.getId();
        this.mailboxId = mailbox.getId();
        this.mailboxCategory = mailbox.getCategory();
        this.description = request.getDescription();
        this.status = request.getStatus();
        this.location = request.getLocation();
        this.arrivedDate = request.getArrivedDate();
        this.completedDate = request.getCompletedDate();
    }
}
