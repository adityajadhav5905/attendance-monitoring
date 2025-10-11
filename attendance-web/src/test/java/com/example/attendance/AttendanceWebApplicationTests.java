package com.example.attendance;

import com.example.attendance.controller.StudentAttendanceSummaryController;
import com.example.attendance.repository.StudentAttendanceSummaryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class AttendanceWebApplicationTests {

	@Autowired
	private StudentAttendanceSummaryController controller;

	@Autowired
	private StudentAttendanceSummaryRepository repository;

	@Test
	void contextLoads() {
		assertNotNull(controller);
		assertNotNull(repository);
	}

	@Test
	void testGetAllBatchesEndpoint() {
		// Test that the getAllBatches endpoint exists and returns a list
		List<String> batches = controller.getAllBatches();
		assertNotNull(batches);
		// The list might be empty if no data exists, which is fine for this test
	}
}
