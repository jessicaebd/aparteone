package com.com.aparteone.service;

import java.util.List;

import com.com.aparteone.dto.ChatPayload;
import com.com.aparteone.dto.response.ChatRoomResponse;
import com.com.aparteone.entity.ChatMessage;

public interface ChatService {
    // Chat Room
    public List<ChatRoomResponse> getChatRoomList(Integer userId);
    public String getChatRoomId(Integer senderId, Integer receiverId);
    public String createChatId(Integer senderId, Integer receiverId);

    // Chat Message
    public List<ChatMessage> getChatMessages(Integer senderId, Integer recipientId);
    public ChatMessage save(ChatPayload chatMessage);
}
