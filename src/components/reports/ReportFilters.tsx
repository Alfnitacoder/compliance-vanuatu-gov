import React from 'react';
import { useReports } from '../../lib/reports';
import { departments } from '../../data/departments';
import { ReportType, ReportStatus, Province } from '../../types/report';

const provinces: Province[] = ['Torba', 'Sanma', 'Penama', 'Malampa', 'Shefa', 'Tafea'];

const reportTypes: { value: ReportType; label: string }[] = [
  { value: 'field', label: 'Field Report' },
  { value: 'compliance', label: 'Compliance Report' },
  { value: 'gap', label: 'Gap Analysis' },
  { value: 'action', label: 'Action Tracking' },
];

const statuses: { value: ReportStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

export function ReportFilters() {
  const { filters, setFilters } = useReports();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Report Type
        </label>
        <select
          id="type"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={filters.type || ''}
          onChange={(e) => setFilters({ ...filters, type: e.target.value as ReportType })}
        >
          <option value="">All Types</option>
          {reportTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">
          Department
        </label>
        <select
          id="department"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={filters.department || ''}
          onChange={(e) => setFilters({ ...filters, department: e.target.value })}
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="province" className="block text-sm font-medium text-gray-700">
          Province
        </label>
        <select
          id="province"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={filters.province || ''}
          onChange={(e) => setFilters({ ...filters, province: e.target.value as Province })}
        >
          <option value="">All Provinces</option>
          {provinces.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={filters.status || ''}
          onChange={(e) => setFilters({ ...filters, status: e.target.value as ReportStatus })}
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}