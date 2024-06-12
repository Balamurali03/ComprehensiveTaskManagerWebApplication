package com.project.personal.comprehensive.task.manager.web.application.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.project.personal.comprehensive.task.manager.web.application.Entity.SignupData;
import com.project.personal.comprehensive.task.manager.web.application.JwtRequest.SignupDataJwtRequest;
import com.project.personal.comprehensive.task.manager.web.application.Response.SignupDataJwtResponse;
import com.project.personal.comprehensive.task.manager.web.application.Service.SignupService;

@CrossOrigin
@RestController
public class SignupController {
	
	@Autowired
	private SignupService signupService;
	//All
	@PostMapping("/signup")
	public ResponseEntity<String> Signup(@RequestBody SignupData signup) {
		if(signupService.Signup(signup)) {
			return ResponseEntity.status(200).body("Account created");
		}
		return ResponseEntity.status(400).body("Account not created");
		
	}
	//All
	@PatchMapping("/update-account")
	public ResponseEntity<String> UpdateSignup(@RequestBody SignupData signup) {
		if(signupService.UpdateSignup(signup)) {
			return ResponseEntity.status(200).body("Account updated");
		}
		return ResponseEntity.status(400).body("Account not updated");
		
	}
	//All
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody SignupDataJwtRequest authRequest) {
		
		SignupDataJwtResponse response =  signupService.login(authRequest);
		if(response.getSignupData() !=null) {
			return ResponseEntity.status(200).body(response);
		}
		return ResponseEntity.status(400).body(response.getMessage());
	}
	//Admin
	@PreAuthorize("hasAuthority('ADMIN')")
	@GetMapping("/show-all-signup-data")
	public ResponseEntity<?> getAllData() {
		
		List<SignupData> data = signupService.getAllData();
		if(data !=null) {
			return ResponseEntity.status(200).body(data);
		}
		return ResponseEntity.status(400).body("No Data Found");
		
		
	}
	//Admin
	//
	@GetMapping("/show-data-by-email")
	public ResponseEntity<?> getByEmail(@RequestHeader String email) {
		
		SignupData data = signupService.getByEmail(email);
		if(data !=null) {
			return ResponseEntity.status(200).body(data);
		}
		return ResponseEntity.status(400).body("No Data Found");
	}
	//All
	@DeleteMapping("/delete-account")
	public ResponseEntity<String> deleteAccount(@RequestHeader String email) {
		
		if(signupService.deleteAccount(email)) {
			
			return ResponseEntity.status(200).body("Account deleted");
		}
		return ResponseEntity.status(400).body("Account not deleted");
	}

}
