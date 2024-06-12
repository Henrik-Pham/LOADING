package com.example.loadingbackend.Controllers;

import com.example.loadingbackend.Models.ChoiceModel;
import com.example.loadingbackend.Models.EventModel;
import com.example.loadingbackend.Services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("api/event")
@RestController
@CrossOrigin(origins = "*")
public class EventController {

    private final EventService eventService;


    @Autowired
    public EventController(EventService eventService){
        this.eventService = eventService;
    }

    @GetMapping("/{id}")
    public EventModel getEventById(@PathVariable int id) {
        return eventService.getEventById(id);
    }

    @PostMapping
    public EventModel addEvent(@RequestBody EventModel event){
        return eventService.addEvent(event);
    }

    @DeleteMapping("/{id}")
    public void deleteEventById(@PathVariable int id) {
        eventService.deleteEventById(id);
    }

    @PutMapping
    public EventModel updateEvent(@RequestBody EventModel event) {
        return eventService.updateEvent(event);
    }

    @GetMapping("/votes/{eventId}")
    public Object getVotesByEvent(@PathVariable int eventId) {
        return eventService.getVotesByEvent(eventId);
    }

    @PutMapping("/{eventId}/{choiceId}")
    public EventModel addChoiceToEvent(@PathVariable int eventId,
                                       @PathVariable int choiceId) {
        return eventService.addChoiceToEvent(eventId, choiceId);
    }

    @GetMapping("/save/{eventId}")
    public void saveEvent(@PathVariable int eventId) {
        eventService.saveEventAsJson(eventId, "event.json");
    }




}
