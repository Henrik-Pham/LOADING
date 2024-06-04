package com.example.loadingbackend.Models;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "votes")
public class VoteModel {

    /*
    * This class is a model for the vote object
    * It is used to create a table in the database
    */

    //@id defines the primary key
    @Id
    //Defines the column name in the database, and requires each value to be present and unique
    @Column(name = "voter_id", nullable = false, unique = true)
    //Temp, replace with ip or mac address
    private int ID;

    //Creates a relationship between the vote and the choice
    //A vote can only be for one choice, but a choice can have many votes
    @ManyToOne
    private ChoiceModel choice;


    public VoteModel(int ID) {
        this.ID = ID;
    }
}
