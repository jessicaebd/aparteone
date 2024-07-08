package com.com.aparteone.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.com.aparteone.dto.ChatPayload;
import com.com.aparteone.entity.ChatMessage;
import com.com.aparteone.repository.ChatMessageRepo;
import com.com.aparteone.service.ChatMessageService;
import com.com.aparteone.service.ChatRoomService;
import com.com.aparteone.service.NotificationService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ChatMessageServiceImpl implements ChatMessageService {

    @Autowired
    private ChatMessageRepo chatMessageRepo;

    @Autowired
    private ChatRoomService chatRoomService;

    @Autowired
    private NotificationService notificationService;

    @Override
    public List<ChatMessage> getChatMessages(Integer senderId, Integer recipientId) {
        String chatId = chatRoomService.getChatRoomId(senderId, recipientId);
        List<ChatMessage> chatMessages = chatMessageRepo.findByChatIdOrderByCreatedDateAsc(chatId);
        return chatMessages;
    }

    @Override
    public ChatMessage save(ChatPayload chatMessage) {
        String chatId = chatRoomService.getChatRoomId(chatMessage.getSenderId(), chatMessage.getReceiverId());
        ChatMessage res = new ChatMessage();
        res.setChatId(chatId);
        res.setSenderId(chatMessage.getSenderId());
        res.setReceiverId(chatMessage.getReceiverId());
        res.setMessage(chatMessage.getMessage());
        chatMessageRepo.save(res);
        notificationService.sendNotification(chatMessage.getReceiverId(), "Chat", "You have a new message!");
        return res;
    }

}
