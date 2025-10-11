import React from "react";

const subjects = ["DBM", "MC", "EFT", "DC", "CN"];

const AttendanceTableStu = ({ students = [], loading }) => {
    if (loading) return <p className="p-4">Loading students...</p>;
    if (!students.length) return <p className="p-4">No students found.</p>;

    return (
        <div className="overflow-x-auto">
            <table className="table-professional">
                <thead>
                    <tr>
                        <th>Roll No</th>
                        <th>Name</th>
                        <th>Batch</th>
                        {subjects.map((subj, index) => (
                            <th key={index}>{subj}%</th>
                        ))}
                        <th>Total%</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td className="font-medium">{student.rollNo}</td>
                            <td className="font-medium">{student.studentName}</td>
                            <td>
                                <span className="badge badge-info">{student.batch}</span>
                            </td>

                            {/* Map subject percentages */}
                            {subjects.map((subj, index) => {
                                const key = subj.toLowerCase() + "Percentage"; // e.g., dbmPercentage
                                const percentage = student[key]?.toFixed(1) || 0;
                                const getStatusColor = (percentage) => {
                                    if (percentage >= 75) return 'success';
                                    if (percentage >= 50) return 'warning';
                                    return 'error';
                                };
                                const statusColor = getStatusColor(percentage);
                                
                                return (
                                    <td key={index}>
                                        <div className="flex items-center">
                                            <span className={`font-medium text-${statusColor}-600 dark:text-${statusColor}-400`}>
                                                {percentage}%
                                            </span>
                                        </div>
                                    </td>
                                );
                            })}

                            <td>
                                <div className="flex items-center">
                                    <span className="font-bold text-primary-600 dark:text-primary-400">
                                        {student.totalPercentage?.toFixed(1) || 0}%
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceTableStu;
