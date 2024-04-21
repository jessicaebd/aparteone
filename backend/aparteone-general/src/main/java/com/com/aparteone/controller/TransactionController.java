package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.PaymentRequest;
import com.com.aparteone.dto.request.TransactionRequest;
import com.com.aparteone.dto.response.TransactionResponse;
import com.com.aparteone.entity.Transaction;
import com.com.aparteone.service.TransactionService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/transaction")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @GetMapping("/resident")
    public ResponseEntity<PageResponse<TransactionResponse>> getResidentTransactionList(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "40") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "createdDate") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam Integer residentId) {
        log.info("[Transaction] Get Resident Transaction List: residentId-{} | status-{}", residentId, status);
        PageResponse<TransactionResponse> response = transactionService.getTransactionListByResidentId(page, size, sortBy, sortDir, status, residentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/merchant")
    public ResponseEntity<PageResponse<TransactionResponse>> getTransactionListByMerchantId(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "40") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "createdDate") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "DESC") String sortDir,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam Integer merchantId) {
        log.info("[Transaction] Get Merchant Transaction List: merchantId-{} | status-{}", merchantId, status);
        PageResponse<TransactionResponse> response = transactionService.getTransactionListByMerchantId(page, size, sortBy, sortDir, status, merchantId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/detail")
    public ResponseEntity<TransactionResponse> getTransactionDetail(@RequestParam Integer transactionId) {
        log.info("[Transaction] Get Transaction Detail: transactionId-{}", transactionId);
        TransactionResponse response = transactionService.getTransactionById(transactionId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update")
    public ResponseEntity<Transaction> updateTransactionStatus(
            @RequestParam Integer transactionId,
            @RequestParam String status) {
        log.info("[Transaction] Update Transaction Status: transactionId-{} | status-{status}", transactionId, status);
        Transaction response = transactionService.updateTransactionStatus(transactionId, status);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/checkout")
    public ResponseEntity<Transaction> checkout(@RequestBody TransactionRequest transactionRequest) {
        log.info("[Transaction] Checkout Transaction: transactionRequest-{}", transactionRequest.toString());
        Transaction response = transactionService.checkout(transactionRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/payment")
    public ResponseEntity<Transaction> payment(@RequestBody PaymentRequest paymentRequest) {
        log.info("[Transaction] Payment Transaction: paymentRequest-{}", paymentRequest.toString());
        Transaction response = transactionService.payment(paymentRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/payment/verify")
    public ResponseEntity<Transaction> verifyPayment(
            @RequestParam Integer transactionId,
            @RequestParam Boolean isValid) {
        log.info("[Transaction] Verify Payment Transaction: transactionId-{} | isValid-{}", transactionId, isValid);
        Transaction response = transactionService.verifyPayment(transactionId, isValid);
        return ResponseEntity.ok(response);
    }
}
