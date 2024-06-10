package com.example.loadingbackend.Services;

import com.example.loadingbackend.Models.ChoiceModel;
import com.example.loadingbackend.Models.VoteModel;
import com.example.loadingbackend.Repos.ChoiceRepo;
import com.example.loadingbackend.Repos.VoteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoteService {

    //Declares a vote repo
    private final VoteRepo voteRepo;
    private final ChoiceRepo choiceRepo;

    //Constructor for the service and initializes the vote repo
    @Autowired
    public VoteService(VoteRepo voteRepo, ChoiceRepo choiceRepo) {
        this.voteRepo = voteRepo;
        this.choiceRepo = choiceRepo;
    }

    //Takes a vote model and saves it to the vote repo
    public void addVote(VoteModel vote, int choiceId) {

        ChoiceModel choice = choiceRepo.findById(choiceId).orElse(null);
        vote.setChoice(choice);
        voteRepo.save(vote);

        if (choice != null) {
            choice.getVotes().add(vote);
            choice.setVotesCount(choice.getVotes().size());
            choiceRepo.save(choice);
        }
    }
}
