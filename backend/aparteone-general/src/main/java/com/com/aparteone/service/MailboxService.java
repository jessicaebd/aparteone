package com.com.aparteone.service;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.category.MailboxCategoryRequest;
import com.com.aparteone.dto.response.category.MailboxCategoryResponse;
import com.com.aparteone.entity.Mailbox;

public interface MailboxService {
    // Mailbox - Category
    public Mailbox addMailbox(MailboxCategoryRequest mailboxCategoryRequest);
    public Mailbox updateMailboxIsActive(Integer mailboxId, Boolean isActive);
    public PageResponse<MailboxCategoryResponse> getMailboxListByApartmentId(int page, int size, String sortBy, String sortDir, Boolean isActive, Integer apartmentId); 
    

    // Mailbox Request
    // public PageResponse<MailboxDetailResponse> getMailboxDetailListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId);
    // public PageResponse<MailboxDetailResponse> getMailboxDetailListByApartmentId(int page, int size, String sortBy, String sortDir, String status, Integer apartmentId);
    // public MailboxDetailResponse getMailboxDetailById(Integer mailboxDetailId);
    // public MailboxDetail insertMailboxDetail(MailboxDetailRequest mailboxDetailRequest);
    // public MailboxDetail updateMailboxDetailStatusById(Integer mailboxDetailId, String status, String remarks);
}
