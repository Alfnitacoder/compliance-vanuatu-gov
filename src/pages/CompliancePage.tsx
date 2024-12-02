import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { ComplianceList } from '../components/compliance/ComplianceList';
import { ComplianceFilters } from '../components/compliance/ComplianceFilters';
import { ComplianceForm } from '../components/compliance/ComplianceForm';
import { useCompliance } from '../lib/compliance';

export function CompliancePage() {
  const [showForm, setShowForm] = useState(false);
  const { createItem } = useCompliance();

  const handleCreateItem = async (data: any) => {
    await createItem(data);
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
              <ComplianceForm
                onSubmit={handleCreateItem}
                onCancel={() => setShowForm(false)}
              />
            </div>
          ) : (
            <>
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-2xl font-semibold text-gray-900">Compliance Management</h1>
                  <p className="mt-2 text-sm text-gray-700">
                    Track and manage policies, legislations, regulations, and other compliance matters
                  </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    New Item
                  </button>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <ComplianceFilters />
                <ComplianceList />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}