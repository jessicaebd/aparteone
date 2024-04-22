package com.com.aparteone.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.com.aparteone.constant.AparteoneConstant;
import com.com.aparteone.dto.MerchantResponse;
import com.com.aparteone.dto.ResidentResponse;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.PaymentRequest;
import com.com.aparteone.dto.request.TransactionRequest;
import com.com.aparteone.dto.response.PaymentResponse;
import com.com.aparteone.dto.response.TransactionDetailResponse;
import com.com.aparteone.dto.response.TransactionResponse;
import com.com.aparteone.entity.Cart;
import com.com.aparteone.entity.Payment;
import com.com.aparteone.entity.Product;
import com.com.aparteone.entity.Transaction;
import com.com.aparteone.entity.TransactionDetail;
import com.com.aparteone.repository.CartRepo;
import com.com.aparteone.repository.PaymentRepo;
import com.com.aparteone.repository.ProductRepo;
import com.com.aparteone.repository.TransactionDetailRepo;
import com.com.aparteone.repository.TransactionRepo;
import com.com.aparteone.service.MerchantService;
import com.com.aparteone.service.ResidentService;
import com.com.aparteone.service.TransactionService;
import com.com.aparteone.specification.TransactionSpecification;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepo transactionRepo;

    @Autowired
    private TransactionDetailRepo transactionDetailRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private PaymentRepo paymentRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private ResidentService residentService;

    @Autowired
    private MerchantService merchantService;

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
    public PageResponse<TransactionResponse> getTransactionListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId) {
        Specification<Transaction> spec = Specification.where(TransactionSpecification.hasResidentId(residentId));
        if (status != null) {
            spec = spec.and(TransactionSpecification.hasStatus(status));
        }
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<Transaction> transactions = transactionRepo.findAll(spec, pageable);

        List<TransactionResponse> data = new ArrayList<>();
        transactions.forEach(transaction -> {
            data.add(getTransactionById(transaction.getId()));
        });

        PageResponse<TransactionResponse> response = new PageResponse<>(
                transactions.getTotalElements(),
                transactions.getTotalPages(),
                transactions.getNumber(),
                transactions.getSize(),
                data);
        return response;
    }

    @Override
    public PageResponse<TransactionResponse> getTransactionListByMerchantId(int page, int size, String sortBy, String sortDir, String status, Integer merchantId) {
        Specification<Transaction> spec = Specification.where(TransactionSpecification.hasMerchantId(merchantId));
        if (status != null) {
            spec = spec.and(TransactionSpecification.hasStatus(status));
        }
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<Transaction> transactions = transactionRepo.findAll(spec, pageable);

        List<TransactionResponse> data = new ArrayList<>();
        transactions.forEach(transaction -> {
            data.add(getTransactionById(transaction.getId()));
        });

        PageResponse<TransactionResponse> response = new PageResponse<>(
                transactions.getTotalElements(),
                transactions.getTotalPages(),
                transactions.getNumber(),
                transactions.getSize(),
                data);
        return response;
    }

    @Override
    public TransactionResponse getTransactionById(Integer transactionId) {
        Transaction transaction = transactionRepo.findById(transactionId).get();
        MerchantResponse merchant = merchantService.getMerchantById(transaction.getMerchantId());
        ResidentResponse resident = residentService.getResidentById(transaction.getResidentId());

        List<TransactionDetail> details = transactionDetailRepo.findByTransactionId(transactionId);
        List<TransactionDetailResponse> detailResponse = new ArrayList<>();
        details.forEach(detail -> {
            Product product = productRepo.findById(detail.getProductId()).get();
            TransactionDetailResponse response = new TransactionDetailResponse(
                    detail.getId(),
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    product.getDescription(),
                    detail.getQuantity(),
                    detail.getNotes(),
                    detail.getQuantity() * product.getPrice());
            detailResponse.add(response);
        });

        PaymentResponse paymentResponse = null;
        if(transaction.getPaymentId() != null) {
            Payment payment = paymentRepo.findById(transaction.getPaymentId()).get();

            paymentResponse = new PaymentResponse(
                payment.getId(),
                payment.getPaymentProofImage(),
                (payment.getIsValid() == true) ? AparteoneConstant.STATUS_VALID : AparteoneConstant.STATUS_INVALID,
                payment.getPaymentDate(),
                payment.getVerifiedDate()
            );
        }

        TransactionResponse response = new TransactionResponse(
            transaction.getId(),
            transaction.getResidentId(),
            resident.getName(),
            resident.getUnitNumber(),
            merchant.getId(),
            merchant.getName(),
            merchant.getCategory(),
            transaction.getGrandTotal(),
            transaction.getStatus(),
            transaction.getCreatedDate(),
            transaction.getDeliveredDate(),
            transaction.getCompletedDate(),
            transaction.getCancelledDate(),
            detailResponse,
            paymentResponse
        );
        return response;
    }
    
    @Override
    public Transaction updateTransactionStatus(Integer transactionId, String status) {
        Transaction transaction = transactionRepo.findById(transactionId).get();
        if (status.equalsIgnoreCase(AparteoneConstant.STATUS_ON_DELIVERY)) {
            transaction.setStatus(AparteoneConstant.STATUS_ON_DELIVERY);
            transaction.setDeliveredDate(new Date());
            transactionRepo.save(transaction);
        } else if (status.equalsIgnoreCase(AparteoneConstant.STATUS_COMPLETED)) {
            transaction.setStatus(AparteoneConstant.STATUS_COMPLETED);
            transaction.setCompletedDate(new Date());
            transactionRepo.save(transaction);
        } else if (status.equalsIgnoreCase(AparteoneConstant.STATUS_CANCELLED)) {
            transaction.setStatus(AparteoneConstant.STATUS_CANCELLED);
            transaction.setCancelledDate(new Date());
            transactionRepo.save(transaction);
        }
        return transaction;
    }

    @Override
    public Transaction checkout(TransactionRequest transactionRequest) {
        Transaction transaction = new Transaction();
        transaction.setResidentId(transactionRequest.getResidentId());
        transaction.setMerchantId(transactionRequest.getMerchantId());
        transactionRepo.save(transaction);
        
        Double[] grandTotal = {0.0};

        transactionRequest.getCarts().forEach(cartId -> {
            Cart cart = cartRepo.findById(cartId).get();
            Product product = productRepo.findById(cart.getProductId()).get();

            Double subTotal = cart.getQuantity() * product.getPrice();
            grandTotal[0] += subTotal;

            TransactionDetail detail = new TransactionDetail();
            detail.setTransactionId(transaction.getId());
            detail.setProductId(cart.getProductId());
            detail.setQuantity(cart.getQuantity());
            detail.setNotes(cart.getNotes());
            transactionDetailRepo.save(detail);

            cartRepo.delete(cart);
        });

        transaction.setGrandTotal(grandTotal[0]);
        transaction.setStatus(AparteoneConstant.STATUS_PENDING);
        transactionRepo.save(transaction);
        return transaction;
    }

    @Override
    public Transaction payment(PaymentRequest paymentRequest) {
        Transaction transaction = transactionRepo.findById(paymentRequest.getId()).get();
        Payment payment = new Payment();
        payment.setPaymentProofImage(paymentRequest.getPaymentProofImage());
        payment.setPaymentDate(new Date());
        payment.setIsValid(false);
        paymentRepo.save(payment);

        transaction.setPaymentId(payment.getId());
        transaction.setStatus(AparteoneConstant.STATUS_WAITING_CONFIRMATION);
        transactionRepo.save(transaction);
        return transaction;
    }

    @Override
    public Transaction verifyPayment(Integer transactionId, Boolean isValid) {
        Transaction transaction = transactionRepo.findById(transactionId).get();
        Payment payment = paymentRepo.findById(transaction.getPaymentId()).get();
        payment.setIsValid(isValid);
        payment.setVerifiedDate(new Date());
        paymentRepo.save(payment);

        transaction.setStatus((isValid == true) ? AparteoneConstant.STATUS_ON_PROCESS : AparteoneConstant.STATUS_CANCELLED);
        transactionRepo.save(transaction);
        return transaction;
    }
}
