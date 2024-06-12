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





    @Autowired
    public EventService(EventRepo eventRepo) {
        this.eventRepo = eventRepo;


    }

    public void deleteEventById(int id) {

        // Then, delete the event
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
