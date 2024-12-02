import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DepartmentInfo } from '../../types/department';
import { cn } from '../../lib/utils';

interface DepartmentCardProps {
  department: DepartmentInfo;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/reports', { 
      state: { department: department.id }
    });
  };

  return (
    <div 
      onClick={handleClick}
      className={cn(
        'rounded-lg border border-gray-200 bg-white p-6 shadow-sm',
        'hover:shadow-md transition-all duration-200 cursor-pointer',
        'transform hover:-translate-y-1'
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{department.name}</h3>
        <span className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
          `bg-${department.color}-100 text-${department.color}-800`
        )}>
          {department.id}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-600">{department.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex space-x-4">
          <div>
            <p className="text-xs text-gray-500">Pending Actions</p>
            <p className="text-lg font-semibold text-gray-900">12</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Compliance Rate</p>
            <p className="text-lg font-semibold text-gray-900">87%</p>
          </div>
        </div>
        <div className={cn(
          'rounded-full p-2 transition-colors duration-200',
          `text-${department.color}-600 hover:bg-${department.color}-50`
        )}>
          <ArrowRight className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}