// src/pages/FacultyDashboard.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getAllBatches } from "../services/attendanceService";
import LoadingSpinner from "../components/LoadingSpinner";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      setLoading(true);
      const response = await getAllBatches();
      setBatches(response.data || []);
    } catch (error) {
      console.error("Error fetching batches:", error);
      setBatches([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBatchClick = (batch) => {
    // Navigate to faculty portal page for that batch
    navigate(`/faculty/batch/${batch}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="header-section">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Faculty Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Manage student attendance and academic records
        </p>
      </div>

      {/* Batch Selection */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Select Batch
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400">
            Choose a batch to view and manage student attendance
          </p>
        </div>
        
        {batches.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No batches found. Please add students to the database first.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {batches.map((batch) => (
            <div
              key={batch}
              className="group cursor-pointer"
              onClick={() => handleBatchClick(batch)}
            >
              <div className="card hover:shadow-soft-lg transition-all duration-200 group-hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors duration-200">
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {batch.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {batch} Batch
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Click to view and update student attendance
                  </p>
                  <div className="flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-200">
                    <span className="text-sm font-medium">View Details</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default FacultyDashboard;
