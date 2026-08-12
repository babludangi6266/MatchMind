package com.matchmind.dto;

import com.matchmind.model.Application;
import com.matchmind.model.JobPosting;
import com.matchmind.model.StageChange;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;
import java.util.Map;

public class AppDtos {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CandidateProfileRequest {
        private String title;
        private String summary;
        private String location;
        private Integer experienceYears;
        private Double targetSalary;
        private Boolean remotePreference;
        private List<String> skills;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class JobPostingRequest {
        private String title;
        private String company;
        private String location;
        private String description;
        private List<String> requirements;
        private List<String> skillsRequired;
        private Double minSalary;
        private Double maxSalary;
        private Integer minExperienceYears;
        private String jobType;
        private Boolean remote;
        private JobPosting.Status status;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MatchFilterRequest {
        private String jobId;
        private Double minSalary;
        private Integer minExperience;
        private Boolean remoteOnly;
        private String location;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MatchResult {
        private JobPosting job;
        private String candidateId;
        private String candidateName;
        private String candidateTitle;
        private Double matchScore; // 0-100
        private Double semanticScore; // 0-100
        private Double filterScore; // 0-100
        private List<String> matchingSkills;
        private List<String> missingSkills;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StatusUpdateRequest {
        private Application.Status status;
        private String notes;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ApplicationResponse {
        private String id;
        private String jobId;
        private JobPosting job;
        private String candidateId;
        private String candidateName;
        private String candidateTitle;
        private List<String> candidateSkills;
        private Double matchScore;
        private Application.Status status;
        private String coverNote;
        private List<StageChange> auditTrail;
        private Instant appliedAt;
        private Instant updatedAt;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AnalyticsSummary {
        private long totalJobs;
        private long totalCandidates;
        private long totalApplications;
        private double averageMatchScore;
        private Map<String, Long> statusBreakdown;
        private Map<String, Double> conversionRates;
        private List<MatchResult> topMatches;
    }
}
