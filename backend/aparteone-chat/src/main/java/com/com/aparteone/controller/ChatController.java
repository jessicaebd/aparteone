package com.com.aparteone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.com.aparteone.entity.ChatMessage;
import com.com.aparteone.service.ChatMessageService;
import com.com.aparteone.service.ChatRoomService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/api/chat")
public class ChatController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatMessageService chatMessageService;

    @Autowired
    private ChatRoomService chatRoomService;

    @MessageMapping("/send")
    public ChatMessage processMessage(@Payload ChatMessage chatMessage) {
        ChatMessage response = chatMessageService.save(chatMessage);
        // messagingTemplate.convertAndSendToUser(
        //         chatMessage.getReceiverId(), "/queue/messages",
        //         new ChatNotification(
        //                 response.getId(),
        //                 response.getSenderId(),
        //                 response.getReceiverId(),
        //                 response.getMessage()
        //         )
        // );
        return response;
    }

    @GetMapping("/messages")
    public ResponseEntity<List<ChatMessage>> findChatMessages(
        @RequestParam Integer senderId, 
        @RequestParam Integer recipientId) {
        log.info("[Chat] Find Chat Messages: senderId={}, recipientId={}", senderId, recipientId);
        return ResponseEntity.ok(chatMessageService.findChatMessages(senderId, recipientId));
    }
}

