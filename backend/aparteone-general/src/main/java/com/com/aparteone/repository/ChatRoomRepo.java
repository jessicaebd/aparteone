package com.com.aparteone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.ChatRoom;

@Repository
public interface ChatRoomRepo extends JpaRepository<ChatRoom, Integer> {
    Optional<ChatRoom> findBySenderIdAndReceiverId(Integer senderId, Integer receiverId);
    List<ChatRoom> findBySenderId(Integer senderId);
}
