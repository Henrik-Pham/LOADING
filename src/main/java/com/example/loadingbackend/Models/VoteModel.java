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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voter_id", nullable = false, unique = true)
    private int ID;

    @ManyToOne
    private ChoiceModel choice;

    public VoteModel(int ID, ChoiceModel choice) {
        this.ID = ID;
        this.choice = choice;
    }
}
