package com.project.personal.comprehensive.task.manager.web.application.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Work {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="work_id")
	private int workId;
	private String workTopic;
	private String description;
	private String assignedBy;
	private LocalDate assignedTime;
	private String deadLine;
	
	 @OneToMany(mappedBy = "work", cascade = CascadeType.ALL)
	    @JsonIgnoreProperties("work")
	    private List<AssignedToDetails> assignedTo;
	

}
