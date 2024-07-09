package com.com.aparteone.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatPayload {
    private Integer senderId;
    private Integer receiverId;
    private String message;
}
