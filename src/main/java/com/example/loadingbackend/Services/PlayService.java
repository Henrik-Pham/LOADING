package com.example.loadingbackend.Services;

import com.example.loadingbackend.Models.ChoiceModel;
import com.example.loadingbackend.Models.EventModel;
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

    private final PlayEventChoiceService playEventChoiceService;

    @Autowired
    public PlayService(PlayRepo playRepo, PlayEventChoiceService playEventChoiceService,
                       EventService eventService) {
        this.playRepo = playRepo;
        this.playEventChoiceService = playEventChoiceService;
        this.eventService = eventService;
    }

    public PlayModel getPlayById(String id) {
        PlayModel play = playRepo.findById(id).orElse(null);
        return play;
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


    public String savePlayAsJson(String fileName) {
        PlayModel play = playRepo.findById(fileName).orElse(null);
        if (play != null) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                objectMapper.writeValue(new File("plays/" + fileName + ".json"), play);
                return "Play saved successfully as JSON.";
            } catch (IOException e) {
                e.printStackTrace();
                return "Error saving play as JSON.";
            }
        }
        return "Play not found.";
    }


}
