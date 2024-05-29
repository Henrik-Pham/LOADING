package com.example.loadingbackend.Services;

import com.example.loadingbackend.Models.VoteModel;
import com.example.loadingbackend.Repos.VoteRepo;
import org.springframework.stereotype.Service;

@Service
public class VoteService {

    //Declares a vote repo
    private final VoteRepo voteRepo;

    //Constructor for the service and initializes the vote repo
    public VoteService(VoteRepo voteRepo) {
        this.voteRepo = voteRepo;
    }

    //Takes a vote model and saves it to the vote repo
    public void addVote(VoteModel vote) {
        voteRepo.save(vote);
    }
}
