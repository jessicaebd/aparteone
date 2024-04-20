package com.com.aparteone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.request.CartRequest;
import com.com.aparteone.dto.response.CartResponse;
import com.com.aparteone.entity.Cart;
import com.com.aparteone.service.CartService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("")
    public ResponseEntity<List<CartResponse>> getCartList(@RequestParam Integer residentId) {
        log.info("[Cart] Get Cart List: residentId-{}", residentId);
        List<CartResponse> response = cartService.getCartListByResidentId(residentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{residentId}/{merchantId}")
    public ResponseEntity<List<CartResponse>> getCartListPerMerchant(
            @PathVariable Integer residentId,
            @PathVariable Integer merchantId) {
        log.info("[Cart] Get Cart List Per Merchant: residentId-{}, merchantId-{}", residentId, merchantId);
        List<CartResponse> response = cartService.getCartListByResidentIdAndMerchantId(residentId, merchantId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestBody CartRequest cartRequest) {
        log.info("[Cart] Add To Cart: cartRequest-{}", cartRequest.toString());
        Cart response = cartService.addCart(cartRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update")
    public ResponseEntity<Cart> updateCart(
            @RequestParam Integer cartId,
            @RequestParam(required = false) Integer quantity,
            @RequestParam(required = false) String notes) {
        log.info("[Cart] Update Cart: cartId-{}, quantity-{}, notes-{}", cartId, quantity, notes);
        Cart response = cartService.updateCart(cartId, quantity, notes);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Cart> deleteCart(@RequestParam Integer cartId) {
        log.info("[Cart] Delete Cart: cartId-{}", cartId);
        Cart response = cartService.deleteCart(cartId);
        return ResponseEntity.ok(response);
    }
}
