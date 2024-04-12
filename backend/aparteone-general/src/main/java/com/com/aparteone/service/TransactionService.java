package com.com.aparteone.service;

import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.request.PaymentRequest;
import com.com.aparteone.dto.request.TransactionRequest;
import com.com.aparteone.dto.response.transaction.TransactionMerchantResponse;
import com.com.aparteone.dto.response.transaction.TransactionResidentResponse;
import com.com.aparteone.entity.transaction.Transaction;

public interface TransactionService {
    // Resident
    public PageDTO<TransactionResidentResponse> getTransactionListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId);
    public TransactionResidentResponse getTransactionResidentById(Integer transactionId);
    public Transaction checkout(TransactionRequest transactionRequest);
    public Transaction payment(PaymentRequest paymentRequest);

    // Merchant
    public PageDTO<TransactionMerchantResponse> getTransactionListByMerchantId(int page, int size, String sortBy, String sortDir, String status, Integer merchantId);
    public TransactionMerchantResponse getTransactionMerchantById(Integer transactionId);
    public Transaction updateTransactionStatus(Integer transactionId, String status);
    public Transaction verifyPayment(Integer transactionId, Boolean isValid);
}
