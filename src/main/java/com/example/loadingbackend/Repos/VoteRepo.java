package com.example.loadingbackend.Repos;

import com.example.loadingbackend.Models.VoteModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepo  extends JpaRepository<VoteModel, Integer> {
    //This shit is basically magic
}
