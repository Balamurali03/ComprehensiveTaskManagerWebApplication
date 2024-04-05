package com.project.personal.comprehensive.task.manager.web.application.Service;

import java.util.List;

import com.project.personal.comprehensive.task.manager.web.application.Entity.AssignedToDetails;
import com.project.personal.comprehensive.task.manager.web.application.Entity.Work;

public interface WorkService {

	public boolean CreateWork(Work work);
	public boolean UpdateWork(Work work);
	public List<AssignedToDetails> ShowMyWork(String email);
	public List<Work> ShowAllWork();
	public List<Work> ShowAllWorkBasedOnCreator(String email);
	public boolean deleteWork(int id);
}
