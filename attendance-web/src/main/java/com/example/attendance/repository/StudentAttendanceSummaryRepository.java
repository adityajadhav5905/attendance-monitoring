package com.example.attendance.repository;

import com.example.attendance.model.StudentAttendanceSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentAttendanceSummaryRepository extends JpaRepository<StudentAttendanceSummary, Integer> {
    Optional<StudentAttendanceSummary> findByRollNo(String rollNo);
    List<StudentAttendanceSummary> findByBatch(String batch);
    
    @Query("SELECT DISTINCT s.batch FROM StudentAttendanceSummary s ORDER BY s.batch")
    List<String> findDistinctBatches();
}
