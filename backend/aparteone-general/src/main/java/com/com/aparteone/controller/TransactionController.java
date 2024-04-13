package com.com.aparteone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.request.PaymentRequest;
import com.com.aparteone.dto.request.TransactionRequest;
import com.com.aparteone.dto.response.TransactionMerchantResponse;
import com.com.aparteone.dto.response.TransactionResidentResponse;
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
    public ResponseEntity<PageDTO<TransactionResidentResponse>> getTransactionListByResidentId(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "40") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "createdDate") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "desc") String sortDir,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam Integer residentId) {
        log.info("[Transaction][Resident] Get Transaction List By Resident Id: {}", residentId);
        PageDTO<TransactionResidentResponse> response = transactionService.getTransactionListByResidentId(page, size, sortBy, sortDir, status, residentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/resident/detail")
    public ResponseEntity<TransactionResidentResponse> getTransactionResidentDetail(@RequestParam Integer transactionId) {
        log.info("[Transaction][Resident] Get Transaction Detail By Transaction Id: {}", transactionId);
        TransactionResidentResponse response = transactionService.getTransactionResidentById(transactionId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/merchant")
    public ResponseEntity<PageDTO<TransactionMerchantResponse>> getTransactionListByMerchantId(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "size", required = false, defaultValue = "40") int size,
            @RequestParam(value = "sortBy", required = false, defaultValue = "createdDate") String sortBy,
            @RequestParam(value = "sortDir", required = false, defaultValue = "desc") String sortDir,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam Integer merchantId) {
        log.info("[Transaction][Merchant] Get Transaction List By Merchant Id: {}", merchantId);
        PageDTO<TransactionMerchantResponse> response = transactionService.getTransactionListByMerchantId(page, size, sortBy, sortDir, status, merchantId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/merchant/detail")
    public ResponseEntity<TransactionMerchantResponse> getTransactionMerchantDetail(@RequestParam Integer transactionId) {
        log.info("[Transaction][Merchant] Get Transaction Detail By Transaction Id: {}", transactionId);
        TransactionMerchantResponse response = transactionService.getTransactionMerchantById(transactionId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update-status")
    public ResponseEntity<Transaction> updateTransactionStatus(@RequestParam Integer transactionId, @RequestParam String status) {
        log.info("[Transaction][Merchant] Update Transaction Status: {}", transactionId);
        Transaction response = transactionService.updateTransactionStatus(transactionId, status);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/checkout")
    public ResponseEntity<Transaction> checkout(@RequestBody TransactionRequest transactionRequest) {
        log.info("[Transaction][Resident] Checkout: {}", transactionRequest);
        Transaction response = transactionService.checkout(transactionRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/payment")
    public ResponseEntity<Transaction> payment(@RequestBody PaymentRequest paymentRequest) {
        log.info("[Transaction][Resident] Payment: {}", paymentRequest);
        Transaction response = transactionService.payment(paymentRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-payment")
    public ResponseEntity<Transaction> verifyPayment(@RequestParam Integer transactionId, @RequestParam Boolean isValid) {
        log.info("[Transaction][Merchant] Verify Payment: {}", transactionId);
        Transaction response = transactionService.verifyPayment(transactionId, isValid);
        return ResponseEntity.ok(response);
    }
}
