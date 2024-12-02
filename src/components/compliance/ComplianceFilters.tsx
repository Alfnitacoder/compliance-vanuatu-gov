import React from 'react';
import { useCompliance } from '../../lib/compliance';
import { departments } from '../../data/departments';
import { ComplianceType, ComplianceStatus } from '../../types/compliance';

const types: { value: ComplianceType; label: string }[] = [
  { value: 'policy', label: 'Policy' },
  { value: 'legislation', label: 'Legislation' },
  { value: 'regulation', label: 'Regulation' },
  { value: 'court_case', label: 'Court Case' },
  { value: 'other', label: 'Other' },
];

const statuses: { value: ComplianceStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'archived', label: 'Archived' },
];

export function ComplianceFilters() {
  const { filters, setFilters } = useCompliance();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          id="type"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={filters.type || ''}
          onChange={(e) => setFilters({ ...filters, type: e.target.value as ComplianceType })}
        >
          <option value="">All Types</option>
          {types.map((type) => (
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
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={filters.status || ''}
          onChange={(e) => setFilters({ ...filters, status: e.target.value as ComplianceStatus })}
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="date-range" className="block text-sm font-medium text-gray-700">
          Review Date Range
        </label>
        <input
          type="date"
          id="start-date"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={filters.startDate || ''}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
        />
      </div>
    </div>
  );
}