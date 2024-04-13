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

import com.com.aparteone.dto.general.PageDTO;
import com.com.aparteone.dto.request.ProductRequest;
import com.com.aparteone.dto.response.MerchantResponse;
import com.com.aparteone.dto.response.ProductResponse;
import com.com.aparteone.entity.Product;
import com.com.aparteone.entity.general.Apartment;
import com.com.aparteone.entity.general.Merchant;
import com.com.aparteone.repository.ProductRepo;
import com.com.aparteone.repository.general.ApartmentRepo;
import com.com.aparteone.repository.general.MerchantRepo;
import com.com.aparteone.service.MerchantService;
import com.com.aparteone.specification.MerchantSpecification;

@Service
public class MerchantServiceImpl implements MerchantService {

    @Autowired
    private ApartmentRepo apartmentRepo;

    @Autowired
    private MerchantRepo merchantRepo;

    @Autowired
    private ProductRepo productRepo;

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
    public PageDTO<MerchantResponse> searchMerchant(int page, int size, String sortBy, String sortDir, Integer apartmentId, String search) {
        Specification<Merchant> spec = Specification.where(MerchantSpecification.hasApartmentId(apartmentId));
        if (search != null) {
            spec = spec.and(MerchantSpecification.search(search));
        }
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<Merchant> merchants = merchantRepo.findAll(spec, pageable);

        List<MerchantResponse> data = new ArrayList<>();
        for (Merchant merchant : merchants.getContent()) {
            Apartment apartment = apartmentRepo.findById(merchant.getApartmentId()).get();
            data.add(new MerchantResponse(merchant, apartment));
        }

        PageDTO<MerchantResponse> response = new PageDTO<>(
                merchants.getTotalElements(),
                merchants.getTotalPages(),
                merchants.getNumber(),
                merchants.getSize(),
                data);
        return response;
    }

    @Override
    public PageDTO<MerchantResponse> getMerchantListByApartmentId(int page, int size, String sortBy, String sortDir, String category, Integer apartmentId) {
        Specification<Merchant> spec = Specification.where(MerchantSpecification.hasApartmentId(apartmentId));
        if (category != null) {
            spec = spec.and(MerchantSpecification.hasCategory(category));
        }
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<Merchant> merchants = merchantRepo.findAll(spec, pageable);

        List<MerchantResponse> data = new ArrayList<>();
        for (Merchant merchant : merchants.getContent()) {
            Apartment apartment = apartmentRepo.findById(merchant.getApartmentId()).get();
            data.add(new MerchantResponse(merchant, apartment));
        }

        PageDTO<MerchantResponse> response = new PageDTO<>(
                merchants.getTotalElements(),
                merchants.getTotalPages(),
                merchants.getNumber(),
                merchants.getSize(),
                data);
        return response;
    }

    @Override
    public PageDTO<ProductResponse> getProductListByMerchantId(int page, int size, String sortBy, String sortDir, Integer merchantId) {
        Pageable pageable = pagination(page, size, sortBy, sortDir);
        Page<Product> products = productRepo.findByMerchantId(merchantId, pageable);

        List<ProductResponse> data = new ArrayList<>();
        for (Product product : products.getContent()) {
            Merchant merchant = merchantRepo.findById(product.getMerchantId()).get();
            data.add(new ProductResponse(product, merchant));
        }

        PageDTO<ProductResponse> response = new PageDTO<>(
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
        Merchant merchant = merchantRepo.findById(product.getMerchantId()).get();
        return new ProductResponse(product, merchant);
    }

    @Override
    public Product addProduct(ProductRequest productRequest) {
        Product product = new Product(productRequest);
        return product;
    }

    @Override
    public Product updateProduct(Integer productId, ProductRequest productRequest) {
        Product product = productRepo.findById(productId).get();
        if (productRequest.getImage() != null) {
            product.setImage(productRequest.getImage());
        }
        if (productRequest.getName() != null) {
            product.setName(productRequest.getName());
        }
        if (productRequest.getPrice() != null) {
            product.setPrice(productRequest.getPrice());
        }
        if (productRequest.getDescription() != null) {
            product.setDescription(productRequest.getDescription());
        }
        if (productRequest.getIsActive() != null) {
            product.setIsActive(productRequest.getIsActive());
        }
        return product;
    }

}
