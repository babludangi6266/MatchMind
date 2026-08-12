package com.matchmind.service;

import com.matchmind.dto.AppDtos;
import com.matchmind.model.*;
import com.matchmind.repository.ApplicationRepository;
import com.matchmind.repository.CandidateProfileRepository;
import com.matchmind.repository.JobPostingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AtsPipelineService {

    private final ApplicationRepository applicationRepository;
    private final CandidateProfileRepository candidateProfileRepository;
    private final JobPostingRepository jobPostingRepository;
    private final MatchingEngineService matchingEngineService;
    private final NotificationService notificationService;

    public AppDtos.ApplicationResponse applyForJob(User candidateUser, String jobId, String coverNote) {
        CandidateProfile candidate = candidateProfileRepository.findByUserId(candidateUser.getId())
                .orElseThrow(() -> new IllegalStateException("Candidate profile must be created before applying"));

        JobPosting job = jobPostingRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("Job posting not found"));

        Optional<Application> existing = applicationRepository.findByJobIdAndCandidateId(jobId, candidate.getId());
        if (existing.isPresent()) {
            return mapToResponse(existing.get());
        }

        AppDtos.MatchResult matchResult = matchingEngineService.calculateMatch(candidate, job);

        StageChange initialStage = StageChange.builder()
                .fromStatus(null)
                .toStatus(Application.Status.APPLIED)
                .changedByUserId(candidateUser.getId())
                .changedByName(candidateUser.getFullName())
                .notes("Application submitted by candidate")
                .timestamp(Instant.now())
                .build();

        Application application = Application.builder()
                .jobId(jobId)
                .candidateId(candidate.getId())
                .candidateUserId(candidateUser.getId())
                .tenantId(job.getTenantId())
                .matchScore(matchResult.getMatchScore())
                .status(Application.Status.APPLIED)
                .coverNote(coverNote)
                .auditTrail(new ArrayList<>(List.of(initialStage)))
                .appliedAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        application = applicationRepository.save(application);

        notificationService.sendNotification(
                job.getRecruiterId(),
                "New Job Application Received",
                candidate.getFullName() + " applied for " + job.getTitle() + " (Match Score: " + matchResult.getMatchScore() + "%)",
                "APPLICATION_RECEIVED",
                application.getId()
        );

        return mapToResponse(application);
    }

    public AppDtos.ApplicationResponse updateStatus(User recruiterUser, String applicationId, Application.Status newStatus, String notes) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new IllegalArgumentException("Application not found"));

        Application.Status previousStatus = application.getStatus();
        if (previousStatus == newStatus) {
            return mapToResponse(application);
        }

        StageChange change = StageChange.builder()
                .fromStatus(previousStatus)
                .toStatus(newStatus)
                .changedByUserId(recruiterUser.getId())
                .changedByName(recruiterUser.getFullName())
                .notes(notes != null ? notes : "Stage updated to " + newStatus)
                .timestamp(Instant.now())
                .build();

        if (application.getAuditTrail() == null) {
            application.setAuditTrail(new ArrayList<>());
        }
        application.getAuditTrail().add(change);
        application.setStatus(newStatus);
        application.setUpdatedAt(Instant.now());

        application = applicationRepository.save(application);

        // Notify Candidate of stage change
        notificationService.sendNotification(
                application.getCandidateUserId(),
                "Application Status Update",
                "Your application status for job ID " + application.getJobId() + " moved to: " + newStatus.name(),
                "STATUS_CHANGE",
                application.getId()
        );

        return mapToResponse(application);
    }

    public List<AppDtos.ApplicationResponse> getApplicationsForJob(String jobId) {
        return applicationRepository.findByJobId(jobId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<AppDtos.ApplicationResponse> getApplicationsForCandidate(String candidateUserId) {
        return applicationRepository.findByCandidateUserId(candidateUserId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public AppDtos.ApplicationResponse mapToResponse(Application app) {
        JobPosting job = jobPostingRepository.findById(app.getJobId()).orElse(null);
        CandidateProfile candidate = candidateProfileRepository.findById(app.getCandidateId()).orElse(null);

        return AppDtos.ApplicationResponse.builder()
                .id(app.getId())
                .jobId(app.getJobId())
                .job(job)
                .candidateId(app.getCandidateId())
                .candidateName(candidate != null ? candidate.getFullName() : "Unknown Candidate")
                .candidateTitle(candidate != null ? candidate.getTitle() : "Applicant")
                .candidateSkills(candidate != null ? candidate.getSkills() : List.of())
                .matchScore(app.getMatchScore())
                .status(app.getStatus())
                .coverNote(app.getCoverNote())
                .auditTrail(app.getAuditTrail())
                .appliedAt(app.getAppliedAt())
                .updatedAt(app.getUpdatedAt())
                .build();
    }
}
