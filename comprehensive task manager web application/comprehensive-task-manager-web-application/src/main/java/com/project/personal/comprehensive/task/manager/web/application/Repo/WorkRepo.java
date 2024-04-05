package com.project.personal.comprehensive.task.manager.web.application.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.personal.comprehensive.task.manager.web.application.Entity.Work;

public interface WorkRepo extends JpaRepository<Work,Integer> {

	@Query(value ="SELECT * FROM work  WHERE assigned_by = :email",nativeQuery = true)
    public List<Work> getWorkByCreatorEmail(String email);
}
