package com.example.loadingbackend.Repos;

import com.example.loadingbackend.Models.ChoiceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Repository
public interface ChoiceRepo extends JpaRepository<ChoiceModel, Integer> {

}
