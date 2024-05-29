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
@Table(name = "choices")
public class ChoiceModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "choice_id", nullable = false, unique = true)
    private int ID;

    private String choiceDescription;

    //Creates a relationship between the choice and the votes
    //A choice can have many votes, but a vote can only be for one choice
    //FetchType.LAZY means that the votes are only loaded when they are accessed
    //The relationship is mapped by the choice field in the vote model, meaning that the choice is the owner of the relationship
    @OneToMany(mappedBy = "choice", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<VoteModel> votes;

    @ManyToOne
    private EventModel event;


}
