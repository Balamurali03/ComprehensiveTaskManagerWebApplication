package com.project.personal.comprehensive.task.manager.web.application.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.personal.comprehensive.task.manager.web.application.Entity.SignupData;
import com.project.personal.comprehensive.task.manager.web.application.JwtRequest.SignupDataJwtRequest;
import com.project.personal.comprehensive.task.manager.web.application.JwtUtil.JwtUtility;
import com.project.personal.comprehensive.task.manager.web.application.Repo.SignupRepo;
import com.project.personal.comprehensive.task.manager.web.application.Response.SignupDataJwtResponse;
import com.project.personal.comprehensive.task.manager.web.application.Service.SignupService;

@Service
public class SignupServiceImpl implements SignupService {
	
	@Autowired
	private SignupRepo signupRepo;
	
	@Autowired
	private JwtUtility jwtUtility;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Override
	public boolean Signup(SignupData signup) {
		
		int value =  signupRepo.existsByEmail(signup.getEmail());
		if(value == 0) {
			SignupData data = new SignupData();
			data.setId(signup.getId());
			data.setName(signup.getName());
			data.setEmail(signup.getEmail());
			data.setPassword(new BCryptPasswordEncoder().encode(signup.getPassword()));
			data.setRole(signup.getRole().toUpperCase());
			data.setPhno(signup.getPhno());
			signupRepo.save(data);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public boolean UpdateSignup(SignupData signup) {
		
		int value =  signupRepo.existsByEmail(signup.getEmail());
		if(value ==1) {
			SignupData updateData = signupRepo.getByEmail(signup.getEmail());
			updateData.setName(signup.getName());
			//updateData.setPassword(signup.getPassword());
			updateData.setEmail(signup.getEmail());
			updateData.setPhno(signup.getPhno());
			updateData.setRole(signup.getRole());
			signupRepo.save(updateData);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public SignupDataJwtResponse login(SignupDataJwtRequest authRequest) {
		//int value = signupRepo.existsByEmail(authRequest.getEmail());
		
		SignupDataJwtResponse userData = new SignupDataJwtResponse();
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
		//if (value == 1) {
			SignupData user = new SignupData();
			if (authentication.isAuthenticated()) {	
				user = signupRepo.getByEmail(authRequest.getEmail());
				userData.setSignupData(user);
				userData.setMessage("Login Sucessfull");
				userData.setJwtToken(jwtUtility.generateToken(authRequest.getEmail())); 
				return userData;
			}
			else {
				userData.setSignupData(null);
				userData.setMessage("Password Incorrect");
				return userData;
			}
//		} else {
//			
//			userData.setSignupData(null);
//			userData.setMessage("Account not exist");
//			return userData;
//		}
		
		
	}

	@Override
	public List<SignupData> getAllData() {
		List<SignupData> getAllData = signupRepo.findAll();
		
		if(! getAllData.isEmpty()) {
			return getAllData;
		} else {
			return null;
		}
		
	}

	@Override
	public SignupData getByEmail(String email) {
		
		int value = signupRepo.existsByEmail(email);
		
		if (value == 1) {
			SignupData user = signupRepo.getByEmail(email);
			return user;
		} else {
			return null;
		}
		
	}

	@Override
	public boolean deleteAccount(String email) {
		int value = signupRepo.existsByEmail(email);
		if(value == 1) {
			signupRepo.delete(signupRepo.getByEmail(email));
			return true;
		} else {
			return false;
		}
		
	}

}
