package com.project.personal.comprehensive.task.manager.web.application.Service;

import java.util.List;

import com.project.personal.comprehensive.task.manager.web.application.Entity.SignupData;
import com.project.personal.comprehensive.task.manager.web.application.JwtRequest.SignupDataJwtRequest;
import com.project.personal.comprehensive.task.manager.web.application.Response.SignupDataJwtResponse;

public interface SignupService {
	
	public boolean Signup(SignupData signup);
	public boolean UpdateSignup(SignupData signup);
	public SignupDataJwtResponse login(SignupDataJwtRequest authRequest);
	public List<SignupData> getAllData();
	public SignupData getByEmail(String email);
	public boolean deleteAccount(String email);
	

}
