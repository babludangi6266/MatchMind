package com.matchmind.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.*;

@Slf4j
@Service
public class ResumeParserService {

    private static final List<String> KNOWN_SKILLS = List.of(
            "Java", "Spring Boot", "Spring", "React", "ReactJS", "React.js", "TypeScript", "JavaScript",
            "Node.js", "Node", "Python", "Django", "FastAPI", "MongoDB", "PostgreSQL", "MySQL", "Redis",
            "Docker", "Kubernetes", "AWS", "GCP", "Azure", "GraphQL", "REST API", "Kafka", "Elasticsearch",
            "Tailwind CSS", "Next.js", "Git", "CI/CD", "JUnit", "Microservices", "System Design", "Agile"
    );

    public String extractTextFromPdf(MultipartFile file) {
        if (file.isEmpty()) {
            return "";
        }
        try (InputStream inputStream = file.getInputStream();
             PDDocument document = Loader.loadPDF(inputStream.readAllBytes())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        } catch (Exception e) {
            log.error("Failed to parse PDF resume", e);
            return "";
        }
    }

    public List<String> extractSkills(String text) {
        if (text == null || text.isBlank()) return Collections.emptyList();
        Set<String> matchedSkills = new LinkedHashSet<>();

        for (String skill : KNOWN_SKILLS) {
            try {
                java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("(?i)\\b" + java.util.regex.Pattern.quote(skill) + "\\b");
                if (pattern.matcher(text).find() || text.toLowerCase().contains(skill.toLowerCase())) {
                    matchedSkills.add(skill);
                }
            } catch (Exception e) {
                if (text.toLowerCase().contains(skill.toLowerCase())) {
                    matchedSkills.add(skill);
                }
            }
        }
        return new ArrayList<>(matchedSkills);
    }

    public Integer extractExperienceYears(String text) {
        if (text == null || text.isBlank()) return 1;
        var pattern = java.util.regex.Pattern.compile("(?i)(\\d+)\\+?\\s*years?\\s+(of\\s+)?experience");
        var matcher = pattern.matcher(text);
        if (matcher.find()) {
            try {
                return Integer.parseInt(matcher.group(1));
            } catch (Exception ignored) {}
        }
        return 3; // sensible fallback
    }
}
