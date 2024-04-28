package com.com.aparteone.service;

import java.util.List;

import com.com.aparteone.entity.ChatMessage;

public interface ChatMessageService {
    public List<ChatMessage> getChatMessages(Integer senderId, Integer recipientId);
    public ChatMessage save(ChatMessage chatMessage);
}
