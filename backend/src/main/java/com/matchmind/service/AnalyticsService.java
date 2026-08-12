package com.matchmind.service;

import com.matchmind.dto.AppDtos;
import com.matchmind.model.Application;
import com.matchmind.repository.ApplicationRepository;
import com.matchmind.repository.CandidateProfileRepository;
import com.matchmind.repository.JobPostingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final JobPostingRepository jobPostingRepository;
    private final CandidateProfileRepository candidateProfileRepository;
    private final ApplicationRepository applicationRepository;

    public AppDtos.AnalyticsSummary getSummaryMetrics() {
        long totalJobs = jobPostingRepository.count();
        long totalCandidates = candidateProfileRepository.count();
        List<Application> allApps = applicationRepository.findAll();
        long totalApps = allApps.size();

        double avgScore = allApps.stream()
                .mapToDouble(a -> a.getMatchScore() != null ? a.getMatchScore() : 0.0)
                .average()
                .orElse(0.0);

        Map<String, Long> statusBreakdown = new LinkedHashMap<>();
        for (Application.Status status : Application.Status.values()) {
            statusBreakdown.put(status.name(), 0L);
        }
        for (Application app : allApps) {
            statusBreakdown.put(app.getStatus().name(), statusBreakdown.getOrDefault(app.getStatus().name(), 0L) + 1);
        }

        Map<String, Double> conversionRates = new LinkedHashMap<>();
        long applied = statusBreakdown.getOrDefault("APPLIED", 0L) + statusBreakdown.getOrDefault("SCREENING", 0L);
        long interviews = statusBreakdown.getOrDefault("INTERVIEW", 0L);
        long hired = statusBreakdown.getOrDefault("HIRED", 0L);

        conversionRates.put("ScreeningRate", totalApps > 0 ? (double) applied / totalApps * 100.0 : 0.0);
        conversionRates.put("InterviewRate", totalApps > 0 ? (double) interviews / totalApps * 100.0 : 0.0);
        conversionRates.put("HireRate", totalApps > 0 ? (double) hired / totalApps * 100.0 : 0.0);

        return AppDtos.AnalyticsSummary.builder()
                .totalJobs(totalJobs)
                .totalCandidates(totalCandidates)
                .totalApplications(totalApps)
                .averageMatchScore(Math.round(avgScore * 10.0) / 10.0)
                .statusBreakdown(statusBreakdown)
                .conversionRates(conversionRates)
                .build();
    }
}
