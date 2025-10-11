import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const subjects = [
  { name: "DBM", key: "dbm" },
  { name: "MC", key: "mc" },
  { name: "EFT", key: "eft" },
  { name: "DC", key: "dc" },
  { name: "CN", key: "cn" },
];

const COLORS = ["#4ade80", "#f87171"]; // Green for present, Red for absent

const AttendanceCardsStu = ({ student }) => {
  if (!student) return <p className="p-4">No student data found.</p>;

  return (
    <div className="mt-8">
      <div className="header-section">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
          Subject-wise Attendance
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center">
          Detailed breakdown of your attendance across all subjects
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {subjects.map((subj) => {
          const present = student[`${subj.key}Present`] ?? 0;
          const absent = student[`${subj.key}Absent`] ?? 0;
          const total = present + absent;
          const percentage = student[`${subj.key}Percentage`] ?? 0;

          const data = [
            { name: "Present", value: present },
            { name: "Absent", value: absent },
          ];

          // Determine status color based on percentage
          const getStatusColor = (percentage) => {
            if (percentage >= 75) return 'success';
            if (percentage >= 50) return 'warning';
            return 'error';
          };

          const statusColor = getStatusColor(percentage);

          return (
            <div
              key={subj.key}
              className="card hover:shadow-soft-lg transition-all duration-200"
            >
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {subj.name}
                </h3>
                
                {/* Pie Chart */}
                <div className="flex justify-center mb-4">
                  <PieChart width={100} height={100}>
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={40}
                      label={false}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>

                {/* Statistics */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Total Classes:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{total}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Present:</span>
                    <span className="font-medium text-success-600 dark:text-success-400">{present}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Absent:</span>
                    <span className="font-medium text-error-600 dark:text-error-400">{absent}</span>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Percentage:</span>
                      <span className={`font-bold text-${statusColor}-600 dark:text-${statusColor}-400`}>
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`bg-${statusColor}-500 h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="mt-2 flex justify-center">
                      <span className={`badge badge-${statusColor}`}>
                        {percentage >= 75 ? 'Good' : percentage >= 50 ? 'Average' : 'Low'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceCardsStu;
