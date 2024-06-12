package com.project.personal.comprehensive.task.manager.web.application.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.project.personal.comprehensive.task.manager.web.application.Entity.AssignedToDetails;
import com.project.personal.comprehensive.task.manager.web.application.Service.AssignedToService;

@CrossOrigin
@RestController
public class AssignedToController {
	
	@Autowired
	private AssignedToService assignedToService;
	
	@PostMapping("/create-assigned-detail")
public ResponseEntity<String> CreateAssignedToDetails(@RequestBody AssignedToDetails work) {
		
		if(assignedToService.CreateAssignedToDetails(work)) {
			return ResponseEntity.status(200).body("AssignedToDetails created");
		}
		
	 return ResponseEntity.status(400).body("AssignedToDetails not created");
}
	
	@PatchMapping("/update-assigned-detail")
public ResponseEntity<String> UpdateAssignedToDetails(@RequestBody AssignedToDetails work) {
		
		if(assignedToService.UpdateAssignedToDetails(work)) {
			return ResponseEntity.status(200).body("AssignedToDetails updated");
		}
		
	 return ResponseEntity.status(400).body("AssignedToDetails not updated");
}
	//employer
	@DeleteMapping("/delete-assigned-detail")
	public ResponseEntity<String> deleteAssignedToDetails(@RequestHeader int id) {
		
		if(assignedToService.deleteAssignedToDetails(id)) {
			return ResponseEntity.status(200).body("AssignedToDetails deleted");
		}
		
	 return ResponseEntity.status(400).body("AssignedToDetails not deleted");
		
	}


}
