package com.com.aparteone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    Integer id;
    String role;
    String name;
    String email;
    String phone;
}
