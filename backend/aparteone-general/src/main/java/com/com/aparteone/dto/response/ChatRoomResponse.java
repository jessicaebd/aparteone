package com.com.aparteone.dto.response;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomResponse {
    Integer id;
    String chatId;
    Integer userId;
    String userName;
    @Lob
    String userimage;
}
