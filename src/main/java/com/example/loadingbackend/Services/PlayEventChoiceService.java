// PlayEventChoiceService.java
package com.example.loadingbackend.Services;

import com.example.loadingbackend.Models.ChoiceModel;
import com.example.loadingbackend.Models.EventModel;
import com.example.loadingbackend.Models.PlayModel;
import com.example.loadingbackend.Repos.ChoiceRepo;
import com.example.loadingbackend.Repos.EventRepo;
import com.example.loadingbackend.Repos.PlayRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class PlayEventChoiceService {

    private final PlayRepo playRepo;
    private final EventRepo eventRepo;
    private final ChoiceRepo choiceRepo;

    @Autowired
    public PlayEventChoiceService(PlayRepo playRepo, EventRepo eventRepo,
                                  ChoiceRepo choiceRepo) {
        this.playRepo = playRepo;
        this.eventRepo = eventRepo;
        this.choiceRepo = choiceRepo;
    }

    public void removeEventFromPlayAndDelete(String fileName, int eventId) {
        // First, remove the event from the play
        PlayModel play = playRepo.findById(fileName).orElse(null);
        if (play != null) {
            play.getEvents().removeIf(event -> event.getID() == eventId);
            playRepo.save(play);
        }

        // Then, delete the event
        eventRepo.deleteById(eventId);
    }

    public ChoiceModel addEventToChoice(int choiceId, int eventId) {
        ChoiceModel choice = choiceRepo.findById(choiceId).orElse(null);
        if (choice != null) {
            choice.setNextEvent(eventRepo.findById(eventId).orElse(null));
            choiceRepo.save(choice);
            return choice;
        }
        return null;
    }

    public PlayModel getPlayById(String id) {
        PlayModel play = playRepo.findById(id).orElse(null);

        if (play == null) {
            // Construct the file path
            String filePath = "plays/" + id + ".json";

            // Check if the file exists
            if (Files.exists(Paths.get(filePath))) {
                // If the file exists, read it into a PlayModel object
                ObjectMapper objectMapper = new ObjectMapper();
                try {
                    play = objectMapper.readValue(new File(filePath), PlayModel.class);
                    for (EventModel event : play.getEvents()) {
                        for (ChoiceModel choice : event.getChoices()) {
                            choiceRepo.save(choice);
                        }
                        eventRepo.save(event);
                    }
                    playRepo.save(play);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }else {
                return null;
            }
        }

        return play;
    }

    public PlayModel addEventToPlay(String fileName, int eventId) {
        PlayModel play = playRepo.findById(fileName).orElse(null);
        if (play != null) {
            play.getEvents().add(eventRepo.findById(eventId).orElse(null));
            playRepo.save(play);
        }
        return play;
    }

    public EventModel addChoiceToEvent(int eventId, int choiceId) {

        EventModel event = eventRepo.findById(eventId).orElse(null);
        if (event != null) {
            event.getChoices().add(choiceRepo.findById(choiceId).orElse(null));
            eventRepo.save(event);
        }
        return event;
    }

    public void removeChoiceFromEvent(int eventId, int choiceId) {
        // First, remove the choice from the event
        EventModel event = eventRepo.findById(eventId).orElse(null);
        if (event != null) {
            event.getChoices().removeIf(choice -> choice.getID() == choiceId);
            eventRepo.save(event);
        }
    }


}