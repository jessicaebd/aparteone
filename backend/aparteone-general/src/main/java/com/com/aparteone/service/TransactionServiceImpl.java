package com.com.aparteone.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.com.aparteone.constant.AparteoneConstant;
import com.com.aparteone.dto.ResidentDTO;
import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.request.PaymentRequest;
import com.com.aparteone.dto.request.TransactionRequest;
import com.com.aparteone.dto.response.transaction.PaymentResponse;
import com.com.aparteone.dto.response.transaction.TransactionDetailResponse;
import com.com.aparteone.dto.response.transaction.TransactionMerchantResponse;
import com.com.aparteone.dto.response.transaction.TransactionResidentResponse;
import com.com.aparteone.entity.merchant.Cart;
import com.com.aparteone.entity.merchant.Merchant;
import com.com.aparteone.entity.merchant.Product;
import com.com.aparteone.entity.transaction.Payment;
import com.com.aparteone.entity.transaction.Transaction;
import com.com.aparteone.entity.transaction.TransactionDetail;
import com.com.aparteone.repository.merchant.CartRepo;
import com.com.aparteone.repository.merchant.MerchantRepo;
import com.com.aparteone.repository.merchant.PaymentRepo;
import com.com.aparteone.repository.merchant.ProductRepo;
import com.com.aparteone.repository.merchant.TransactionDetailRepo;
import com.com.aparteone.repository.merchant.TransactionRepo;
import com.com.aparteone.specification.TransactionSpecification;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepo transactionRepo;

    @Autowired
    private TransactionDetailRepo transactionDetailRepo;

    @Autowired
    private MerchantRepo merchantRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private PaymentRepo paymentRepo;

    @Autowired
    private CartRepo cartRepo;

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

    public TransactionDetailResponse mapTransactionDetailResponse(TransactionDetail detail) {
        Product product = productRepo.findById(detail.getProductId()).get();

        TransactionDetailResponse response = new TransactionDetailResponse(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getDescription(),
                detail.getQuantity(),
                detail.getNotes(),
                detail.getQuantity() * product.getPrice());

        return response;
    }

    public PaymentResponse checkPayment(Integer transactionId) {
        Payment payment = paymentRepo.findById(transactionId).get();
        PaymentResponse paymentResponse = null;
        if (payment != null) {
            paymentResponse = new PaymentResponse(
                    payment.getId(),
                    payment.getPaymentProofImage(),
                    (payment.getIsValid() == true) ? AparteoneConstant.STATUS_VALID : AparteoneConstant.STATUS_INVALID,
                    payment.getPaymentDate(),
                    payment.getVerifiedDate());
        }
        return paymentResponse;
    }

    @Override
    public TransactionResidentResponse getTransactionResidentById(Integer transactionId) {
        Transaction transaction = transactionRepo.findById(transactionId).get();
        Merchant merchant = merchantRepo.findById(transaction.getMerchantId()).get();
        PaymentResponse paymentResponse = checkPayment(transactionId);

        List<TransactionDetail> details = transactionDetailRepo.findByTransactionId(transactionId);
        List<TransactionDetailResponse> detailResponse = new ArrayList<>();
        details.forEach(detail -> {
            detailResponse.add(mapTransactionDetailResponse(detail));
        });

        TransactionResidentResponse response = new TransactionResidentResponse(
                transaction.getId(),
                transaction.getResidentId(),
                transaction.getMerchantId(),
                transaction.getCreatedDate(),
                merchant.getName(),
                merchant.getCategory(),
                transaction.getGrandTotal(),
                transaction.getStatus(),
                transaction.getDeliveredDate(),
                transaction.getCompletedDate(),
                transaction.getCancelledDate(),
                detailResponse,
                paymentResponse);

        return response;
    }

    @Override
    public PageDTO<TransactionResidentResponse> getTransactionListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId) {
        Specification<Transaction> spec = Specification.where(TransactionSpecification.hasResidentId(residentId));
        if (status != null) {
            spec = spec.and(TransactionSpecification.hasStatus(status));
        }
        Pageable pageable = pagination(page, size, sortBy, sortDir);

        Page<Transaction> transactions = transactionRepo.findAll(spec, pageable);
        List<TransactionResidentResponse> data = new ArrayList<>();
        transactions.forEach(transaction -> {
            TransactionResidentResponse transactionResponse = getTransactionResidentById(transaction.getId());
            data.add(transactionResponse);
        });

        PageDTO<TransactionResidentResponse> response = new PageDTO<>(
                transactions.getTotalElements(),
                transactions.getTotalPages(),
                transactions.getNumber(),
                transactions.getSize(),
                data);
        return response;
    }

    @Override
    public TransactionMerchantResponse getTransactionMerchantById(Integer transactionId) {
        Transaction transaction = transactionRepo.findById(transactionId).get();
        PaymentResponse paymentResponse = checkPayment(transactionId);
        ResidentDTO resident = residentService.getResidentById(transaction.getResidentId());

        List<TransactionDetail> details = transactionDetailRepo.findByTransactionId(transactionId);
        List<TransactionDetailResponse> detailResponse = new ArrayList<>();
        details.forEach(detail -> {
            detailResponse.add(mapTransactionDetailResponse(detail));
        });

        TransactionMerchantResponse response = new TransactionMerchantResponse(
                transaction.getId(),
                transaction.getMerchantId(),
                transaction.getResidentId(),
                transaction.getCreatedDate(),
                resident.getName(),
                resident.getUnitNumber(),
                transaction.getGrandTotal(),
                transaction.getStatus(),
                transaction.getDeliveredDate(),
                transaction.getCompletedDate(),
                transaction.getCancelledDate(),
                detailResponse,
                paymentResponse);

        return response;
    }

    @Override
    public PageDTO<TransactionMerchantResponse> getTransactionListByMerchantId(int page, int size, String sortBy, String sortDir, String status, Integer merchantId) {
        Specification<Transaction> spec = Specification.where(TransactionSpecification.hasMerchantId(merchantId));
        if (status != null) {
            spec = spec.and(TransactionSpecification.hasStatus(status));
        }
        Pageable pageable = pagination(page, size, sortBy, sortDir);

        Page<Transaction> transactions = transactionRepo.findAll(spec, pageable);
        List<TransactionMerchantResponse> data = new ArrayList<>();
        transactions.forEach(transaction -> {
            TransactionMerchantResponse transactionResponse = getTransactionMerchantById(transaction.getId());
            data.add(transactionResponse);
        });

        PageDTO<TransactionMerchantResponse> response = new PageDTO<>(
                transactions.getTotalElements(),
                transactions.getTotalPages(),
                transactions.getNumber(),
                transactions.getSize(),
                data);
        return response;
    }

    @Override
    public Transaction updateTransactionStatus(Integer transactionId, String status) {
        Transaction transaction = transactionRepo.findById(transactionId).get();

        if (transaction != null) {
            if (status == AparteoneConstant.STATUS_ON_DELIVERY) {
                transaction.setStatus(AparteoneConstant.STATUS_ON_DELIVERY);
                transaction.setDeliveredDate(new Date());
                transactionRepo.save(transaction);
            } else if (status == AparteoneConstant.STATUS_COMPLETED) {
                transaction.setStatus(AparteoneConstant.STATUS_COMPLETED);
                transaction.setCompletedDate(new Date());
                transactionRepo.save(transaction);
            } else if (status == AparteoneConstant.STATUS_CANCELLED) {
                transaction.setStatus(AparteoneConstant.STATUS_CANCELLED);
                transaction.setCancelledDate(new Date());
                transactionRepo.save(transaction);
            }
        }
        return transaction;
    }

    @Override
    public Transaction checkout(TransactionRequest transactionRequest) {
        Transaction transaction = new Transaction(transactionRequest);
        transactionRepo.save(transaction);
        
        Double[] grandTotal = {0.0};

        List<Integer> cartIds = transactionRequest.getCarts();
        cartIds.forEach(cartId -> {
            Cart cart = cartRepo.findById(cartId).get();
            Product product = productRepo.findById(cart.getProductId()).get();
            Double subTotal = cart.getQuantity() * product.getPrice();
            grandTotal[0] += subTotal;

            TransactionDetail detail = new TransactionDetail(transaction.getId(), cart);
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
        Transaction transaction = transactionRepo.findById(paymentRequest.getTransactionId()).get();
        if (transaction != null) {
            Payment payment = new Payment(
                    paymentRequest.getTransactionId(),
                    paymentRequest.getPaymentProofImage(),
                    new Date());
            paymentRepo.save(payment);

            transaction.setPaymentId(payment.getId());
            transactionRepo.save(transaction);
        }

        return transaction;
    }

    @Override
    public Transaction verifyPayment(Integer transactionId, Boolean isValid) {
        Transaction transaction = transactionRepo.findById(transactionId).get();
        Payment payment = paymentRepo.findById(transactionId).get();
        if (payment != null) {
            payment.setIsValid(isValid);
            payment.setVerifiedDate(new Date());
            paymentRepo.save(payment);

            transaction.setStatus(
                    (isValid == true) ? AparteoneConstant.STATUS_CONFIRMED : AparteoneConstant.STATUS_CANCELLED);
            transactionRepo.save(transaction);
        }
        return transaction;
    }
}
