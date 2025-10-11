import { useParams } from "react-router-dom";
import FacultyAttendance from "./FacultyAttendance";

const FacultyAttendanceWrapper = () => {
    const { batch } = useParams();
    return <FacultyAttendance batch={batch} />;
};
export default FacultyAttendanceWrapper;