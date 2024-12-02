import React from 'react';
import { X } from 'lucide-react';
import { Report } from '../../types/report';
import { departments } from '../../data/departments';

interface ReportViewProps {
  report: Report;
  onClose: () => void;
}

const reportTypes = {
  field: 'Field Report',
  compliance: 'Compliance Report',
  gap: 'Gap Analysis',
  action: 'Action Tracking',
};

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  submitted: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export function ReportView({ report, onClose }: ReportViewProps) {
  const department = departments.find(d => d.id === report.department);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Report Details</h2>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-500"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Title</dt>
            <dd className="mt-1 text-sm text-gray-900">{report.title}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Type</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {reportTypes[report.type]}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Department</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {department?.name || report.department}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[report.status]}`}>
                {report.status}
              </span>
            </dd>
          </div>

          {report.province && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Province</dt>
              <dd className="mt-1 text-sm text-gray-900">{report.province}</dd>
            </div>
          )}

          {report.dueDate && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Due Date</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(report.dueDate).toLocaleDateString()}
              </dd>
            </div>
          )}

          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Summary</dt>
            <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
              {report.summary}
            </dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Created By</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {report.createdBy} on {new Date(report.createdAt).toLocaleString()}
            </dd>
          </div>

          {report.attachments && report.attachments.length > 0 && (
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Attachments</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                  {report.attachments.map((attachment, index) => (
                    <li key={index} className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                      <div className="flex w-0 flex-1 items-center">
                        <span className="ml-2 w-0 flex-1 truncate">{attachment}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}