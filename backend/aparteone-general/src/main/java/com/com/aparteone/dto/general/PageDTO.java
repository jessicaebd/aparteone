package com.com.aparteone.dto.general;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageDTO<T> {
    private long totalElements;
    private int totalPages;
    private int pageNumber;
    private int pageSize;
    private List<T> data;
}
