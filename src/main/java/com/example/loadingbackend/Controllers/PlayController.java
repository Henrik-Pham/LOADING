package com.example.loadingbackend.Controllers;

import com.example.loadingbackend.Models.PlayModel;
import com.example.loadingbackend.Services.PlayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
@RequestMapping("api/play")
@CrossOrigin(origins = "*")
public class PlayController {

    private final PlayService playService;

    @Autowired
    public PlayController(PlayService playService) {
        this.playService = playService;
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
    public PlayModel findExistingOrAddNew(@PathVariable String fileName) {
        PlayModel play = playService.getPlayById(fileName);
        if (play == null) {
            play = new PlayModel();
            play.setFileName(fileName);
            playService.addPlay(play);
        }
        return play;
    }


}
