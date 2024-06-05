package com.example.loadingbackend.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.google.gson.Gson;

//import static com.example.loadingbackend.Controllers.VoteController.gson;

//import static com.example.loadingbackend.Controllers.VoteController.gson;

@RequestMapping("/")
@Controller
//@CrossOrigin(origins = "http://localhost:8080/api/qr")
public class ViewController {
    public boolean isStarted = false;
    private static final Gson gson = new Gson();

    @CrossOrigin
    @GetMapping
    //Returns the index.html file from the resources/templates folder
    //Placeholder for the front end
    //css and other resources are stored in the resources/static folder
    public String getIndex() {
        return "index";
    }

    @CrossOrigin
    @GetMapping("/vote")
    //Returns the index.html file from the resources/templates folder
    //Placeholder for the front end
    //css and other resources are stored in the resources/static folder
    public String getVote() {
        return "vote";
    }

    @CrossOrigin
    @PostMapping("/start")
    public ResponseEntity<String> startProcess() {
        isStarted = true;
        return ResponseEntity.ok(gson.toJson("Process started"));
    }

    @CrossOrigin
    @GetMapping("/start")
    public ResponseEntity<String> getStart() {
        if (isStarted) {
            return ResponseEntity.ok(gson.toJson("Process started"));
        } else {
            return ResponseEntity.ok(gson.toJson("Process not started"));
        }
    }
}
