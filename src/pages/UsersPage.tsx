import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { UserList } from '../components/users/UserList';
import { UserForm } from '../components/users/UserForm';
import { UserFilters } from '../components/users/UserFilters';
import { useUsers } from '../lib/users';
import { UserFormData } from '../types/user';

export function UsersPage() {
  const [showForm, setShowForm] = useState(false);
  const { createUser } = useUsers();

  const handleCreateUser = async (data: UserFormData) => {
    await createUser(data);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Header />
      <Sidebar />
      
      <main className="lg:pl-64">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {showForm ? (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Create New User</h2>
              <UserForm
                onSubmit={handleCreateUser}
                onCancel={() => setShowForm(false)}
              />
            </div>
          ) : (
            <>
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
                  <p className="mt-2 text-sm text-gray-700">
                    Manage user access and permissions across all departments
                  </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                  >
                    Add User
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <UserFilters />
                <UserList />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}