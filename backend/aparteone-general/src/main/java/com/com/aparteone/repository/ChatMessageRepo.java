package com.com.aparteone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.ChatMessage;

@Repository
public interface ChatMessageRepo extends JpaRepository<ChatMessage, Integer> {
    List<ChatMessage> findByChatIdOrderByCreatedDateAsc(String chatId);
}
