import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/Layout";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyPortalWrapper from "./pages/FacultyPortalWrapper";
import FacultyAttendanceWrapper from "./pages/FacultyAttendanceWrapper";
import FacultyBatchSelect from "./pages/FacultyBatchSelect";
import FacultyAttendance from "./pages/FacultyAttendance";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/faculty" element={<FacultyDashboard />} />
            <Route path="/faculty/batch/:batch" element={<FacultyPortalWrapper />} />
            <Route path="/faculty/attendance/:batch" element={<FacultyAttendanceWrapper />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/faculty/select-batch" element={<FacultyBatchSelect />} />
            <Route path="/faculty/attendance/:batch/:subject" element={<FacultyAttendance />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
