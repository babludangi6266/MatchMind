package com.matchmind.repository;

import com.matchmind.model.JobPosting;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobPostingRepository extends MongoRepository<JobPosting, String> {
    List<JobPosting> findByRecruiterId(String recruiterId);
    List<JobPosting> findByStatus(JobPosting.Status status);
}
