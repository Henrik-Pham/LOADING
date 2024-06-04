package com.example.loadingbackend.Controllers;

import com.example.loadingbackend.Models.VoteModel;
import com.example.loadingbackend.Services.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("api/vote")
@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class VoteController {

    //Declares the service
    private final VoteService voteService;

    //Autowire links the service to the controller
    @Autowired
    //Constructor which links the service to the controller
    public VoteController(VoteService voteService){
        this.voteService = voteService;
    }

    //Post mapping which adds a vote to the vote service
    //Note that the return value of the function is what the server will return to the client
    @PostMapping
    public void addVote(@RequestBody VoteModel voteModel){
        voteService.addVote(voteModel);
    }
}
