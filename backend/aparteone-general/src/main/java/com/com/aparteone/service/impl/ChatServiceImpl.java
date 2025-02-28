package com.com.aparteone.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.com.aparteone.dto.ChatPayload;
import com.com.aparteone.dto.response.ChatRoomResponse;
import com.com.aparteone.entity.ChatMessage;
import com.com.aparteone.entity.ChatRoom;
import com.com.aparteone.entity.User;
import com.com.aparteone.repository.ChatMessageRepo;
import com.com.aparteone.repository.ChatRoomRepo;
import com.com.aparteone.repository.UserRepo;
import com.com.aparteone.service.ChatService;
import com.com.aparteone.service.NotificationService;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatRoomRepo chatRoomRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ChatMessageRepo chatMessageRepo;

    @Autowired
    private NotificationService notificationService;

    @Override
    public String getChatRoomId(Integer senderId, Integer receiverId) {
        Optional<ChatRoom> chatRoom = chatRoomRepo.findBySenderIdAndReceiverId(senderId, receiverId);
        log.info("ChatRoom: " + chatRoom.toString());
        if (chatRoom.isPresent()) {
            return chatRoom.get().getChatId();
        } else {
            String chatRoomId = createChatId(senderId, receiverId);
            return chatRoomId;
        }
    }

    @Override
    public String createChatId(Integer senderId, Integer receiverId) {
        String chatId = (senderId.toString() + "_" + receiverId.toString());
        log.info("ChatId: " + chatId);

        ChatRoom senderChatRoom = new ChatRoom();
        senderChatRoom.setSenderId(senderId);
        senderChatRoom.setReceiverId(receiverId);
        senderChatRoom.setChatId(chatId);
        chatRoomRepo.save(senderChatRoom);
        log.info("SenderChatRoom: " + senderChatRoom.toString());

        ChatRoom receiverChatRoom = new ChatRoom();
        receiverChatRoom.setSenderId(receiverId);
        receiverChatRoom.setReceiverId(senderId);
        receiverChatRoom.setChatId(chatId);
        chatRoomRepo.save(receiverChatRoom);
        log.info("ReceiverChatRoom: " + receiverChatRoom.toString());

        return chatId;
    }

    @Override
    public List<ChatRoomResponse> getChatRoomList(Integer userId) {
        List<ChatRoom> chatRooms = chatRoomRepo.findBySenderId(userId);

        List<ChatRoomResponse> response = new ArrayList<>();
        chatRooms.forEach(chatRoom -> {
            User user = userRepo.findById(chatRoom.getReceiverId()).get();
            ChatRoomResponse chatRoomResponse = new ChatRoomResponse();
            chatRoomResponse.setId(chatRoom.getId());
            chatRoomResponse.setChatId(chatRoom.getChatId());
            chatRoomResponse.setUserId(chatRoom.getReceiverId());
            chatRoomResponse.setUserName(user.getName());
            // chatRoomResponse.setUserimage(user.getImage());
            chatRoomResponse.setUserimage(null);
            response.add(chatRoomResponse);
        });

        return response;
    }

    @Override
    public List<ChatMessage> getChatMessages(Integer senderId, Integer recipientId) {
        String chatId = getChatRoomId(senderId, recipientId);
        List<ChatMessage> chatMessages = chatMessageRepo.findByChatIdOrderByCreatedDateDesc(chatId);
        return chatMessages;
    }

    @Override
    public ChatMessage save(ChatPayload chatMessage) {
        String chatId = getChatRoomId(chatMessage.getSenderId(), chatMessage.getReceiverId());
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
