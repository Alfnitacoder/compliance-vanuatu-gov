import React, { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { ReportList } from '../components/reports/ReportList';
import { ReportFilters } from '../components/reports/ReportFilters';
import { ReportForm } from '../components/reports/ReportForm';
import { ReportAnalytics } from '../components/analytics/ReportAnalytics';
import { useReports } from '../lib/reports';
import { Report } from '../types/report';

export function ReportsPage() {
  const [showForm, setShowForm] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const location = useLocation();
  const { setFilters, createReport } = useReports();
  
  // Set initial department filter if navigated from dashboard
  useEffect(() => {
    if (location.state?.department) {
      setFilters({ department: location.state.department });
    }
  }, [location.state, setFilters]);

  const handleCreateReport = async (data: Partial<Report>) => {
    await createReport(data);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Header />
      <Sidebar />
      
      <main className="lg:pl-64">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {showForm ? (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Create New Report</h2>
              <ReportForm
                onSubmit={handleCreateReport}
                onCancel={() => setShowForm(false)}
              />
            </div>
          ) : (
            <>
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
                  <p className="mt-2 text-sm text-gray-700">
                    Manage and track reports across all departments and provinces
                  </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAnalytics(!showAnalytics)}
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    New Report
                  </button>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                {showAnalytics && <ReportAnalytics />}
                <ReportFilters />
                <ReportList />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}