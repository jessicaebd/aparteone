package com.com.aparteone.service;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.PaymentRequest;
import com.com.aparteone.dto.request.TransactionRequest;
import com.com.aparteone.dto.response.TransactionMerchantResponse;
import com.com.aparteone.dto.response.TransactionResidentResponse;
import com.com.aparteone.entity.Transaction;

public interface TransactionService {
    // Resident
    public PageResponse<TransactionResidentResponse> getTransactionListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId);
    public TransactionResidentResponse getTransactionResidentById(Integer transactionId);
    public Transaction checkout(TransactionRequest transactionRequest);
    public Transaction payment(PaymentRequest paymentRequest);

    // Merchant
    public PageResponse<TransactionMerchantResponse> getTransactionListByMerchantId(int page, int size, String sortBy, String sortDir, String status, Integer merchantId);
    public TransactionMerchantResponse getTransactionMerchantById(Integer transactionId);
    public Transaction updateTransactionStatus(Integer transactionId, String status);
    public Transaction verifyPayment(Integer transactionId, Boolean isValid);
}
