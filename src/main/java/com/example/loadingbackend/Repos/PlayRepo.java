package com.example.loadingbackend.Repos;

import com.example.loadingbackend.Models.PlayModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayRepo extends JpaRepository<PlayModel, String> {

}
