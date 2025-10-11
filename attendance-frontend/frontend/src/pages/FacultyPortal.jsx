// src/pages/FacultyPortal.jsx

import React, { useEffect, useState } from "react";
import { getStudentsByBatch } from "../services/attendanceService";

const subjects = ["dbm", "mc", "eft", "dc", "cn", "total"];

const FacultyPortal = ({ batch }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  useEffect(() => {
    if (batch) fetchStudents();
  }, [batch]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await getStudentsByBatch(batch);
      setStudents(res.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="header-section">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Faculty Portal - {batch} Batch
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          View and manage student attendance records
        </p>
      </div>

      {/* Subject Selection */}
      <div className="card content-section">
        <div className="card-header">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Filter by Subject
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400">
            Select a subject to view detailed attendance or view overall statistics
          </p>
        </div>
        <div className="form-group">
          <label className="form-label">Subject / Total</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="input-field"
          >
            {subjects.map((subj) => (
              <option key={subj} value={subj}>
                {subj === "total" ? "Overall Statistics" : subj.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Attendance Table */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading students...</p>
          </div>
        </div>
      ) : students.length === 0 ? (
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Students Found</h3>
          <p className="text-gray-500 dark:text-gray-400">No students are enrolled in this batch.</p>
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {selectedSubject === "total" ? "Overall Attendance Statistics" : `${selectedSubject.toUpperCase()} Subject Attendance`}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {students.length} students in {batch} batch
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="table-professional">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  {selectedSubject === "total" ? (
                    <>
                      <th>Total Present</th>
                      <th>Total Absent</th>
                      <th>Total Lectures</th>
                      <th>Overall %</th>
                    </>
                  ) : (
                    <>
                      <th>{selectedSubject.toUpperCase()} Present</th>
                      <th>{selectedSubject.toUpperCase()} Absent</th>
                      <th>{selectedSubject.toUpperCase()} Total</th>
                      <th>{selectedSubject.toUpperCase()} %</th>
                      <th>Overall %</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  if (selectedSubject === "total") {
                    const totalLectures = student.totalPresent + student.totalAbsent;
                    const percentage = student.totalPercentage?.toFixed(1) || 0;
                    const getStatusColor = (percentage) => {
                      if (percentage >= 75) return 'success';
                      if (percentage >= 50) return 'warning';
                      return 'error';
                    };
                    const statusColor = getStatusColor(percentage);
                    
                    return (
                      <tr key={student.id}>
                        <td className="font-medium">{student.rollNo}</td>
                        <td className="font-medium">{student.studentName}</td>
                        <td>
                          <span className="text-success-600 dark:text-success-400 font-medium">
                            {student.totalPresent}
                          </span>
                        </td>
                        <td>
                          <span className="text-error-600 dark:text-error-400 font-medium">
                            {student.totalAbsent}
                          </span>
                        </td>
                        <td className="font-medium">{totalLectures}</td>
                        <td>
                          <span className={`font-bold text-${statusColor}-600 dark:text-${statusColor}-400`}>
                            {percentage}%
                          </span>
                        </td>
                      </tr>
                    );
                  } else {
                    const presentKey = `${selectedSubject}Present`;
                    const absentKey = `${selectedSubject}Absent`;
                    const percentageKey = `${selectedSubject}Percentage`;

                    const total = (student[presentKey] || 0) + (student[absentKey] || 0);
                    const percentage = student[percentageKey]?.toFixed(1) || 0;
                    const overallPercentage = student.totalPercentage?.toFixed(1) || 0;
                    
                    const getStatusColor = (percentage) => {
                      if (percentage >= 75) return 'success';
                      if (percentage >= 50) return 'warning';
                      return 'error';
                    };
                    const statusColor = getStatusColor(percentage);

                    return (
                      <tr key={student.id}>
                        <td className="font-medium">{student.rollNo}</td>
                        <td className="font-medium">{student.studentName}</td>
                        <td>
                          <span className="text-success-600 dark:text-success-400 font-medium">
                            {student[presentKey] || 0}
                          </span>
                        </td>
                        <td>
                          <span className="text-error-600 dark:text-error-400 font-medium">
                            {student[absentKey] || 0}
                          </span>
                        </td>
                        <td className="font-medium">{total}</td>
                        <td>
                          <span className={`font-bold text-${statusColor}-600 dark:text-${statusColor}-400`}>
                            {percentage}%
                          </span>
                        </td>
                        <td>
                          <span className="font-bold text-primary-600 dark:text-primary-400">
                            {overallPercentage}%
                          </span>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyPortal;
