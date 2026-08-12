package com.matchmind.controller;

import com.matchmind.dto.AppDtos;
import com.matchmind.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/summary")
    public ResponseEntity<AppDtos.AnalyticsSummary> getSummaryMetrics() {
        return ResponseEntity.ok(analyticsService.getSummaryMetrics());
    }
}
