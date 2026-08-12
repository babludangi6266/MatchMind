package com.matchmind.service;

import com.matchmind.dto.AppDtos;
import com.matchmind.model.CandidateProfile;
import com.matchmind.model.JobPosting;
import com.matchmind.repository.CandidateProfileRepository;
import com.matchmind.repository.JobPostingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MatchingEngineService {

    private final CandidateProfileRepository candidateProfileRepository;
    private final JobPostingRepository jobPostingRepository;

    public AppDtos.MatchResult calculateMatch(CandidateProfile candidate, JobPosting job) {
        double semanticSimilarity = computeCosineSimilarity(candidate.getEmbedding(), job.getEmbedding());
        double semanticScore = Math.max(0.0, Math.min(100.0, (semanticSimilarity + 1.0) / 2.0 * 100.0));
        if (candidate.getEmbedding() == null || candidate.getEmbedding().isEmpty() || job.getEmbedding() == null || job.getEmbedding().isEmpty()) {
            semanticScore = computeKeywordSimilarity(candidate.getSkills(), job.getSkillsRequired());
        }

        // Hard Filter Scores
        double filterScore = computeFilterScore(candidate, job);

        // Hybrid Composite Match Score (60% Semantic Vector, 40% Structured Filters)
        double totalScore = Math.round((semanticScore * 0.6 + filterScore * 0.4) * 10.0) / 10.0;

        List<String> candidateSkills = candidate.getSkills() != null ? candidate.getSkills() : Collections.emptyList();
        List<String> jobSkills = job.getSkillsRequired() != null ? job.getSkillsRequired() : Collections.emptyList();

        List<String> matchingSkills = candidateSkills.stream()
                .filter(cs -> jobSkills.stream().anyMatch(js -> js.equalsIgnoreCase(cs)))
                .collect(Collectors.toList());

        List<String> missingSkills = jobSkills.stream()
                .filter(js -> candidateSkills.stream().noneMatch(cs -> cs.equalsIgnoreCase(js)))
                .collect(Collectors.toList());

        return AppDtos.MatchResult.builder()
                .job(job)
                .candidateId(candidate.getId())
                .candidateName(candidate.getFullName())
                .candidateTitle(candidate.getTitle())
                .matchScore(totalScore)
                .semanticScore(Math.round(semanticScore * 10.0) / 10.0)
                .filterScore(Math.round(filterScore * 10.0) / 10.0)
                .matchingSkills(matchingSkills)
                .missingSkills(missingSkills)
                .build();
    }

    public List<AppDtos.MatchResult> findMatchesForCandidate(String candidateUserId, AppDtos.MatchFilterRequest filter) {
        Optional<CandidateProfile> profileOpt = candidateProfileRepository.findByUserId(candidateUserId);
        if (profileOpt.isEmpty()) {
            return Collections.emptyList();
        }
        CandidateProfile candidate = profileOpt.get();
        List<JobPosting> activeJobs = jobPostingRepository.findByStatus(JobPosting.Status.ACTIVE);

        return activeJobs.stream()
                .filter(job -> {
                    if (filter != null) {
                        if (filter.getMinSalary() != null && job.getMaxSalary() != null && job.getMaxSalary() < filter.getMinSalary()) {
                            return false;
                        }
                        if (filter.getMinExperience() != null && job.getMinExperienceYears() != null && job.getMinExperienceYears() > filter.getMinExperience()) {
                            return false;
                        }
                        if (Boolean.TRUE.equals(filter.getRemoteOnly()) && !Boolean.TRUE.equals(job.getRemote())) {
                            return false;
                        }
                        if (filter.getLocation() != null && !filter.getLocation().isBlank()
                                && job.getLocation() != null && !job.getLocation().toLowerCase().contains(filter.getLocation().toLowerCase())) {
                            return false;
                        }
                    }
                    return true;
                })
                .map(job -> calculateMatch(candidate, job))
                .sorted(Comparator.comparing(AppDtos.MatchResult::getMatchScore).reversed())
                .collect(Collectors.toList());
    }

    public List<AppDtos.MatchResult> findTopCandidatesForJob(String jobId) {
        Optional<JobPosting> jobOpt = jobPostingRepository.findById(jobId);
        if (jobOpt.isEmpty()) {
            return Collections.emptyList();
        }
        JobPosting job = jobOpt.get();
        List<CandidateProfile> allCandidates = candidateProfileRepository.findAll();

        return allCandidates.stream()
                .map(candidate -> calculateMatch(candidate, job))
                .sorted(Comparator.comparing(AppDtos.MatchResult::getMatchScore).reversed())
                .collect(Collectors.toList());
    }

    private double computeCosineSimilarity(List<Double> vecA, List<Double> vecB) {
        if (vecA == null || vecB == null || vecA.isEmpty() || vecB.isEmpty() || vecA.size() != vecB.size()) {
            return 0.0;
        }
        double dotProduct = 0.0;
        double normA = 0.0;
        double normB = 0.0;

        for (int i = 0; i < vecA.size(); i++) {
            double a = vecA.get(i);
            double b = vecB.get(i);
            dotProduct += a * b;
            normA += a * a;
            normB += b * b;
        }

        if (normA == 0 || normB == 0) return 0.0;
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    private double computeKeywordSimilarity(List<String> candidateSkills, List<String> requiredSkills) {
        if (requiredSkills == null || requiredSkills.isEmpty()) return 70.0;
        if (candidateSkills == null || candidateSkills.isEmpty()) return 30.0;

        long matches = candidateSkills.stream()
                .filter(cs -> requiredSkills.stream().anyMatch(rs -> rs.equalsIgnoreCase(cs)))
                .count();

        return Math.min(100.0, ((double) matches / requiredSkills.size()) * 100.0);
    }

    private double computeFilterScore(CandidateProfile candidate, JobPosting job) {
        double score = 100.0;

        // Salary alignment
        if (candidate.getTargetSalary() != null && job.getMinSalary() != null) {
            if (job.getMaxSalary() != null && candidate.getTargetSalary() > job.getMaxSalary()) {
                score -= 20.0;
            }
        }

        // Experience alignment
        if (candidate.getExperienceYears() != null && job.getMinExperienceYears() != null) {
            if (candidate.getExperienceYears() < job.getMinExperienceYears()) {
                int gap = job.getMinExperienceYears() - candidate.getExperienceYears();
                score -= Math.min(30.0, gap * 10.0);
            }
        }

        // Remote preference alignment
        if (Boolean.TRUE.equals(candidate.getRemotePreference()) && !Boolean.TRUE.equals(job.getRemote())) {
            score -= 15.0;
        }

        // Location match
        if (candidate.getLocation() != null && job.getLocation() != null) {
            if (!candidate.getLocation().equalsIgnoreCase(job.getLocation()) && !Boolean.TRUE.equals(job.getRemote())) {
                score -= 10.0;
            }
        }

        return Math.max(0.0, score);
    }
}
