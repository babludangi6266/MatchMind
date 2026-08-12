package com.matchmind.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "candidate_profiles")
public class CandidateProfile {
    @Id
    private String id;

    @Indexed
    private String userId;

    private String tenantId;
    private String fullName;
    private String title;
    private String summary;
    private String location;
    private Integer experienceYears;
    private Double targetSalary;
    private Boolean remotePreference;

    @Builder.Default
    private List<String> skills = new ArrayList<>();

    private String resumeFileName;
    private String rawResumeText;

    // Vector Embedding (Gemini 768-dim vector)
    @Builder.Default
    private List<Double> embedding = new ArrayList<>();

    @Builder.Default
    private Instant createdAt = Instant.now();

    @Builder.Default
    private Instant updatedAt = Instant.now();
}
