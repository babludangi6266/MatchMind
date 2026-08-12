package com.matchmind.controller;

import com.matchmind.dto.AppDtos;
import com.matchmind.model.JobPosting;
import com.matchmind.model.User;
import com.matchmind.repository.JobPostingRepository;
import com.matchmind.service.AiEmbeddingService;
import com.matchmind.service.MatchingEngineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobPostingRepository jobPostingRepository;
    private final AiEmbeddingService aiEmbeddingService;
    private final MatchingEngineService matchingEngineService;

    @GetMapping
    public ResponseEntity<List<JobPosting>> getAllJobs() {
        return ResponseEntity.ok(jobPostingRepository.findByStatus(JobPosting.Status.ACTIVE));
    }

    @GetMapping("/my-jobs")
    public ResponseEntity<List<JobPosting>> getRecruiterJobs(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(jobPostingRepository.findByRecruiterId(user.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobPosting> getJobById(@PathVariable String id) {
        return jobPostingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<JobPosting> createJob(
            @AuthenticationPrincipal User user,
            @RequestBody AppDtos.JobPostingRequest request
    ) {
        String textForEmbedding = request.getTitle() + " " + request.getCompany() + " "
                + request.getDescription() + " " + String.join(" ", request.getSkillsRequired());

        List<Double> embedding = aiEmbeddingService.generateEmbedding(textForEmbedding);

        JobPosting job = JobPosting.builder()
                .recruiterId(user.getId())
                .tenantId(user.getTenantId())
                .title(request.getTitle())
                .company(request.getCompany() != null ? request.getCompany() : user.getOrganizationName())
                .location(request.getLocation())
                .description(request.getDescription())
                .requirements(request.getRequirements())
                .skillsRequired(request.getSkillsRequired())
                .minSalary(request.getMinSalary())
                .maxSalary(request.getMaxSalary())
                .minExperienceYears(request.getMinExperienceYears())
                .jobType(request.getJobType())
                .remote(request.getRemote())
                .status(request.getStatus() != null ? request.getStatus() : JobPosting.Status.ACTIVE)
                .embedding(embedding)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        return ResponseEntity.ok(jobPostingRepository.save(job));
    }

    @GetMapping("/{id}/matches")
    public ResponseEntity<List<AppDtos.MatchResult>> getTopCandidatesForJob(@PathVariable String id) {
        return ResponseEntity.ok(matchingEngineService.findTopCandidatesForJob(id));
    }
}
