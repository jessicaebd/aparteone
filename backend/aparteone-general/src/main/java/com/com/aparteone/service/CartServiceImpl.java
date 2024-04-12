package com.com.aparteone.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.com.aparteone.dto.request.CartRequest;
import com.com.aparteone.dto.response.merchant.CartResponse;
import com.com.aparteone.dto.response.merchant.ProductResponse;
import com.com.aparteone.entity.merchant.Cart;
import com.com.aparteone.repository.merchant.CartRepo;

@Service
public class CartServiceImpl implements CartService {
    
    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private MerchantService merchantService;

    @Override
    public List<CartResponse> getCartListByResidentId(Integer residentId) {
        List<Cart> carts = cartRepo.findByResidentId(residentId);
        List<CartResponse> response = new ArrayList<>();
        carts.forEach(cart -> {
            ProductResponse product = merchantService.getProductById(cart.getProductId());
            response.add(new CartResponse(
                    cart.getId(),
                    cart.getResidentId(),
                    product.getMerchantId(),
                    product.getMerchantName(),
                    cart.getProductId(),
                    product.getImage(),
                    product.getName(),
                    product.getPrice(),
                    cart.getQuantity(),
                    cart.getNotes(),
                    product.getPrice() * cart.getQuantity()));
        });
        return response;
    }

    @Override
    public Cart addToCart(CartRequest cartRequest) {
        Cart cart = new Cart(cartRequest);
        return cartRepo.save(cart);
    }

    @Override
    public Cart updateCart(Integer cartId, Integer quantity, String notes) {
        Cart cart = cartRepo.findById(cartId).get();
        if (quantity != null) {
            cart.setQuantity(quantity);
        }

        if (notes != null) {
            cart.setNotes(notes);
        }
        return cartRepo.save(cart);
    }

    @Override
    public Cart deleteCart(Integer cartId) {
        Cart cart = cartRepo.findById(cartId).get();
        cartRepo.delete(cart);
        return cart;
    }
}
