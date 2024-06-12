package com.example.loadingbackend.Services;

import com.example.loadingbackend.Models.ChoiceModel;
import com.example.loadingbackend.Models.EventModel;
import com.example.loadingbackend.Repos.ChoiceRepo;
import com.example.loadingbackend.Repos.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;

import java.util.Map;

@Service
public class EventService {

    private final EventRepo eventRepo;
    private final ChoiceRepo choiceRepo;

    @Autowired
    public EventService(EventRepo eventRepo, ChoiceRepo choiceRepo) {
        this.eventRepo = eventRepo;
        this.choiceRepo = choiceRepo;
    }

    public void deleteEventById(int id) {
        eventRepo.deleteById(id);
    }

    public EventModel updateEvent(EventModel event) {
        return eventRepo.save(event);
    }

    public EventModel getEventById(int id) {
        return eventRepo.findById(id).orElse(null);
    }

    public EventModel addEvent(EventModel event) {
        return eventRepo.save(event);
    }

    public Map<ChoiceModel, Integer> getVotesByEvent(int eventId) {
        EventModel event = getEventById(eventId);
        if (event != null) {
            return event.getChoices().stream().collect(
                    java.util.stream.Collectors.toMap(
                            choice -> choice,
                            choice -> choice.getVotes().size()
                    )
            );
        }
        return null;
    }

    public EventModel addChoiceToEvent(int eventId, int choiceId) {
        EventModel event = getEventById(eventId);
        System.out.println("event");
        ChoiceModel choice = choiceRepo.findById(choiceId).orElse(null);
        System.out.println("Choice: ");
        if (event != null && choice != null) {
            event.getChoices().add(choice);
            eventRepo.save(event);
        }
        return null;

    }


    public void saveEventAsJson(int eventId, String filePath) {
        EventModel event = getEventById(eventId);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            objectMapper.writeValue(new File(filePath), event);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
