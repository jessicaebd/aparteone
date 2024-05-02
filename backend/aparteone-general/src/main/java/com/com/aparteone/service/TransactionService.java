package com.com.aparteone.service;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.PaymentRequest;
import com.com.aparteone.dto.request.TransactionRequest;
import com.com.aparteone.dto.response.TransactionResponse;
import com.com.aparteone.entity.Transaction;

public interface TransactionService {
    public PageResponse<TransactionResponse> getTransactionListByResidentId(int page, int size, String sortBy, String sortDir, String status, Integer residentId);
    public PageResponse<TransactionResponse> getTransactionListByMerchantId(int page, int size, String sortBy, String sortDir, String status, Integer merchantId);
    public TransactionResponse getTransactionById(Integer transactionId);
    public Transaction updateTransactionStatus(Integer transactionId, String status);
    public Transaction checkout(TransactionRequest transactionRequest);
    public Transaction payment(PaymentRequest paymentRequest);
    public Transaction verifyPayment(Integer transactionId, Boolean isValid);
    public Integer countTransactionByStatus(Integer merchantId, String status);
    public Integer countTotalIncome(Integer merchantId);
}
