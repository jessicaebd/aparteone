package com.com.aparteone.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.com.aparteone.constant.AparteoneConstant;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.category.MailboxCategoryRequest;
import com.com.aparteone.dto.response.category.MailboxCategoryResponse;
import com.com.aparteone.entity.Mailbox;
import com.com.aparteone.repository.MailboxDetailRepo;
import com.com.aparteone.repository.MailboxRepo;
import com.com.aparteone.service.MailboxService;
import com.com.aparteone.service.general.ResidentService;
import com.com.aparteone.specification.MailboxSpecification;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MailboxServiceImpl implements MailboxService {

    @Autowired
    private MailboxRepo mailboxRepo;

    @Autowired
    private MailboxDetailRepo mailboxDetailRepo;

    @Autowired
    private ResidentService residentService;

    public Pageable pagination(int page, int size, String sortBy, String sortDir) {
        Pageable pageable = null;
        if (sortBy != null && sortDir != null) {
            pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        } else {
            pageable = PageRequest.of(page, size);
        }
        return pageable;
    }

    @Override
    public Mailbox addMailbox(MailboxCategoryRequest mailboxCategoryRequest) {
        Mailbox mailbox = new Mailbox();
        mailbox.setApartmentId(mailboxCategoryRequest.getApartmentId());
        mailbox.setCategory(mailboxCategoryRequest.getCategory());
        mailbox.setIsActive(true);
        return mailboxRepo.save(mailbox);
    }

    @Override
    public Mailbox updateMailboxIsActive(Integer mailboxId, Boolean isActive) {
        Mailbox mailbox = mailboxRepo.findById(mailboxId).get();
        mailbox.setIsActive(isActive);
        return mailboxRepo.save(mailbox);
    }

    @Override
    public PageResponse<MailboxCategoryResponse> getMailboxListByApartmentId(int page, int size, String sortBy, String sortDir, Boolean isActive, Integer apartmentId) {
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Specification<Mailbox> spec = Specification.where(MailboxSpecification.hasApartmentId(apartmentId));
        if (isActive != null) {
            spec = spec.and(MailboxSpecification.isActive(isActive));
        }
        Page<Mailbox> mailboxes = mailboxRepo.findAll(spec, pageable);

        List<MailboxCategoryResponse> data = new ArrayList<>();
        mailboxes.getContent().forEach(mailbox -> {
            data.add(new MailboxCategoryResponse(
                    mailbox.getId(),
                    mailbox.getApartmentId(),
                    mailbox.getCategory(),
                    mailbox.getIsActive() ? AparteoneConstant.STATUS_ACTIVE : AparteoneConstant.STATUS_INACTIVE,
                    mailbox.getCreatedDate(),
                    mailbox.getModifiedDate()));
        });

        PageResponse<MailboxCategoryResponse> response = new PageResponse<>(
                mailboxes.getTotalElements(),
                mailboxes.getTotalPages(),
                mailboxes.getNumber(),
                mailboxes.getSize(),
                data);
        return response;
    }





    
    // @Override
    // public PageResponse<MailboxDetailResponse>
    // getMailboxDetailListByResidentId(int page, int size, String sortBy, String
    // sortDir, String status, Integer residentId) {
    // Specification<MailboxDetail> spec =
    // Specification.where(MailboxSpecification.hasResidentId(residentId));
    // if (status != null) {
    // if (status.equals(AparteoneConstant.STATUS_RECEIVED)) {
    // spec = spec.and(MailboxSpecification.isReceived());
    // } else if (status.equals(AparteoneConstant.STATUS_COMPLETED)) {
    // spec = spec.and(MailboxSpecification.isCompleted());
    // }
    // }
    // Pageable pageable = pagination(page, size, sortBy, sortDir);
    // Page<MailboxDetail> mailboxDetails = mailboxDetailRepo.findAll(spec,
    // pageable);

    // List<MailboxDetailResponse> data = new ArrayList<>();
    // mailboxDetails.getContent().forEach(request -> {
    // data.add(getMailboxDetailById(request.getId()));
    // });

    // PageResponse<MailboxDetailResponse> response = new PageResponse<>(
    // mailboxDetails.getTotalElements(),
    // mailboxDetails.getTotalPages(),
    // mailboxDetails.getNumber(),
    // mailboxDetails.getSize(),
    // data);
    // return response;
    // }

    // @Override
    // public PageResponse<MailboxDetailResponse>
    // getMailboxDetailListByApartmentId(int page, int size, String sortBy, String
    // sortDir, String status, Integer apartmentId) {
    // Pageable pageable = pagination(page, size, sortBy, sortDir);
    // Page<MailboxDetail> mailboxDetails = null;
    // if (status != null) {
    // mailboxDetails = mailboxDetailRepo.findByApartmentIdAndStatus(apartmentId,
    // status, pageable);
    // } else {
    // mailboxDetails = mailboxDetailRepo.findByApartmentId(apartmentId, pageable);
    // }

    // List<MailboxDetailResponse> data = new ArrayList<>();
    // mailboxDetails.getContent().forEach(request -> {
    // data.add(getMailboxDetailById(request.getId()));
    // });

    // PageResponse<MailboxDetailResponse> response = new PageResponse<>(
    // mailboxDetails.getTotalElements(),
    // mailboxDetails.getTotalPages(),
    // mailboxDetails.getNumber(),
    // mailboxDetails.getSize(),
    // data);
    // return response;
    // }

    // @Override
    // public MailboxDetailResponse getMailboxDetailById(Integer mailboxDetailId) {
    // MailboxDetail mailboxDetail =
    // mailboxDetailRepo.findById(mailboxDetailId).get();
    // Mailbox mailbox = mailboxRepo.findById(mailboxDetail.getMailboxId()).get();
    // ResidentDTO resident =
    // residentService.getResidentById(mailboxDetail.getResidentId());

    // MailboxDetailResponse response = new MailboxDetailResponse(
    // mailboxDetail.getId(),
    // resident.getId(),
    // resident.getName(),
    // resident.getUnitNumber(),
    // mailbox.getId(),
    // mailbox.getCategory(),
    // mailboxDetail.getDescription(),
    // mailboxDetail.getStatus(),
    // mailboxDetail.getReceivedDate(),
    // mailboxDetail.getCompletedDate()
    // );
    // return response;
    // }

    // @Override
    // public MailboxDetail insertMailboxDetail(MailboxDetailRequest request) {
    // MailboxDetail mailboxDetail = new MailboxDetail(request);
    // mailboxDetail.setStatus(AparteoneConstant.STATUS_RECEIVED);
    // mailboxDetail.setReceivedDate(new Date());
    // return mailboxDetailRepo.save(mailboxDetail);
    // }

    // @Override
    // public MailboxDetail updateMailboxDetailStatusById(Integer mailboxDetailId,
    // String status, String remarks) {
    // MailboxDetail mailboxDetail =
    // mailboxDetailRepo.findById(mailboxDetailId).get();
    // if (status == AparteoneConstant.STATUS_COMPLETED) {
    // mailboxDetail.setStatus(status);
    // mailboxDetail.setCompletedDate(new Date());
    // }
    // if (remarks != null) {
    // mailboxDetail.setDescription(remarks);
    // }
    // return mailboxDetailRepo.save(mailboxDetail);
    // }

}
