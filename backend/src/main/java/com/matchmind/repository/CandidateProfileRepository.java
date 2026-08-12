package com.matchmind.repository;

import com.matchmind.model.CandidateProfile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CandidateProfileRepository extends MongoRepository<CandidateProfile, String> {
    Optional<CandidateProfile> findByUserId(String userId);
}
