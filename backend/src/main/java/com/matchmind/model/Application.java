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
@Document(collection = "applications")
public class Application {
    @Id
    private String id;

    @Indexed
    private String jobId;

    @Indexed
    private String candidateId;

    @Indexed
    private String candidateUserId;

    private String tenantId;
    private Double matchScore; // 0.0 to 100.0

    @Builder.Default
    private Status status = Status.APPLIED;

    private String coverNote;

    @Builder.Default
    private List<StageChange> auditTrail = new ArrayList<>();

    @Builder.Default
    private Instant appliedAt = Instant.now();

    @Builder.Default
    private Instant updatedAt = Instant.now();

    public enum Status {
        APPLIED,
        SCREENING,
        INTERVIEW,
        OFFER,
        HIRED,
        REJECTED
    }
}
