package com.matchmind.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.*;

@Slf4j
@Service
public class AiEmbeddingService {

    @Value("${matchmind.gemini.api-key:}")
    private String geminiApiKey;

    @Value("${matchmind.gemini.embedding-model:text-embedding-004}")
    private String modelName;

    private static final int VECTOR_DIMENSION = 64;
    private final RestTemplate restTemplate = new RestTemplate();

    public List<Double> generateEmbedding(String text) {
        if (text == null || text.isBlank()) {
            return Collections.nCopies(VECTOR_DIMENSION, 0.0);
        }

        if (geminiApiKey != null && !geminiApiKey.isBlank()) {
            try {
                return callGeminiApi(text);
            } catch (Exception e) {
                log.warn("Gemini API call failed, falling back to local semantic vector generator: {}", e.getMessage());
            }
        }

        return generateFallbackVector(text);
    }

    private List<Double> callGeminiApi(String text) {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/" + modelName + ":embedContent?key=" + geminiApiKey;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "model", "models/" + modelName,
                "content", Map.of("parts", List.of(Map.of("text", text)))
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            Map embeddingMap = (Map) response.getBody().get("embedding");
            if (embeddingMap != null && embeddingMap.containsKey("values")) {
                List<Number> values = (List<Number>) embeddingMap.get("values");
                List<Double> doubleValues = new ArrayList<>();
                for (Number val : values) {
                    doubleValues.add(val.doubleValue());
                }
                return normalizeVector(doubleValues);
            }
        }
        return generateFallbackVector(text);
    }

    /**
     * Deterministic Semantic Vector Generator fallback based on hash projection & word n-grams
     */
    public List<Double> generateFallbackVector(String text) {
        double[] vector = new double[VECTOR_DIMENSION];
        String cleanText = text.toLowerCase().replaceAll("[^a-z0-9\\s]", " ");
        String[] words = cleanText.split("\\s+");

        for (String word : words) {
            if (word.isBlank()) continue;
            try {
                MessageDigest md = MessageDigest.getInstance("SHA-256");
                byte[] hash = md.digest(word.getBytes(StandardCharsets.UTF_8));
                for (int i = 0; i < VECTOR_DIMENSION; i++) {
                    int b = hash[i % hash.length] & 0xFF;
                    vector[i] += (b - 128.0) / 128.0;
                }
            } catch (Exception e) {
                int hash = word.hashCode();
                vector[Math.abs(hash) % VECTOR_DIMENSION] += 1.0;
            }
        }

        List<Double> result = new ArrayList<>(VECTOR_DIMENSION);
        double norm = 0.0;
        for (double v : vector) {
            norm += v * v;
        }
        norm = Math.sqrt(norm);
        if (norm < 1e-6) norm = 1.0;

        for (double v : vector) {
            result.add(v / norm);
        }
        return result;
    }

    public List<Double> normalizeVector(List<Double> vector) {
        double norm = 0.0;
        for (Double v : vector) {
            norm += v * v;
        }
        norm = Math.sqrt(norm);
        if (norm < 1e-6) return vector;

        List<Double> normalized = new ArrayList<>(vector.size());
        for (Double v : vector) {
            normalized.add(v / norm);
        }
        return normalized;
    }
}
