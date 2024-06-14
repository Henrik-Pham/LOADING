package com.example.loadingbackend.Controllers;

import com.example.loadingbackend.Models.PlayModel;
import com.example.loadingbackend.Services.PlayEventChoiceService;
import com.example.loadingbackend.Services.PlayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import java.net.InetAddress;
import java.net.UnknownHostException;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
@RequestMapping("api/play")

public class PlayController {

    private final PlayService playService;
    private final PlayEventChoiceService playEventChoiceService;

    @Autowired
    public PlayController(PlayService playService, PlayEventChoiceService playEventChoiceService) {
        this.playService = playService;
        this.playEventChoiceService = playEventChoiceService;
    }

    @DeleteMapping("/{id}")
    public void deletePlayById(@PathVariable String id) {
        playService.deletePlayById(id);
    }

    @PutMapping("/update/{id}")
    public PlayModel updatePlay(@RequestBody PlayModel play) {
        return playService.updatePlay(play);
    }


    @GetMapping("/{fileName}")
    public ResponseEntity<?> findExistingOrAddNew(@PathVariable String fileName) {


        PlayModel play = playEventChoiceService.getPlayById(fileName);
        if (play == null) {
            play = new PlayModel();
            play.setFileName(fileName);
            playService.addPlay(play);
        }
        return ResponseEntity.ok(play);
    }

    @PutMapping("/{fileName}/{eventId}")
    public PlayModel addEventToPlay(@PathVariable String fileName,
                                     @PathVariable int eventId) {
        return playEventChoiceService.addEventToPlay(fileName, eventId);
    }

    @PostMapping("/save/{fileName}")
    public ResponseEntity<String> savePlayAsJson(@PathVariable String fileName) {
        String result = playService.savePlayAsJson(fileName);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
