package com.example.attendance.controller;

import com.example.attendance.model.StudentAttendanceSummary;
import com.example.attendance.repository.StudentAttendanceSummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/student-attendance")
@CrossOrigin(origins = "*")
public class StudentAttendanceSummaryController {

    @Autowired
    private StudentAttendanceSummaryRepository repository;

    // 1. Get student by roll number
    @GetMapping("/roll/{rollNo}")
    public Optional<StudentAttendanceSummary> getByRollNo(@PathVariable String rollNo) {
        return repository.findByRollNo(rollNo);
    }

    // 2. Get all students of a batch
    @GetMapping("/batch/{batch}")
    public List<StudentAttendanceSummary> getByBatch(@PathVariable String batch) {
        return repository.findByBatch(batch);
    }

    // 3. Get all unique batches
    @GetMapping("/batches")
    public List<String> getAllBatches() {
        return repository.findDistinctBatches();
    }

    // 4. Update attendance (toggle for a subject)
    @PutMapping("/update/{id}")
    public String updateAttendance(
            @PathVariable int id,
            @RequestParam String subject,
            @RequestParam boolean present) {

        Optional<StudentAttendanceSummary> optional = repository.findById(id);
        if (optional.isEmpty()) return "Student not found";

        StudentAttendanceSummary s = optional.get();

        switch (subject.toLowerCase()) {
            case "dbm" -> {
                if (present) s.setDbmPresent(s.getDbmPresent() + 1);
                else s.setDbmAbsent(s.getDbmAbsent() + 1);
                s.setDbmPercentage(calcPercentage(s.getDbmPresent(), s.getDbmPresent() + s.getDbmAbsent()));
            }
            case "mc" -> {
                if (present) s.setMcPresent(s.getMcPresent() + 1);
                else s.setMcAbsent(s.getMcAbsent() + 1);
                s.setMcPercentage(calcPercentage(s.getMcPresent(), s.getMcPresent() + s.getMcAbsent()));
            }
            case "eft" -> {
                if (present) s.setEftPresent(s.getEftPresent() + 1);
                else s.setEftAbsent(s.getEftAbsent() + 1);
                s.setEftPercentage(calcPercentage(s.getEftPresent(), s.getEftPresent() + s.getEftAbsent()));
            }
            case "dc" -> {
                if (present) s.setDcPresent(s.getDcPresent() + 1);
                else s.setDcAbsent(s.getDcAbsent() + 1);
                s.setDcPercentage(calcPercentage(s.getDcPresent(), s.getDcPresent() + s.getDcAbsent()));
            }
            case "cn" -> {
                if (present) s.setCnPresent(s.getCnPresent() + 1);
                else s.setCnAbsent(s.getCnAbsent() + 1);
                s.setCnPercentage(calcPercentage(s.getCnPresent(), s.getCnPresent() + s.getCnAbsent()));
            }
            default -> {
                return "Invalid subject";
            }
        }

        // Update total present, absent, and percentage
        int totalPresent = s.getDbmPresent() + s.getMcPresent() + s.getEftPresent() + s.getDcPresent() + s.getCnPresent();
        int totalAbsent = s.getDbmAbsent() + s.getMcAbsent() + s.getEftAbsent() + s.getDcAbsent() + s.getCnAbsent();
        s.setTotalPresent(totalPresent);
        s.setTotalAbsent(totalAbsent);
        s.setTotalPercentage(calcPercentage(totalPresent, totalPresent + totalAbsent));

        repository.save(s);
        return "Attendance updated successfully";
    }

    private BigDecimal calcPercentage(int present, int total) {
        if (total == 0) return BigDecimal.ZERO;
        return BigDecimal.valueOf((present * 100.0) / total).setScale(2, BigDecimal.ROUND_HALF_UP);
    }
}
