package com.example.loadingbackend.Repos;

import com.example.loadingbackend.Models.EventModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepo extends JpaRepository<EventModel, Integer> {

}
