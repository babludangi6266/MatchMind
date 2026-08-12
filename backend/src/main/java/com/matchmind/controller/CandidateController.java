package com.matchmind.controller;

import com.matchmind.dto.AppDtos;
import com.matchmind.model.CandidateProfile;
import com.matchmind.model.User;
import com.matchmind.repository.CandidateProfileRepository;
import com.matchmind.service.AiEmbeddingService;
import com.matchmind.service.MatchingEngineService;
import com.matchmind.service.ResumeParserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/candidates")
@RequiredArgsConstructor
public class CandidateController {

    private final CandidateProfileRepository candidateProfileRepository;
    private final ResumeParserService resumeParserService;
    private final AiEmbeddingService aiEmbeddingService;
    private final MatchingEngineService matchingEngineService;

    @GetMapping("/profile")
    public ResponseEntity<CandidateProfile> getProfile(@AuthenticationPrincipal User user) {
        Optional<CandidateProfile> profile = candidateProfileRepository.findByUserId(user.getId());
        return profile.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/profile")
    public ResponseEntity<CandidateProfile> updateProfile(
            @AuthenticationPrincipal User user,
            @RequestBody AppDtos.CandidateProfileRequest request
    ) {
        CandidateProfile profile = candidateProfileRepository.findByUserId(user.getId())
                .orElse(CandidateProfile.builder()
                        .userId(user.getId())
                        .tenantId(user.getTenantId())
                        .fullName(user.getFullName())
                        .build());

        if (request.getTitle() != null) profile.setTitle(request.getTitle());
        if (request.getSummary() != null) profile.setSummary(request.getSummary());
        if (request.getLocation() != null) profile.setLocation(request.getLocation());
        if (request.getExperienceYears() != null) profile.setExperienceYears(request.getExperienceYears());
        if (request.getTargetSalary() != null) profile.setTargetSalary(request.getTargetSalary());
        if (request.getRemotePreference() != null) profile.setRemotePreference(request.getRemotePreference());
        if (request.getSkills() != null) profile.setSkills(request.getSkills());

        String textForEmbedding = (profile.getTitle() != null ? profile.getTitle() : "") + " "
                + (profile.getSummary() != null ? profile.getSummary() : "") + " "
                + String.join(" ", profile.getSkills()) + " "
                + (profile.getRawResumeText() != null ? profile.getRawResumeText() : "");

        List<Double> embedding = aiEmbeddingService.generateEmbedding(textForEmbedding);
        profile.setEmbedding(embedding);
        profile.setUpdatedAt(Instant.now());

        return ResponseEntity.ok(candidateProfileRepository.save(profile));
    }

    @PostMapping(value = "/resume/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CandidateProfile> uploadResume(
            @AuthenticationPrincipal User user,
            @RequestParam("file") MultipartFile file
    ) {
        String parsedText = resumeParserService.extractTextFromPdf(file);
        List<String> extractedSkills = resumeParserService.extractSkills(parsedText);
        Integer expYears = resumeParserService.extractExperienceYears(parsedText);

        String userId = (user != null) ? user.getId() : "demo-candidate-1";
        String tenantId = (user != null) ? user.getTenantId() : "default-tenant";
        String fullName = (user != null) ? user.getFullName() : "Candidate Demo";

        CandidateProfile profile = candidateProfileRepository.findByUserId(userId)
                .orElse(CandidateProfile.builder()
                        .userId(userId)
                        .tenantId(tenantId)
                        .fullName(fullName)
                        .build());

        profile.setResumeFileName(file.getOriginalFilename());
        profile.setRawResumeText(parsedText);
        profile.setSkills(extractedSkills);
        profile.setExperienceYears(expYears);

        String textForEmbedding = profile.getFullName() + " " + String.join(" ", extractedSkills) + " " + parsedText;
        List<Double> embedding = aiEmbeddingService.generateEmbedding(textForEmbedding);
        profile.setEmbedding(embedding);
        profile.setUpdatedAt(Instant.now());

        return ResponseEntity.ok(candidateProfileRepository.save(profile));
    }

    @PostMapping("/matches")
    public ResponseEntity<List<AppDtos.MatchResult>> getJobMatches(
            @AuthenticationPrincipal User user,
            @RequestBody(required = false) AppDtos.MatchFilterRequest filter
    ) {
        return ResponseEntity.ok(matchingEngineService.findMatchesForCandidate(user.getId(), filter));
    }
}
