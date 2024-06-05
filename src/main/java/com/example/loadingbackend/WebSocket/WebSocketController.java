package com.example.loadingbackend.WebSocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Controller
public class WebSocketController {
    @Autowired
    private SimpMessagingTemplate template;

    @MessageMapping("/vote/cast")
    public void handleVote(String choice) {
        // Process the vote here
        template.convertAndSend("/topic/voteResult", "Vote received for choice: " + choice);
    }
}

