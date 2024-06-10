package com.example.loadingbackend.Controllers;

import com.example.loadingbackend.Models.ChoiceModel;
import com.example.loadingbackend.Services.ChoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/choice")
@RestController
@CrossOrigin(origins = "*")
public class ChoiceController {

    private final ChoiceService choiceService;

    @Autowired
    public ChoiceController(ChoiceService choiceService){
        this.choiceService = choiceService;
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

    @DeleteMapping("/{id}")
    public void deleteChoiceById(@PathVariable int id) {
        choiceService.deleteChoiceById(id);
    }

    @PutMapping
    public ChoiceModel updateChoice(@RequestBody ChoiceModel choice) {
        return choiceService.updateChoice(choice);
    }


}
