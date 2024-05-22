package com.com.aparteone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.com.aparteone.entity.ChatMessage;

@Repository
public interface ChatMessageRepo extends JpaRepository<ChatMessage, Integer> {
    @Query(value = "select * from chat_messages where chat_id = :chatId order by created_date asc", nativeQuery = true)
    List<ChatMessage> findByChatId(String chatId);
}
