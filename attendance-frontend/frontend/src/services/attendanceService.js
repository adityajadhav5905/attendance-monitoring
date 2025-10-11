import axios from "axios";
import { API_BASE_URL } from "../config/api";


// Base URL for backend
const BASE_URL = `${API_BASE_URL}/api/student-attendance`;

// Get all students (summary)
export const getAllStudents = async () => {
  return axios.get(BASE_URL);
};

// Get students by batch
export const getStudentsByBatch = async (batch) => {
  return axios.get(`${BASE_URL}/batch/${batch}`);
};

// Get all unique batches
export const getAllBatches = async () => {
  return axios.get(`${BASE_URL}/batches`);
};

export const getStudentsByRollNo = async (rollNo) => {
  return axios.get(`${BASE_URL}/roll/${rollNo}`);
};

// Update student attendance summary
export const updateStudentAttendance = async (id, subject, present) => {
  return axios.put(`${BASE_URL}/update/${id}`, null, {
    params: { subject, present },
  });
};

// // Export as object
// const attendanceService = {
//   getAllStudents,
//   getStudentsByBatch,
//   updateStudentAttendance,
// };

// export default attendanceService;

