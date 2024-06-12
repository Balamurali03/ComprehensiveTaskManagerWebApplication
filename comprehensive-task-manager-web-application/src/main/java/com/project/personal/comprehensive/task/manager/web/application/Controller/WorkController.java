package com.project.personal.comprehensive.task.manager.web.application.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.project.personal.comprehensive.task.manager.web.application.Entity.AssignedToDetails;
import com.project.personal.comprehensive.task.manager.web.application.Entity.Work;
import com.project.personal.comprehensive.task.manager.web.application.Service.WorkService;

@CrossOrigin
@RestController
public class WorkController {
	
	@Autowired
	private WorkService workService;
	
	@PostMapping("/create-work")
	public ResponseEntity<String> CreateWork(@RequestBody Work work) {
		
		if(workService.CreateWork(work)) {
			return ResponseEntity.status(200).body("Work created");
		}
		return ResponseEntity.status(400).body("Work not created");
		
	}
	@PatchMapping("/update-work")
	public ResponseEntity<String> UpdateWork(@RequestBody Work work) {
		if(workService.UpdateWork(work)) {
			return ResponseEntity.status(200).body("Work Updated");
		}
		return ResponseEntity.status(400).body("Work not Updated");
		
		
	}
	//employee
	@GetMapping("/show-my-work")
	public ResponseEntity<?> ShowMyWork(@RequestHeader String email) {
		
		List<AssignedToDetails> details=workService.ShowMyWork(email);
		if(details != null) {
			return ResponseEntity.status(200).body(details);
		}
		return ResponseEntity.status(400).body("No Data For The Given EmailID");
	}
	//admin
	@GetMapping("/show-all-work")
	public ResponseEntity<?> ShowAllWork() {
		List<Work> allWork=workService.ShowAllWork(); 
		if(allWork !=null) {
			return ResponseEntity.status(200).body(allWork);
		}
		return ResponseEntity.status(400).body("No Data For Avilable");
	}
	@GetMapping("/show-all-creator-work")
	public ResponseEntity<?> ShowAllWorkBasedOnCreator(@RequestHeader String email){
		
		List<Work> details=workService.ShowAllWorkBasedOnCreator(email);
		if(details != null) {
			return ResponseEntity.status(200).body(details);
		}
		return ResponseEntity.status(400).body("No Data Created For The Given EmailID");
	}
	@DeleteMapping("/delete-work")
	public ResponseEntity<String> deleteWork(@RequestHeader int id) {
		if(workService.deleteWork(id)) {
			return ResponseEntity.status(200).body("Data deleted");
		}
		return ResponseEntity.status(400).body("Data not deleted");
	}

}
