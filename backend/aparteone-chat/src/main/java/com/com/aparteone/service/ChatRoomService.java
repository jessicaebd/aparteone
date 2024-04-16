package com.com.aparteone.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.com.aparteone.entity.ChatRoom;
import com.com.aparteone.repository.ChatRoomRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ChatRoomService {
    
    @Autowired
    private ChatRoomRepo chatRoomRepo;

    public String getChatId(Integer senderId, Integer receiverId, Boolean isCreateNewRoom) {
        Optional<ChatRoom> chatRoom = chatRoomRepo.findBySenderIdAndReceiverId(senderId, receiverId);

        if (chatRoom.isPresent()) {
            return chatRoom.get().getChatId();
        } else {
            if (isCreateNewRoom) {
                var chatId = String.format("%s_%s", senderId, receiverId);

                ChatRoom senderRecipient = new ChatRoom(
                        chatId,
                        senderId,
                        receiverId);

                ChatRoom recipientSender = new ChatRoom(
                        chatId,
                        receiverId,
                        senderId);

                chatRoomRepo.save(senderRecipient);
                chatRoomRepo.save(recipientSender);
                return chatId;
            }
        }
        return null;
    }
}
