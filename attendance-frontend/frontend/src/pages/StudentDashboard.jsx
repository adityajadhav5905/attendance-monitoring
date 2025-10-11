import { useState } from "react";


import { getStudentsByRollNo } from "../services/attendanceService";
import AttendanceCardsStu from "../components/AttendanceCardsStu";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#4ade80", "#f87171"]; // Green for present, Red for absent

export default function StudentDashboard() {

  const [rollNo, setRollNo] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rollNo) return;

    setLoading(true);
    try {
      const response = await getStudentsByRollNo(rollNo);
      setStudentData(response.data);
    } catch (err) {
      console.error(err);
      setStudentData(null);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total present and absent
  const totalPresent =
    studentData
      ? ["dbm", "mc", "eft", "dc", "cn"].reduce(
        (sum, key) => sum + (studentData[`${key}Present`] ?? 0),
        0
      )
      : 0;
  const totalAbsent =
    studentData
      ? ["dbm", "mc", "eft", "dc", "cn"].reduce(
        (sum, key) => sum + (studentData[`${key}Absent`] ?? 0),
        0
      )
      : 0;

  const totalData = [
    { name: "Present", value: totalPresent },
    { name: "Absent", value: totalAbsent },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="header-section">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Student Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Track your attendance and academic progress
        </p>
      </div>

      {/* Form and Student Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 content-section">
        {/* Roll Number Form */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Enter Your Details
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your roll number to view your attendance records
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label className="form-label">
                Roll Number
              </label>
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="Enter your roll number"
                className="input-field"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner mr-2"></div>
                  Loading...
                </div>
              ) : (
                'View Attendance'
              )}
            </button>
          </form>
        </div>

        {/* Student Info Card */}
        {studentData && (
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Student Information
              </h2>
            </div>
            <div className="space-y-6">
              {/* Student Details */}
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium text-gray-600 dark:text-gray-400">Name:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{studentData.studentName}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium text-gray-600 dark:text-gray-400">Roll No:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{studentData.rollNo}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-gray-600 dark:text-gray-400">Batch:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{studentData.batch}</span>
                </div>
              </div>

              {/* Total Attendance Summary */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">
                  Overall Attendance
                </h3>
                <div className="flex justify-center mb-4">
                  <PieChart width={120} height={120}>
                    <Pie
                      data={totalData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={50}
                      label={false}
                    >
                      {totalData.map((entry, index) => (
                        <Cell key={`cell-total-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
                <div className="flex justify-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-success-500 rounded-full mr-2"></div>
                    <span className="text-success-600 dark:text-success-400 font-medium">{totalPresent} Present</span>
                  </span>
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-error-500 rounded-full mr-2"></div>
                    <span className="text-error-600 dark:text-error-400 font-medium">{totalAbsent} Absent</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading student data...</p>
          </div>
        </div>
      )}

      {/* Attendance Subject Cards */}
      {studentData && <AttendanceCardsStu student={studentData} />}
    </div>
  );
}
