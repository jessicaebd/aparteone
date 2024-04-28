package com.com.aparteone.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.com.aparteone.dto.response.ChatRoomResponse;
import com.com.aparteone.entity.ChatRoom;
import com.com.aparteone.entity.User;
import com.com.aparteone.repository.ChatRoomRepo;
import com.com.aparteone.repository.UserRepo;
import com.com.aparteone.service.ChatRoomService;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class ChatRoomServiceImpl implements ChatRoomService {

    @Autowired
    private ChatRoomRepo chatRoomRepo;

    @Autowired
    private UserRepo userRepo;

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

}
