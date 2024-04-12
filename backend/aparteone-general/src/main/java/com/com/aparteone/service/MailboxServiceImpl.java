package com.com.aparteone.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.com.aparteone.constant.AparteoneConstant;
import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.response.MailboxDetailResponse;
import com.com.aparteone.entity.Facility;
import com.com.aparteone.entity.Mailbox;
import com.com.aparteone.entity.MailboxDetail;
import com.com.aparteone.repository.MailboxDetailRepo;
import com.com.aparteone.repository.MailboxRepo;

@Service
public class MailboxServiceImpl implements MailboxService {

    @Autowired
    private MailboxRepo mailboxRepo;

    @Autowired
    private MailboxDetailRepo mailboxDetailRepo;

    @Override
    public PageDTO<Mailbox> getMailboxListByApartmentId(int page, int size, Integer apartmentId) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Mailbox> mailboxes = mailboxRepo.findByApartmentId(apartmentId, pageable);

        PageDTO<Mailbox> response = new PageDTO<>(
                mailboxes.getTotalElements(),
                mailboxes.getTotalPages(),
                mailboxes.getNumber(),
                mailboxes.getSize(),
                mailboxes.getContent());
        return response;
    }

    @Override
    public Mailbox insertMailbox(Mailbox mailbox) {
        return mailboxRepo.save(mailbox);
    }

    @Override
    public Mailbox updateMailboxIsActive(Integer mailboxId, Boolean isActive) {
        Mailbox mailbox = mailboxRepo.findById(mailboxId).get();
        mailbox.setIsActive(isActive);
        return mailboxRepo.save(mailbox);
    }

    @Override
    public PageDTO<MailboxDetailResponse> getMailboxDetailListByResidentId(int page, int size, String sortBy,
            String sortDir, Integer residentId) {
        Pageable pageable = null;
        if (sortBy != null && sortDir != null) {
            pageable = PageRequest.of(page, size,
                    sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                            : Sort.by(sortBy).descending());
        } else {
            pageable = PageRequest.of(page, size);
        }
        Page<MailboxDetail> mailboxDetails = mailboxDetailRepo.findByResidentId(residentId, pageable);

        List<MailboxDetailResponse> data = new ArrayList<>();
        if (mailboxDetails.getContent().size() > 0) {
            Mailbox mailbox = mailboxRepo.findById(mailboxDetails.getContent().get(0).getMailboxId())
                    .orElseThrow(() -> new RuntimeException("Mailbox not found"));
            for (MailboxDetail request : mailboxDetails.getContent()) {
                data.add(new MailboxDetailResponse(request, mailbox));
            }
        }

        PageDTO<MailboxDetailResponse> response = new PageDTO<>(
                mailboxDetails.getTotalElements(),
                mailboxDetails.getTotalPages(),
                mailboxDetails.getNumber(),
                mailboxDetails.getSize(),
                data);
        return response;
    }

    @Override
    public PageDTO<MailboxDetailResponse> getMailboxDetailListByApartmentId(int page, int size, String sortBy,
            String sortDir, Integer apartmentId) {
        Pageable pageable = null;
        if (sortBy != null && sortDir != null) {
            pageable = PageRequest.of(page, size,
                    sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                            : Sort.by(sortBy).descending());
        } else {
            pageable = PageRequest.of(page, size);
        }
        Page<MailboxDetail> mailboxDetails = mailboxDetailRepo.findByApartmentId(apartmentId, pageable);

        List<MailboxDetailResponse> data = new ArrayList<>();
        if (mailboxDetails.getContent().size() > 0) {
            Mailbox mailbox = mailboxRepo.findById(mailboxDetails.getContent().get(0).getMailboxId())
                    .orElseThrow(() -> new RuntimeException("Mailbox not found"));
            for (MailboxDetail request : mailboxDetails.getContent()) {
                data.add(new MailboxDetailResponse(request, mailbox));
            }
        }

        PageDTO<MailboxDetailResponse> response = new PageDTO<>(
                mailboxDetails.getTotalElements(),
                mailboxDetails.getTotalPages(),
                mailboxDetails.getNumber(),
                mailboxDetails.getSize(),
                data);
        return response;
    }

    @Override
    public MailboxDetailResponse getMailboxDetailById(Integer mailboxDetailId) {
        MailboxDetail mailboxDetail = mailboxDetailRepo.findById(mailboxDetailId).get();
        Mailbox mailbox = mailboxRepo.findById(mailboxDetail.getMailboxId()).get();
        return new MailboxDetailResponse(mailboxDetail, mailbox);
    }

    @Override
    public MailboxDetail insertMailboxDetail(MailboxDetail mailboxDetail) {
        return mailboxDetailRepo.save(mailboxDetail);
    }

    @Override
    public MailboxDetail updateMailboxDetailStatusById(Integer mailboxDetailId, String status, String remarks) {
        MailboxDetail mailboxDetail = mailboxDetailRepo.findById(mailboxDetailId).get();
        if(status == AparteoneConstant.STATUS_COMPLETED) {
            mailboxDetail.setStatus(status);
        }
        return mailboxDetailRepo.save(mailboxDetail);
    }

}
