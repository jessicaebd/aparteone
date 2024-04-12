package com.com.aparteone.service;

import java.util.List;

import com.com.aparteone.dto.request.CartRequest;
import com.com.aparteone.dto.response.merchant.CartResponse;
import com.com.aparteone.entity.merchant.Cart;

public interface CartService {
    public List<CartResponse> getCartListByResidentId(Integer residentId);
    public Cart addToCart(CartRequest cartRequest);
    public Cart updateCart(Integer cartId, Integer quantity, String notes);
    public Cart deleteCart(Integer cartId);
}
