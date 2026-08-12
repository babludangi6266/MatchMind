package com.matchmind.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StageChange {
    private Application.Status fromStatus;
    private Application.Status toStatus;
    private String changedByUserId;
    private String changedByName;
    private String notes;

    @Builder.Default
    private Instant timestamp = Instant.now();
}
