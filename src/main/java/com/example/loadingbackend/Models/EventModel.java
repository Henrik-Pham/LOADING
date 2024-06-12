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
@Table(name = "events")
public class EventModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id", nullable = false, unique = true)
    private int ID;

    private String playEventName;
    private String eventDescription;

    @OneToMany
    private List<ChoiceModel> choices;

}
