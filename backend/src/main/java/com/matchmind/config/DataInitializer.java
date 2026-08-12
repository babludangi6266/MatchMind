package com.matchmind.config;

import com.matchmind.model.*;
import com.matchmind.repository.*;
import com.matchmind.service.AiEmbeddingService;
import com.matchmind.service.MatchingEngineService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CandidateProfileRepository candidateProfileRepository;
    private final JobPostingRepository jobPostingRepository;
    private final ApplicationRepository applicationRepository;
    private final PasswordEncoder passwordEncoder;
    private final AiEmbeddingService aiEmbeddingService;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Database already seeded with data. Skipping initialization.");
            return;
        }

        log.info("Initializing MatchMind mock dataset for demo & testing...");

        // 1. Create Recruiter User
        User recruiter = User.builder()
                .email("recruiter@matchmind.ai")
                .password(passwordEncoder.encode("password"))
                .fullName("Sarah Jenkins")
                .role(User.Role.RECRUITER)
                .tenantId("org_nexus_ai")
                .organizationName("Nexus AI Technologies")
                .build();
        recruiter = userRepository.save(recruiter);

        // 2. Create Candidate User
        User candidate = User.builder()
                .email("candidate@matchmind.ai")
                .password(passwordEncoder.encode("password"))
                .fullName("Alex Rivera")
                .role(User.Role.CANDIDATE)
                .tenantId("cnd_alex_rivera")
                .build();
        candidate = userRepository.save(candidate);

        // 3. Create Candidate Profile
        List<String> alexSkills = List.of("React", "TypeScript", "Node.js", "Tailwind CSS", "Next.js", "GraphQL", "Docker");
        String alexBio = "Senior Full-Stack Engineer with 5+ years of experience building high-performance modern web applications, vector search architectures, and real-time dashboards.";
        List<Double> alexEmbedding = aiEmbeddingService.generateEmbedding("Alex Rivera Full-Stack Engineer " + alexBio + " " + String.join(" ", alexSkills));

        CandidateProfile alexProfile = CandidateProfile.builder()
                .userId(candidate.getId())
                .tenantId(candidate.getTenantId())
                .fullName("Alex Rivera")
                .title("Senior Full-Stack Engineer")
                .summary(alexBio)
                .location("San Francisco, CA")
                .experienceYears(5)
                .targetSalary(150000.0)
                .remotePreference(true)
                .skills(alexSkills)
                .rawResumeText(alexBio + " Key Skills: " + String.join(", ", alexSkills))
                .embedding(alexEmbedding)
                .build();
        alexProfile = candidateProfileRepository.save(alexProfile);

        // 4. Create Secondary Candidates
        createCandidate("Elena Rostova", "elena@matchmind.ai", "Backend Java Engineer", 6, 140000.0, true, "Seattle, WA",
                List.of("Java", "Spring Boot", "Microservices", "MongoDB", "Kafka", "Docker", "AWS"));

        createCandidate("Marcus Chen", "marcus@matchmind.ai", "Lead AI/ML Engineer", 7, 180000.0, true, "New York, NY",
                List.of("Python", "FastAPI", "PyTorch", "Vector Search", "LangChain", "PostgreSQL", "Docker"));

        createCandidate("Sophia Patel", "sophia@matchmind.ai", "Frontend React Specialist", 4, 125000.0, false, "San Francisco, CA",
                List.of("React", "TypeScript", "Redux", "Tailwind CSS", "REST API", "Figma"));

        // 5. Create Job Postings
        List<String> job1Skills = List.of("React", "TypeScript", "Node.js", "Tailwind CSS", "GraphQL");
        String job1Desc = "We are seeking a Lead Frontend Engineer to architect scalable React web applications, build responsive UI components, and integrate AI vector search backends.";
        List<Double> job1Embedding = aiEmbeddingService.generateEmbedding("Lead Frontend Engineer Nexus AI " + job1Desc + " " + String.join(" ", job1Skills));

        JobPosting job1 = JobPosting.builder()
                .recruiterId(recruiter.getId())
                .tenantId(recruiter.getTenantId())
                .title("Lead Frontend Engineer (React/TypeScript)")
                .company("Nexus AI Technologies")
                .location("San Francisco, CA")
                .description(job1Desc)
                .requirements(List.of("5+ years with React and TypeScript", "Proven track record with Tailwind CSS and performance optimization", "Experience with WebSockets"))
                .skillsRequired(job1Skills)
                .minSalary(140000.0)
                .maxSalary(165000.0)
                .minExperienceYears(5)
                .jobType("FULL_TIME")
                .remote(true)
                .status(JobPosting.Status.ACTIVE)
                .embedding(job1Embedding)
                .build();
        job1 = jobPostingRepository.save(job1);

        List<String> job2Skills = List.of("Java", "Spring Boot", "MongoDB", "Microservices", "Docker");
        String job2Desc = "Looking for a Senior Backend Engineer to develop high-throughput Spring Boot REST microservices and engineer real-time notification pipelines.";
        List<Double> job2Embedding = aiEmbeddingService.generateEmbedding("Senior Backend Engineer " + job2Desc + " " + String.join(" ", job2Skills));

        JobPosting job2 = JobPosting.builder()
                .recruiterId(recruiter.getId())
                .tenantId(recruiter.getTenantId())
                .title("Senior Backend Engineer (Spring Boot / Mongo)")
                .company("Nexus AI Technologies")
                .location("Remote")
                .description(job2Desc)
                .requirements(List.of("4+ years experience in Java 17/21 and Spring Boot 3", "MongoDB aggregation pipelines", "RESTful API design"))
                .skillsRequired(job2Skills)
                .minSalary(135000.0)
                .maxSalary(160000.0)
                .minExperienceYears(4)
                .jobType("FULL_TIME")
                .remote(true)
                .status(JobPosting.Status.ACTIVE)
                .embedding(job2Embedding)
                .build();
        jobPostingRepository.save(job2);

        // 6. Create Initial Application for Alex
        Application app = Application.builder()
                .jobId(job1.getId())
                .candidateId(alexProfile.getId())
                .candidateUserId(candidate.getId())
                .tenantId(job1.getTenantId())
                .matchScore(94.5)
                .status(Application.Status.INTERVIEW)
                .coverNote("Extremely excited about Nexus AI's mission in vector search ATS tools!")
                .auditTrail(List.of(
                        StageChange.builder().fromStatus(null).toStatus(Application.Status.APPLIED).changedByName(candidate.getFullName()).notes("Application submitted").timestamp(Instant.now().minusSeconds(86400 * 3)).build(),
                        StageChange.builder().fromStatus(Application.Status.APPLIED).toStatus(Application.Status.SCREENING).changedByName(recruiter.getFullName()).notes("Profile matches 94.5% vector similarity").timestamp(Instant.now().minusSeconds(86400 * 2)).build(),
                        StageChange.builder().fromStatus(Application.Status.SCREENING).toStatus(Application.Status.INTERVIEW).changedByName(recruiter.getFullName()).notes("Scheduled technical interview round").timestamp(Instant.now().minusSeconds(86400)).build()
                ))
                .appliedAt(Instant.now().minusSeconds(86400 * 3))
                .updatedAt(Instant.now().minusSeconds(86400))
                .build();
        applicationRepository.save(app);

        log.info("MatchMind mock database initialization complete! Demo accounts available:");
        log.info("Candidate: candidate@matchmind.ai / password");
        log.info("Recruiter: recruiter@matchmind.ai / password");
    }

    private void createCandidate(String name, String email, String title, int exp, double targetSalary, boolean remote, String loc, List<String> skills) {
        User u = User.builder()
                .email(email)
                .password(passwordEncoder.encode("password"))
                .fullName(name)
                .role(User.Role.CANDIDATE)
                .tenantId("cnd_" + UUID.randomUUID().toString().substring(0, 6))
                .build();
        u = userRepository.save(u);

        String bio = title + " with " + exp + " years of industry experience. Proficient in " + String.join(", ", skills);
        List<Double> vec = aiEmbeddingService.generateEmbedding(name + " " + title + " " + bio);

        CandidateProfile cp = CandidateProfile.builder()
                .userId(u.getId())
                .tenantId(u.getTenantId())
                .fullName(name)
                .title(title)
                .summary(bio)
                .location(loc)
                .experienceYears(exp)
                .targetSalary(targetSalary)
                .remotePreference(remote)
                .skills(skills)
                .rawResumeText(bio)
                .embedding(vec)
                .build();
        candidateProfileRepository.save(cp);
    }
}
