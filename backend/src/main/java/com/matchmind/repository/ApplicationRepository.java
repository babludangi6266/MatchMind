package com.matchmind.repository;

import com.matchmind.model.Application;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends MongoRepository<Application, String> {
    List<Application> findByJobId(String jobId);
    List<Application> findByCandidateId(String candidateId);
    List<Application> findByCandidateUserId(String candidateUserId);
    Optional<Application> findByJobIdAndCandidateId(String jobId, String candidateId);
    long countByJobIdAndStatus(String jobId, Application.Status status);
}
