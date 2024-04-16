package com.com.aparteone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.com.aparteone.entity.ChatMessage;
import com.com.aparteone.repository.ChatMessageRepo;

@Service
public class ChatMessageService {
    @Autowired
    private ChatMessageRepo chatMessageRepo;

    @Autowired
    private ChatRoomService chatRoomService;

    public ChatMessage save(ChatMessage chatMessage) {
        ChatMessage response = chatMessageRepo.save(chatMessage);
        return response;
    }

    public List<ChatMessage> findChatMessages(Integer senderId, Integer receiverId) {
        String chatId = chatRoomService.getChatId(senderId, receiverId, false);
        List<ChatMessage> response = chatMessageRepo.findByChatId(chatId);
        return response;
    }
}
