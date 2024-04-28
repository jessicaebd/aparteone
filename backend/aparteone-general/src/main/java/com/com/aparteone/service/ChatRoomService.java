package com.com.aparteone.service;

import java.util.List;

import com.com.aparteone.dto.response.ChatRoomResponse;

public interface ChatRoomService {
    public List<ChatRoomResponse> getChatRoomList(Integer userId);
    public String getChatRoomId(Integer senderId, Integer receiverId);
    public String createChatId(Integer senderId, Integer receiverId);
}
