package com.project.personal.comprehensive.task.manager.web.application.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.personal.comprehensive.task.manager.web.application.Entity.AssignedToDetails;
import com.project.personal.comprehensive.task.manager.web.application.Entity.Work;
import com.project.personal.comprehensive.task.manager.web.application.Repo.AssigningRepo;
import com.project.personal.comprehensive.task.manager.web.application.Repo.WorkRepo;
import com.project.personal.comprehensive.task.manager.web.application.Service.WorkService;

@Service
public class WorkServiceImpl implements WorkService {

	@Autowired 
	private WorkRepo workRepo;
	
	@Autowired 
	private AssigningRepo assigningRepo;
	
	@Override
	public boolean CreateWork(Work work) {
		
		if( ! workRepo.existsById(work.getWorkId())) {
			workRepo.save(work);
			return true;
		} else {
			return false;
		}
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean UpdateWork(Work updateWork) {
		if( workRepo.existsById(updateWork.getWorkId())) {
			Work work = workRepo.findById(updateWork.getWorkId()).get();
			work.setWorkId(updateWork.getWorkId());
			work.setAssignedBy(updateWork.getAssignedBy());
			work.setAssignedTime(null);
			work.setDeadLine(updateWork.getDeadLine());
			work.setDescription(updateWork.getDescription());
			work.setWorkTopic(updateWork.getWorkTopic());
			workRepo.save(work);
			return true;
		} 
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<AssignedToDetails> ShowMyWork(String email) {
		
		List<AssignedToDetails> getMyWork = assigningRepo.getAssignedToDetailsByEmail(email);
		if(! getMyWork.isEmpty()) {
			return getMyWork;
		}
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Work> ShowAllWork() {
		
		List<Work> allWorkList= workRepo.findAll();
		if(!allWorkList.isEmpty()) {
			return allWorkList;
		}
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Work> ShowAllWorkBasedOnCreator(String email) {
		List<Work> getAllWorkBasedOnCreator = workRepo.getWorkByCreatorEmail(email);
		if(! getAllWorkBasedOnCreator.isEmpty()) {
			return getAllWorkBasedOnCreator;
		}
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deleteWork(int id) {
		
		if(workRepo.existsById(id)) {
			workRepo.delete(workRepo.findById(id).get());
			return true;
		}
		// TODO Auto-generated method stub
		return false;
	}

}
