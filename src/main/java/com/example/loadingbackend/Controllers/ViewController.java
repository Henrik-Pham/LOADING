package com.example.loadingbackend.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/")
@Controller
//@CrossOrigin(origins = "http://localhost:8080/api/qr")
public class ViewController {

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
}
