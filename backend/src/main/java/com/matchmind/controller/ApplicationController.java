package com.matchmind.controller;

import com.matchmind.dto.AppDtos;
import com.matchmind.model.User;
import com.matchmind.service.AtsPipelineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final AtsPipelineService atsPipelineService;

    @PostMapping("/apply")
    public ResponseEntity<AppDtos.ApplicationResponse> apply(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, String> payload
    ) {
        String jobId = payload.get("jobId");
        String coverNote = payload.get("coverNote");
        return ResponseEntity.ok(atsPipelineService.applyForJob(user, jobId, coverNote));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<AppDtos.ApplicationResponse> updateStatus(
            @AuthenticationPrincipal User user,
            @PathVariable String id,
            @RequestBody AppDtos.StatusUpdateRequest request
    ) {
        return ResponseEntity.ok(atsPipelineService.updateStatus(user, id, request.getStatus(), request.getNotes()));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<AppDtos.ApplicationResponse>> getApplicationsForJob(@PathVariable String jobId) {
        return ResponseEntity.ok(atsPipelineService.getApplicationsForJob(jobId));
    }

    @GetMapping("/my-applications")
    public ResponseEntity<List<AppDtos.ApplicationResponse>> getMyApplications(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(atsPipelineService.getApplicationsForCandidate(user.getId()));
    }
}
