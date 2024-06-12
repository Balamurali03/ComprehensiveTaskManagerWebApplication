package com.project.personal.comprehensive.task.manager.web.application.Service;

import com.project.personal.comprehensive.task.manager.web.application.Entity.AssignedToDetails;

public interface AssignedToService {
	
	public boolean UpdateAssignedToDetails(AssignedToDetails work);
	public boolean CreateAssignedToDetails(AssignedToDetails work);
	
	public boolean deleteAssignedToDetails(int id);

}
