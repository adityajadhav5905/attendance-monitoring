import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBatches } from "../services/attendanceService";
import LoadingSpinner from "../components/LoadingSpinner";

const subjects = ["dbm", "mc", "eft", "dc", "cn"];

export default function FacultyBatchSelect() {
    const [batches, setBatches] = useState([]);
    const [batch, setBatch] = useState("");
    const [subject, setSubject] = useState(subjects[0]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBatches();
    }, []);

    const fetchBatches = async () => {
        try {
            setLoading(true);
            const response = await getAllBatches();
            const batchList = response.data || [];
            setBatches(batchList);
            if (batchList.length > 0) {
                setBatch(batchList[0]);
            }
        } catch (error) {
            console.error("Error fetching batches:", error);
            setBatches([]);
        } finally {
            setLoading(false);
        }
    };

    const handleContinue = () => {
        // Navigate to attendance page with batch & subject as URL params
        navigate(`/faculty/attendance/${batch}/${subject}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (batches.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full">
                    <div className="card">
                        <div className="card-header">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
                                No Batches Available
                            </h1>
                            <p className="text-base text-gray-500 dark:text-gray-400 text-center">
                                Please add students to the database first.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full">
                <div className="card">
                    <div className="card-header">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
                            Select Batch & Subject
                        </h1>
                        <p className="text-base text-gray-500 dark:text-gray-400 text-center">
                            Choose the batch and subject to log attendance
                        </p>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="form-group">
                            <label className="form-label">Batch</label>
                            <select
                                value={batch}
                                onChange={(e) => setBatch(e.target.value)}
                                className="input-field"
                            >
                                {batches.map((b) => (
                                    <option key={b} value={b}>{b} Batch</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label">Subject</label>
                            <select
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="input-field"
                            >
                                {subjects.map((s) => (
                                    <option key={s} value={s}>{s.toUpperCase()}</option>
                                ))}
                            </select>
                        </div>
                        
                        <button
                            className="btn-primary w-full"
                            onClick={handleContinue}
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            Continue to Attendance
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
