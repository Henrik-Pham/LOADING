package com.example.loadingbackend.Controllers;

import com.example.loadingbackend.Models.ChoiceModel;
import com.example.loadingbackend.Services.ChoiceService;
import com.example.loadingbackend.Services.PlayEventChoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/choice")
@RestController
@CrossOrigin(origins = "*")
public class ChoiceController {

    private final ChoiceService choiceService;
    private final PlayEventChoiceService playEventChoiceService;

    @Autowired
    public ChoiceController(ChoiceService choiceService, PlayEventChoiceService playEventChoiceService) {
        this.choiceService = choiceService;
        this.playEventChoiceService = playEventChoiceService;
    }

    @PostMapping
    public ChoiceModel addChoice(@RequestBody ChoiceModel choice){
        return choiceService.addChoice(choice);

    }

    @GetMapping("/{id}")
    public ChoiceModel getChoiceById(@PathVariable int id) {
        return choiceService.getChoiceById(id);
    }


    @GetMapping("/votes/{choiceId}")
    public int getVotesByChoice(@PathVariable int choiceId) {
        return choiceService.getVotesByChoice(choiceId);
    }

    @DeleteMapping("/{eventId}/{choiceId}")
    public void deleteChoiceById(@PathVariable int eventId,
                                 @PathVariable int choiceId){
        playEventChoiceService.removeChoiceFromEvent(eventId, choiceId);
        choiceService.deleteChoiceById(choiceId);
    }

    @PutMapping
    public ChoiceModel updateChoice(@RequestBody ChoiceModel choice) {
        return choiceService.updateChoice(choice);
    }

    @PutMapping("/{choiceId}/{eventId}")
    public ChoiceModel addEventToChoice(@PathVariable int choiceId,
                                       @PathVariable int eventId) {
        return playEventChoiceService.addEventToChoice(choiceId, eventId);
    }


}
