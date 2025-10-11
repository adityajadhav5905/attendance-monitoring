import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentsByBatch, updateStudentAttendance } from "../services/attendanceService";
import { useNavigate } from "react-router-dom";

const FacultyAttendance = () => {
    const navigate = useNavigate();

    const { batch, subject } = useParams();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await getStudentsByBatch(batch);
            const studentsWithStatus = res.data.map((s) => ({ ...s, status: "present" }));
            setStudents(studentsWithStatus);
        } catch (error) {
            console.error("Error fetching students:", error);
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = (id) => {
        setStudents((prev) =>
            prev.map((s) => {
                if (s.id === id) {
                    const nextStatus = s.status === "present" ? "absent" : s.status === "absent" ? "bunk" : "present";
                    return { ...s, status: nextStatus };
                }
                return s;
            })
        );
    };

    const handleSubmit = async () => {
        try {
            for (const student of students) {
                const presentKey = `${subject}Present`;
                const absentKey = `${subject}Absent`;

                const updatedData = { ...student };

                if (student.status === "present") {
                    updatedData[presentKey] = (student[presentKey] || 0) + 1;
                } else if (student.status === "absent") {
                    updatedData[absentKey] = (student[absentKey] || 0) + 1;
                }

                // Recalculate percentage
                const total = (updatedData[presentKey] || 0) + (updatedData[absentKey] || 0);
                updatedData[`${subject}Percentage`] =
                    total > 0 ? (updatedData[presentKey] / total) * 100 : 0;

                await updateStudentAttendance(student.id, subject, student.status === "present");
            }

            alert("Attendance submitted successfully!");
            navigate("/faculty/select-batch");
        } catch (error) {
            console.error("Error submitting attendance:", error);
            alert("Error submitting attendance");
        }
    };

    const getButtonStyle = (status) => {
        switch (status) {
            case "present": return "bg-green-500 text-white";
            case "absent": return "bg-red-500 text-white";
            case "bunk": return "bg-yellow-400 text-white";
            default: return "";
        }
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="header-section">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Log Attendance - {batch} Batch
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Subject: <span className="font-semibold text-primary-600 dark:text-primary-400">{subject.toUpperCase()}</span>
                </p>
            </div>

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
                <div className="space-y-8">
                    {/* Instructions */}
                    <div className="card">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                                    Instructions
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Click on each student's status button to toggle between Present, Absent, and Bunk. 
                                    All students default to Present. Click "Submit Attendance" when done.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Attendance Table */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Student Attendance
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
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((s) => (
                                        <tr key={s.id}>
                                            <td className="font-medium">{s.rollNo}</td>
                                            <td className="font-medium">{s.studentName}</td>
                                            <td className="text-center">
                                                <button
                                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                                        s.status === "present" 
                                                            ? "bg-success-500 hover:bg-success-600 text-white focus:ring-success-500" 
                                                            : s.status === "absent"
                                                            ? "bg-error-500 hover:bg-error-600 text-white focus:ring-error-500"
                                                            : "bg-warning-500 hover:bg-warning-600 text-white focus:ring-warning-500"
                                                    }`}
                                                    onClick={() => toggleStatus(s.id)}
                                                >
                                                    {s.status === "present" && (
                                                        <div className="flex items-center">
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            Present
                                                        </div>
                                                    )}
                                                    {s.status === "absent" && (
                                                        <div className="flex items-center">
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                            Absent
                                                        </div>
                                                    )}
                                                    {s.status === "bunk" && (
                                                        <div className="flex items-center">
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            Bunk
                                                        </div>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            className="btn-primary text-lg px-8 py-3"
                            onClick={handleSubmit}
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Submit Attendance
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FacultyAttendance;
