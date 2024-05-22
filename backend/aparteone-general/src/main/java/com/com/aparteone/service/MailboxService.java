package com.com.aparteone.service;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.MailboxDetailRequest;
import com.com.aparteone.dto.request.category.MailboxCategoryRequest;
import com.com.aparteone.dto.response.MailboxDetailResponse;
import com.com.aparteone.dto.response.category.MailboxCategoryResponse;
import com.com.aparteone.entity.Mailbox;
import com.com.aparteone.entity.MailboxDetail;

public interface MailboxService {
    // Mailbox - Category
    public PageResponse<MailboxCategoryResponse> getMailboxListByApartmentId(int page, int size, String sortBy, String sortDir, Boolean isActive, Integer apartmentId); 
    public Mailbox addMailbox(MailboxCategoryRequest mailboxCategoryRequest);
    public Mailbox updateMailboxIsActive(Integer mailboxId, Boolean isActive);
    
    // Mailbox Request
    public PageResponse<MailboxDetailResponse> getMailboxDetailListByApartmentId(int page, int size, String sortBy, String sortDir, String status, Integer apartmentId, String search);
    public PageResponse<MailboxDetailResponse> getMailboxDetailListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId, String search);
    public MailboxDetailResponse getMailboxDetailById(Integer mailboxDetailId);
    public MailboxDetail addMailboxDetail(MailboxDetailRequest mailboxDetailRequest);
    public MailboxDetail updateMailboxDetailStatus(Integer mailboxDetailId, String status);

    public Integer countMailboxDetailByResidentId(Integer residentId);
}
