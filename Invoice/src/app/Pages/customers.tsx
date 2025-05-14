"use client";
import React, { useState } from "react";
import {
  IconUserBolt,
  IconPlus,
  IconSearch,
  IconFilter,
  IconDotsVertical,
  IconMail,
  IconPhone,
  IconBuildingStore,
  IconMapPin,
} from "@tabler/icons-react";

export default function CustomersPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex-1 p-2 bg-neutral-900">
      {/* Header with Search and Actions */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Customers</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-neutral-800 border border-gray-700 rounded-lg px-3 py-2 w-64">
            <IconSearch className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..." 
              className="ml-2 outline-none flex-1 text-white bg-transparent placeholder-gray-400"
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            <IconFilter className="h-5 w-5 text-gray-400" />
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <IconPlus className="h-4 w-4 mr-2" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-400">Total Customers</h3>
              <p className="text-2xl font-bold text-white">64</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <IconUserBolt className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-400">Active Customers</h3>
              <p className="text-2xl font-bold text-white">48</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <IconBuildingStore className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-400">New This Month</h3>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <IconPlus className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-neutral-800 rounded-lg shadow-sm border border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-neutral-700">
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <tr key={index} className="hover:bg-neutral-700">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                        {index === 0 ? 'TC' : index === 1 ? 'DC' : index === 2 ? 'MI' : index === 3 ? 'AC' : 'SC'}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-white">
                          {index === 0 ? 'Tech Corp' : index === 1 ? 'Design Co' : index === 2 ? 'Marketing Inc' : index === 3 ? 'ABC Corp' : 'Software Co'}
                        </p>
                        <p className="text-xs text-gray-400">Customer since {index === 0 ? 'Jan 2023' : index === 1 ? 'Mar 2023' : index === 2 ? 'Apr 2023' : index === 3 ? 'May 2023' : 'Jun 2023'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-white flex items-center">
                        <IconMail className="h-4 w-4 mr-2 text-gray-400" />
                        contact@{index === 0 ? 'techcorp' : index === 1 ? 'designco' : index === 2 ? 'marketing' : index === 3 ? 'abccorp' : 'software'}.com
                      </p>
                      <p className="text-sm text-white flex items-center">
                        <IconPhone className="h-4 w-4 mr-2 text-gray-400" />
                        +1 (555) {index}55-0{index}00
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-white flex items-center">
                      <IconMapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {index === 0 ? 'San Francisco, CA' : index === 1 ? 'New York, NY' : index === 2 ? 'Boston, MA' : index === 3 ? 'Seattle, WA' : 'Austin, TX'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-white">${(10000 + index * 2500).toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      index === 0 || index === 2 ? 'bg-green-100 text-green-800' : 
                      index === 1 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {index === 0 || index === 2 ? 'Active' : index === 1 ? 'Pending' : 'New'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-neutral-700 rounded-lg transition-colors">
                      <IconDotsVertical className="h-5 w-5 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">5</span> of <span className="font-medium text-white">20</span> customers
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-700 rounded-md text-sm font-medium text-gray-400 hover:bg-neutral-700">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-700 rounded-md text-sm font-medium text-gray-400 hover:bg-neutral-700">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
