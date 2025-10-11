import { createContext, useContext, useState } from "react";

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <AttendanceContext.Provider
      value={{ attendanceData, setAttendanceData, loading, setLoading }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => useContext(AttendanceContext);
