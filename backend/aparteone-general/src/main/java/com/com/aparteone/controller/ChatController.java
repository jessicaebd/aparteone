package com.com.aparteone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.com.aparteone.dto.response.ChatRoomResponse;
import com.com.aparteone.entity.ChatMessage;
import com.com.aparteone.service.ChatMessageService;
import com.com.aparteone.service.ChatRoomService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/chat")
public class ChatController {
    @Autowired
    private ChatMessageService chatMessageService;

    @Autowired
    private ChatRoomService chatRoomService;

    // Local Testing
    @PostMapping("/send")
    public ChatMessage sendMessageLocal(@RequestBody ChatMessage chatMessage) {
        log.info("[Chat] Process Message: {}", chatMessage);
        ChatMessage response = chatMessageService.save(chatMessage);
        return response;
    }

    @MessageMapping("/send")
    @SendTo("/send/message")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        log.info("[Chat] Process Message: {}", chatMessage);
        ChatMessage response = chatMessageService.save(chatMessage);
        return response;
    }

    @GetMapping("/messages")
    public ResponseEntity<List<ChatMessage>> getChatMessages(
            @RequestParam Integer senderId,
            @RequestParam Integer receiverId) {
        log.info("[Chat] Get Chat Messages: senderId={}, receiverId={}", senderId, receiverId);
        return ResponseEntity.ok(chatMessageService.getChatMessages(senderId, receiverId));
    }

    @GetMapping("/rooms")
    public ResponseEntity<List<ChatRoomResponse>> getChatRooms(@RequestParam Integer userId) {
        log.info("[Chat] Get Chat Rooms: userId={}", userId);
        return ResponseEntity.ok(chatRoomService.getChatRoomList(userId));
    }
}
