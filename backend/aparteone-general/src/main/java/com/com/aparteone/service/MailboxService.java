package com.com.aparteone.service;

import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.response.MailboxDetailResponse;
import com.com.aparteone.entity.Mailbox;
import com.com.aparteone.entity.MailboxDetail;

public interface MailboxService {
    // Mailbox
    public PageDTO<Mailbox> getMailboxListByApartmentId(int page, int size, Integer apartmentId); 
    public Mailbox insertMailbox(Mailbox mailbox);
    public Mailbox updateMailboxIsActive(Integer mailboxId, Boolean isActive);

    // Mailbox Request
    public PageDTO<MailboxDetailResponse> getMailboxDetailListByResidentId(int page, int size, String sortBy, String sortDir, Integer residentId);
    public PageDTO<MailboxDetailResponse> getMailboxDetailListByApartmentId(int page, int size, String sortBy, String sortDir, Integer apartmentId);
    public MailboxDetailResponse getMailboxDetailById(Integer mailboxDetailId);
    public MailboxDetail insertMailboxDetail(MailboxDetail mailboxDetail);
    public MailboxDetail updateMailboxDetailStatusById(Integer mailboxDetailId, String status, String remarks);
}
