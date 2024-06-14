package com.example.loadingbackend.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "plays")
public class PlayModel {

    @Id
    private String fileName;

    @OneToMany( cascade = CascadeType.ALL)
    private List<EventModel> events;

}
