package com.project.personal.comprehensive.task.manager.web.application.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.personal.comprehensive.task.manager.web.application.Entity.AssignedToDetails;

public interface AssigningRepo extends JpaRepository<AssignedToDetails,Integer>{
	@Query(value ="SELECT * FROM assigned_to_details  WHERE assigned_to = :email",nativeQuery = true)
    public List<AssignedToDetails> getAssignedToDetailsByEmail(String email);

}
