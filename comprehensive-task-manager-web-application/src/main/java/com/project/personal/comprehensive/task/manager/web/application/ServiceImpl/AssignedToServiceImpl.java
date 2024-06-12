package com.project.personal.comprehensive.task.manager.web.application.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.personal.comprehensive.task.manager.web.application.Entity.AssignedToDetails;
import com.project.personal.comprehensive.task.manager.web.application.Entity.Work;
import com.project.personal.comprehensive.task.manager.web.application.Repo.AssigningRepo;
import com.project.personal.comprehensive.task.manager.web.application.Service.AssignedToService;

@Service
public class AssignedToServiceImpl implements AssignedToService {

	@Autowired
	private AssigningRepo assigningRepo;
	@Override
	public boolean UpdateAssignedToDetails(AssignedToDetails assignee) {
		
		
		 if(assigningRepo.existsById(assignee.getAssigningId())) {
			// AssignedToDetails updateDetail = new AssignedToDetails();
			 AssignedToDetails detail = assigningRepo.findById(assignee.getAssigningId()).get();
			 detail.setComments(assignee.getComments());
			 detail.setUpdates(assignee.getUpdates());
			 assigningRepo.save(detail); 
			 return true;
		 }
		
		return false;
	}

	@Override
	public boolean deleteAssignedToDetails(int id) {
		
		 if(assigningRepo.existsById(id)) {
			 AssignedToDetails detail = assigningRepo.findById(id).get(); 
			 assigningRepo.delete(detail);
			 return true;
			 
		 }
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean CreateAssignedToDetails(AssignedToDetails work) {
		if(! assigningRepo.existsById(work.getAssigningId())) {
			AssignedToDetails detail= new AssignedToDetails();
			detail.setAssignedTo(work.getAssignedTo());
			detail.setComments(work.getComments());
			detail.setStatus(work.getStatus());
			detail.setUpdates(work.getUpdates());
			Work data= new Work();
			data.setWorkId(work.getWork().getWorkId());
			detail.setWork(data);
			assigningRepo.save(detail);
			return true;
		}
		
		return false;
	}

}
