import React, { useState } from 'react';
import { Download, Eye, Pencil, Trash2 } from 'lucide-react';
import { Report } from '../../types/report';
import { ReportForm } from './ReportForm';
import { ReportView } from './ReportView';
import { useReports } from '../../lib/reports';

interface ReportActionsProps {
  report: Report;
}

export function ReportActions({ report }: ReportActionsProps) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const { updateReport, deleteReport } = useReports();

  const handleDownload = () => {
    // Create a JSON blob of the report data
    const data = JSON.stringify(report, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${report.id}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleEdit = async (data: Partial<Report>) => {
    await updateReport(report.id, data);
    setShowEditForm(false);
  };

  return (
    <>
      <div className="flex items-center justify-end space-x-2">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-900"
          title="View"
          onClick={() => setShowViewModal(true)}
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="text-blue-600 hover:text-blue-900"
          title="Download"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="text-blue-600 hover:text-blue-900"
          title="Edit"
          onClick={() => setShowEditForm(true)}
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="text-red-600 hover:text-red-900"
          title="Delete"
          onClick={() => deleteReport(report.id)}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Edit Modal */}
      {showEditForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <ReportForm
                initialData={report}
                onSubmit={handleEdit}
                onCancel={() => setShowEditForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <ReportView report={report} onClose={() => setShowViewModal(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}