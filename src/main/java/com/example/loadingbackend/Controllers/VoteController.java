package com.example.loadingbackend.Controllers;

import com.example.loadingbackend.Models.VoteModel;
import com.example.loadingbackend.Services.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.google.gson.Gson;


@RequestMapping("api/vote")
@RestController
@CrossOrigin(origins = "*")
public class VoteController {

    //Declares the service
    private final VoteService voteService;
    private static final Gson gson = new Gson();

    //Autowire links the service to the controller
    @Autowired
    //Constructor which links the service to the controller
    public VoteController(VoteService voteService){
        this.voteService = voteService;
    }

    @CrossOrigin
    //Post mapping which adds a vote to the vote service
    //Note that the return value of the function is what the server will return to the client
    @PostMapping("/{choiceId}")
    public ResponseEntity<String> addVote(@RequestBody VoteModel voteModel,
                                          @PathVariable int choiceId){
        voteService.addVote(voteModel, choiceId);

        return ResponseEntity.ok(gson.toJson("Vote added"));
    }
}
