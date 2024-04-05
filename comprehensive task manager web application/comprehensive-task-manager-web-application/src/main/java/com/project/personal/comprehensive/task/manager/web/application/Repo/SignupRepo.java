package com.project.personal.comprehensive.task.manager.web.application.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.personal.comprehensive.task.manager.web.application.Entity.SignupData;

public interface SignupRepo extends JpaRepository<SignupData,Integer> {
	
	@Query(value ="SELECT COUNT(*) FROM signup_data WHERE email = :email",nativeQuery = true)
     public int existsByEmail(String email);
	
	@Query(value ="SELECT * FROM signup_data  WHERE email = :email",nativeQuery = true)
    public SignupData getByEmail(String email);

}
