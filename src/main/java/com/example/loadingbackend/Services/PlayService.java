package com.example.loadingbackend.Services;

import com.example.loadingbackend.Models.PlayModel;
import com.example.loadingbackend.Repos.PlayRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class PlayService {

    private final PlayRepo playRepo;
    private final EventService eventService;
    private final ChoiceService choiceService;

    @Autowired
    public PlayService(PlayRepo playRepo, EventService eventService, ChoiceService choiceService) {
        this.playRepo = playRepo;
        this.eventService = eventService;
        this.choiceService = choiceService;
    }

    public void deletePlayById(String id) {
        playRepo.deleteById(id);
    }

    public PlayModel updatePlay(PlayModel play) {
        playRepo.save(play);
        return play;
    }

    public PlayModel addPlay(PlayModel play) {
        return playRepo.save(play);
    }

    public PlayModel getPlayById(String id) {
        PlayModel play = playRepo.findById(id).orElse(null);

        if (play == null) {
            // Construct the file path
            String filePath = id + ".json";

            // Check if the file exists
            if (Files.exists(Paths.get(filePath))) {
                // If the file exists, read it into a PlayModel object
                ObjectMapper objectMapper = new ObjectMapper();
                try {
                    play = objectMapper.readValue(new File(filePath), PlayModel.class);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }else {
                return null;
            }
        }

        return play;

    }

    public void savePlayAsJson(PlayModel play) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            objectMapper.writeValue(new File(play.getFileName()), play);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
