package com.com.aparteone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.com.aparteone.dto.ChatPayload;
import com.com.aparteone.dto.response.ChatRoomResponse;
import com.com.aparteone.entity.ChatMessage;
import com.com.aparteone.service.ChatService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
// @CrossOrigin("*")
// @RequestMapping("/api/chat")
public class ChatController {
    @Autowired
    private ChatService chatService;

    // Local Testing
    @PostMapping("/api/chat/send")
    public ChatMessage sendMessageLocal(@RequestBody ChatPayload chatMessage) {
        log.info("[Chat] Process Message: {}", chatMessage);
        ChatMessage response = chatService.save(chatMessage);
        return response;
    }

    @MessageMapping("/sendmsg")
    @SendTo("/chat/messages")
    public ChatMessage sendMessage(@Payload ChatPayload chatMessage) {
        // log.info("[Chat] Process Message: {}", chatMessage.toString());
        ChatMessage response = chatService.save(chatMessage);
        return response;
    }

    @GetMapping("/api/chat/messages")
    public ResponseEntity<List<ChatMessage>> getChatMessages(
            @RequestParam Integer senderId,
            @RequestParam Integer receiverId) {
        log.info("[Chat] Get Chat Messages: senderId={}, receiverId={}", senderId, receiverId);
        return ResponseEntity.ok(chatService.getChatMessages(senderId, receiverId));
    }

    @GetMapping("/api/chat/rooms")
    public ResponseEntity<List<ChatRoomResponse>> getChatRooms(@RequestParam Integer userId) {
        log.info("[Chat] Get Chat Rooms: userId={}", userId);
        return ResponseEntity.ok(chatService.getChatRoomList(userId));
    }
}
