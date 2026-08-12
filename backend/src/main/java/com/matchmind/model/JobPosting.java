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
@Document(collection = "job_postings")
public class JobPosting {
    @Id
    private String id;

    @Indexed
    private String recruiterId;

    private String tenantId;
    private String title;
    private String company;
    private String location;
    private String description;

    @Builder.Default
    private List<String> requirements = new ArrayList<>();

    @Builder.Default
    private List<String> skillsRequired = new ArrayList<>();

    private Double minSalary;
    private Double maxSalary;
    private Integer minExperienceYears;
    private String jobType; // FULL_TIME, CONTRACT, REMOTE
    private Boolean remote;

    @Builder.Default
    private Status status = Status.ACTIVE;

    // Vector Embedding representation
    @Builder.Default
    private List<Double> embedding = new ArrayList<>();

    @Builder.Default
    private Instant createdAt = Instant.now();

    @Builder.Default
    private Instant updatedAt = Instant.now();

    public enum Status {
        DRAFT,
        ACTIVE,
        CLOSED
    }
}
