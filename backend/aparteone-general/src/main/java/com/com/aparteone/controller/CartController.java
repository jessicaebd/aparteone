package com.com.aparteone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.request.CartRequest;
import com.com.aparteone.dto.response.merchant.CartResponse;
import com.com.aparteone.entity.merchant.Cart;
import com.com.aparteone.service.CartService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("")
    public ResponseEntity<List<CartResponse>> getCartListByResidentId(@RequestParam Integer residentId) {
        log.info("[Cart] Get Cart List By Resident Id: {}", residentId);
        List<CartResponse> response = cartService.getCartListByResidentId(residentId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestBody CartRequest cartRequest) {
        log.info("[Cart] Add To Cart: {}", cartRequest);
        Cart response = cartService.addToCart(cartRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update")
    public ResponseEntity<Cart> updateCart(@RequestParam Integer cartId, @RequestParam Integer quantity, @RequestParam String notes) {
        log.info("[Cart] Update Cart: {}", cartId);
        Cart response = cartService.updateCart(cartId, quantity, notes);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Cart> deleteCart(@RequestParam Integer cartId) {
        log.info("[Cart] Delete Cart: {}", cartId);
        Cart response = cartService.deleteCart(cartId);
        return ResponseEntity.ok(response);
    }
}
