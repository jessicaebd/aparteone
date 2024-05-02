package com.com.aparteone.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.com.aparteone.constant.AparteoneConstant;
import com.com.aparteone.dto.MerchantResponse;
import com.com.aparteone.dto.base.PageResponse;
import com.com.aparteone.dto.request.ProductRequest;
import com.com.aparteone.dto.response.ProductResponse;
import com.com.aparteone.entity.Product;
import com.com.aparteone.repository.ProductRepo;
import com.com.aparteone.service.MerchantService;
import com.com.aparteone.service.ProductService;
import com.com.aparteone.specification.ProductSpecification;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private MerchantService merchantService;

    public Pageable pagination(int page, int size, String sortBy, String sortDir) {
        Pageable pageable = null;
        if (sortBy != null && sortDir != null) {
            pageable = PageRequest.of(page, size, sortDir.equals(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
        } else {
            pageable = PageRequest.of(page, size);
        }
        return pageable;
    }

    @Override
    public PageResponse<ProductResponse> searchProduct(int page, int size, String sortBy, String sortDir, Integer merchantId, String search) {
        Specification<Product> spec = Specification.where(ProductSpecification.hasMerchantId(merchantId)).and(ProductSpecification.hasName(search));
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<Product> products = productRepo.findAll(spec, pageable);

        List<ProductResponse> data = new ArrayList<>();
        products.forEach(product -> {
            data.add(getProductById(product.getId()));
        });

        PageResponse<ProductResponse> response = new PageResponse<>(
                products.getTotalElements(),
                products.getTotalPages(),
                products.getNumber(),
                products.getSize(),
                data);
        return response;
    }

    @Override
    public PageResponse<ProductResponse> getProductListByMerchantId(int page, int size, String sortBy, String sortDir, Integer merchantId) {
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<Product> products = productRepo.findByMerchantId(merchantId, pageable);

        List<ProductResponse> data = new ArrayList<>();
        products.forEach(product -> {
            MerchantResponse merchant = merchantService.getMerchantById(product.getMerchantId());
            ProductResponse response = new ProductResponse(
                    product.getId(),
                    merchant.getId(),
                    merchant.getName(),
                    product.getImage(),
                    product.getName(),
                    product.getPrice(),
                    product.getDescription(),
                    product.getIsActive() ? AparteoneConstant.STATUS_ACTIVE : AparteoneConstant.STATUS_INACTIVE);
            data.add(response);
        });

        PageResponse<ProductResponse> response = new PageResponse<>(
                products.getTotalElements(),
                products.getTotalPages(),
                products.getNumber(),
                products.getSize(),
                data);
        return response;
    }

    @Override
    public ProductResponse getProductById(Integer productId) {
        Product product = productRepo.findById(productId).get();
        MerchantResponse merchant = merchantService.getMerchantById(product.getMerchantId());

        ProductResponse response = new ProductResponse(
                product.getId(),
                merchant.getId(),
                merchant.getName(),
                product.getImage(),
                product.getName(),
                product.getPrice(),
                product.getDescription(),
                product.getIsActive() ? AparteoneConstant.STATUS_ACTIVE : AparteoneConstant.STATUS_INACTIVE);
        return response;
    }

    @Override
    public Product addProduct(ProductRequest productRequest) {
        Product product = new Product();
        product.setMerchantId(productRequest.getMerchantId());
        product.setImage(productRequest.getImage());
        product.setName(productRequest.getName());
        product.setPrice(productRequest.getPrice());
        product.setDescription(productRequest.getDescription());
        product.setIsActive(true);
        return productRepo.save(product);
    }

    @Override
    public Product updateProduct(Integer productId, Boolean isActive, ProductRequest productRequest) {
        Product product = productRepo.findById(productId).get();
        if (isActive != null) {
            product.setIsActive(isActive);
        }
        if (productRequest != null) {
            if (productRequest.getName() != null) {
                product.setName(productRequest.getName());
            }
            if (productRequest.getPrice() != null) {
                product.setPrice(productRequest.getPrice());
            }
            if (productRequest.getDescription() != null) {
                product.setDescription(productRequest.getDescription());
            }
            if(productRequest.getImage() != null) {
                product.setImage(productRequest.getImage());
            }
        }
        return productRepo.save(product);
    }

}
