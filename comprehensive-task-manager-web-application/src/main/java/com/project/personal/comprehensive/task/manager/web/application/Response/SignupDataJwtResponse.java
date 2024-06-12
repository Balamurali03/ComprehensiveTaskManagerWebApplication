package com.project.personal.comprehensive.task.manager.web.application.Response;

import com.project.personal.comprehensive.task.manager.web.application.Entity.SignupData;

import lombok.Data;

@Data
public class SignupDataJwtResponse {

	private SignupData signupData;
	private String message;
	private String jwtToken;
}
