package com.example.loadingbackend.Services;

import com.example.loadingbackend.Models.ChoiceModel;
import com.example.loadingbackend.Repos.ChoiceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChoiceService {

    private final ChoiceRepo choiceRepo;

    @Autowired
    public ChoiceService(ChoiceRepo choiceRepo) {
        this.choiceRepo = choiceRepo;
    }

    public ChoiceModel addChoice(ChoiceModel choice) {

        choiceRepo.save(choice);
        return choice;
    }

    public ChoiceModel getChoiceById(int id) {
        return choiceRepo.findById(id).orElse(null);
    }


    public int getVotesByChoice(int choiceId) {
        return choiceRepo.findById(choiceId).orElse(null).getVotes().size();
    }

    public void deleteChoiceById(int id) {
        choiceRepo.deleteById(id);
    }

    public ChoiceModel updateChoice(ChoiceModel choice) {
        return choiceRepo.save(choice);

    }
}
