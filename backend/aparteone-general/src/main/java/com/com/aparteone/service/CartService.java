package com.com.aparteone.service;

import java.util.List;

import com.com.aparteone.dto.request.CartRequest;
import com.com.aparteone.dto.response.CartResponse;
import com.com.aparteone.entity.Cart;

public interface CartService {
    public List<CartResponse> getCartListByResidentId(Integer residentId);
    public List<CartResponse> getCartListByResidentIdAndMerchantId(Integer residentId, Integer merchantId);
    public Cart addCart(CartRequest cartRequest);
    public Cart updateCart(Integer cartId, Integer quantity, String notes);
    public Cart deleteCart(Integer cartId);
}
