package com.com.aparteone.service;

import com.com.aparteone.dto.request.MailboxRequest;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.MailboxDetailRequest;
import com.com.aparteone.dto.response.MailboxDetailResponse;
import com.com.aparteone.entity.Mailbox;
import com.com.aparteone.entity.MailboxDetail;

public interface MailboxService {
    // Mailbox
    public PageResponse<Mailbox> getMailboxListByApartmentId(int page, int size, Boolean isActive, Integer apartmentId); 
    public Mailbox insertMailbox(MailboxRequest mailboxCategoryRequest);
    public Mailbox updateMailboxIsActive(Integer mailboxId, Boolean isActive);

    // Mailbox Request
    public PageResponse<MailboxDetailResponse> getMailboxDetailListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId);
    public PageResponse<MailboxDetailResponse> getMailboxDetailListByApartmentId(int page, int size, String sortBy, String sortDir, String status, Integer apartmentId);
    public MailboxDetailResponse getMailboxDetailById(Integer mailboxDetailId);
    public MailboxDetail insertMailboxDetail(MailboxDetailRequest mailboxDetailRequest);
    public MailboxDetail updateMailboxDetailStatusById(Integer mailboxDetailId, String status, String remarks);
}
