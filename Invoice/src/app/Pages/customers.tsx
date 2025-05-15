"use client";
import React, { useState, useEffect, useMemo } from "react";
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
  IconAdjustments,
  IconTrash,
  IconArrowsCross
} from "@tabler/icons-react";
import { v4 as uuidv4 } from 'uuid';

// Type Definitions
interface Customer {
  id: string;
  name: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
  totalSpent: number;
  status: 'Active' | 'Pending' | 'New';
  customerSince: string;
}

type SortOrder = 'asc' | 'desc';
type SortField = 'name' | 'totalSpent' | 'customerSince';

export default function CustomersPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([
    // Initial customer data (replace with your actual data)
    {
      id: uuidv4(),
      name: 'Tech Corp',
      contactEmail: 'contact@techcorp.com',
      contactPhone: '+1 (555) 555-0001',
      location: 'San Francisco, CA',
      totalSpent: 10000,
      status: 'Active',
      customerSince: 'Jan 2023',
    },
    {
      id: uuidv4(),
      name: 'Design Co',
      contactEmail: 'contact@designco.com',
      contactPhone: '+1 (555) 555-0002',
      location: 'New York, NY',
      totalSpent: 12500,
      status: 'Pending',
      customerSince: 'Mar 2023',
    },
    {
      id: uuidv4(),
      name: 'Marketing Inc',
      contactEmail: 'contact@marketing.com',
      contactPhone: '+1 (555) 555-0003',
      location: 'Boston, MA',
      totalSpent: 15000,
      status: 'Active',
      customerSince: 'Apr 2023',
    },
    {
      id: uuidv4(),
      name: 'ABC Corp',
      contactEmail: 'contact@abccorp.com',
      contactPhone: '+1 (555) 555-0004',
      location: 'Seattle, WA',
      totalSpent: 17500,
      status: 'New',
      customerSince: 'May 2023',
    },
    {
      id: uuidv4(),
      name: 'Software Co',
      contactEmail: 'contact@software.com',
      contactPhone: '+1 (555) 555-0005',
      location: 'Austin, TX',
      totalSpent: 20000,
      status: 'New',
      customerSince: 'Jun 2023',
    },
  ]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([]);
  const [isBulkActionsOpen, setIsBulkActionsOpen] = useState(false);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [sortField, setSortField] = useState<SortField>('name');
  const [isSortOptionsOpen, setIsSortOptionsOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState<string | null>(null);

  // Add customer form state
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerEmail, setNewCustomerEmail] = useState("");
  const [newCustomerPhone, setNewCustomerPhone] = useState("");
  const [newCustomerLocation, setNewCustomerLocation] = useState("");
  const [newCustomerTotalSpent, setNewCustomerTotalSpent] = useState(0);
  const [newCustomerStatus, setNewCustomerStatus] = useState<Customer['status']>("Active");
  const [newCustomerSince, setNewCustomerSince] = useState("");

  // Function to handle adding a new customer
  const handleAddCustomer = () => {
    const newCustomer: Customer = {
      id: uuidv4(),
      name: newCustomerName,
      contactEmail: newCustomerEmail,
      contactPhone: newCustomerPhone,
      location: newCustomerLocation,
      totalSpent: newCustomerTotalSpent,
      status: newCustomerStatus,
      customerSince: newCustomerSince,
    };

    setCustomers([...customers, newCustomer]);
    setIsAddCustomerOpen(false);
    // Clear form fields
    setNewCustomerName("");
    setNewCustomerEmail("");
    setNewCustomerPhone("");
    setNewCustomerLocation("");
    setNewCustomerTotalSpent(0);
    setNewCustomerStatus("Active");
    setNewCustomerSince("");
  };

  // Filtered customers
  const filteredCustomers = useMemo(() => {
    let filtered = customers;

    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      let comparison = 0;
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'totalSpent') {
        comparison = a.totalSpent - b.totalSpent;
      } else if (sortField === 'customerSince') {
        comparison = a.customerSince.localeCompare(b.customerSince);
      }
      return sortOrder === 'asc' ? comparison : comparison * -1;
    });

    return filtered;
  }, [customers, searchTerm, sortOrder, sortField]);

  const toggleSelectCustomer = (id: string) => {
    if (selectedCustomerIds.includes(id)) {
      setSelectedCustomerIds(selectedCustomerIds.filter(customerId => customerId !== id));
    } else {
      setSelectedCustomerIds([...selectedCustomerIds, id]);
    }
  };

  const toggleSelectAllCustomers = () => {
    if (selectedCustomerIds.length === filteredCustomers.length) {
      setSelectedCustomerIds([]);
    } else {
      setSelectedCustomerIds(filteredCustomers.map(customer => customer.id));
    }
  };

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter(customer => customer.id !== id));
    setSelectedCustomerIds(selectedCustomerIds.filter(customerId => customerId !== id));
  };

  const deleteAllSelectedCustomers = () => {
    const newCustomers = customers.filter(customer => !selectedCustomerIds.includes(customer.id));
    setCustomers(newCustomers);
    setSelectedCustomerIds([]);
  };

  useEffect(() => {
    setSelectedCustomerIds(prevSelected => prevSelected.filter(id => filteredCustomers.find(customer => customer.id === id)));
  }, [filteredCustomers]);

  const closeBulkActions = (e: any) => {
    setIsBulkActionsOpen(!isBulkActionsOpen)
    e.preventDefault()
  }

  const toggleSortOptions = () => {
    setIsSortOptionsOpen(!isSortOptionsOpen);
  };

  const setSorting = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setIsSortOptionsOpen(false);
  };

  const toggleStatusDropdown = (customerId: string) => {
    setStatusDropdownOpen(statusDropdownOpen === customerId ? null : customerId);
  };

  const setCustomerStatus = (customerId: string, newStatus: Customer['status']) => {
    setCustomers(customers.map(customer =>
      customer.id === customerId ? { ...customer, status: newStatus } : customer
    ));
    setStatusDropdownOpen(null);
  };

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            <IconFilter className="h-5 w-5 text-gray-400" />
          </button>
          {selectedCustomerIds.length > 0 && (
            <button
              onClick={deleteAllSelectedCustomers}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
            >
              Delete Selected
            </button>
          )}
          <button
            onClick={() => setIsAddCustomerOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <IconPlus className="h-4 w-4 mr-2" />
            Add Customer
          </button>
          <button onClick={() => setIsBulkActionsOpen(!isBulkActionsOpen)}>
            <IconDotsVertical className="h-5 w-5 text-gray-400" />
          </button>
          {isBulkActionsOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-gray-700 rounded-md shadow-lg z-10">
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-500 hover:text-white"
                  onClick={closeBulkActions}>
                  Action 1
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-500 hover:text-white"
                  onClick={closeBulkActions}>
                  Action 2
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-500 hover:text-white"
                  onClick={closeBulkActions}>
                  Action 3
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-400">Total Customers</h3>
              <p className="text-2xl font-bold text-white">{customers.length}</p>
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
              <p className="text-2xl font-bold text-white">{customers.filter(c => c.status === 'Active').length}</p>
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
              <p className="text-2xl font-bold text-white">{customers.filter(c => {
                const now = new Date();
                const thisMonth = now.getMonth();
                const thisYear = now.getFullYear();
                const customerMonth = new Date(c.customerSince).getMonth();
                const customerYear = new Date(c.customerSince).getFullYear();
                return customerMonth === thisMonth && customerYear === thisYear;
              }).length}</p>
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
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <div className='flex items-center gap-2 relative'>
                    <button onClick={toggleSortOptions} className="flex items-center">
                      <IconAdjustments className="h-4 w-4 shrink-0 text-gray-400" />
                    </button>
                    {isSortOptionsOpen && (
                      <div className="absolute left-0 mt-2 w-48 bg-neutral-800 border border-gray-700 rounded-md shadow-lg z-10">
                        <div className="py-1">
                          <a
                            href="#"
                            className={`block px-4 py-2 text-sm text-white hover:bg-blue-500 hover:text-white ${sortField === 'name' ? 'font-semibold' : ''}`}
                            onClick={() => setSorting('name')}
                          >
                            Name {sortField === 'name' && (sortOrder === 'asc' ? ' (A-Z)' : ' (Z-A)')}
                          </a>
                          <a
                            href="#"
                            className={`block px-4 py-2 text-sm text-white hover:bg-blue-500 hover:text-white ${sortField === 'totalSpent' ? 'font-semibold' : ''}`}
                            onClick={() => setSorting('totalSpent')}
                          >
                            Total Spent {sortField === 'totalSpent' && (sortOrder === 'asc' ? ' (Low to High)' : ' (High to Low)')}
                          </a>
                          <a
                            href="#"
                            className={`block px-4 py-2 text-sm text-white hover:bg-blue-500 hover:text-white ${sortField === 'customerSince' ? 'font-semibold' : ''}`}
                            onClick={() => setSorting('customerSince')}
                          >
                            Customer Since {sortField === 'customerSince' && (sortOrder === 'asc' ? ' (Oldest)' : ' (Newest)')}
                          </a>
                        </div>
                      </div>
                    )}
                    <input
                      type="checkbox"
                      checked={selectedCustomerIds.length === filteredCustomers.length && filteredCustomers.length > 0}
                      onChange={toggleSelectAllCustomers}
                      className="accent-white"
                    />
                    Customer
                  </div>
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-neutral-700">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button onClick={() => deleteCustomer(customer.id)}>
                        <IconTrash className="h-4 w-4 shrink-0 text-gray-400 mr-2" />
                      </button>
                      <input
                        type="checkbox"
                        checked={selectedCustomerIds.includes(customer.id)}
                        onChange={() => toggleSelectCustomer(customer.id)}
                        className="accent-white"
                      />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-white">
                          {customer.name}
                        </p>
                        <p className="text-xs text-gray-400">Customer since {customer.customerSince}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm text-white flex items-center">
                        <IconMail className="h-4 w-4 mr-2 text-gray-400" />
                        {customer.contactEmail}
                      </p>
                      <p className="text-sm text-white flex items-center">
                        <IconPhone className="h-4 w-4 mr-2 text-gray-400" />
                        {customer.contactPhone}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-white flex items-center">
                      <IconMapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {customer.location}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-white">${customer.totalSpent.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4 relative">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-800' :
                        customer.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatusDropdown(customer.id)}
                      className="p-2 hover:bg-neutral-700 rounded-lg transition-colors relative"
                    >
                      <IconDotsVertical className="h-5 w-5 text-gray-400" />
                      {statusDropdownOpen === customer.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-neutral-800 border border-gray-700 rounded-md shadow-lg z-10">
                          <div className="py-1">
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-white hover:bg-blue-500 hover:text-white"
                              onClick={(e) => {
                                e.preventDefault();
                                setCustomerStatus(customer.id, 'Active');
                              }}
                            >
                              Active
                            </a>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-white hover:bg-blue-500 hover:text-white"
                              onClick={(e) => {
                                e.preventDefault();
                                setCustomerStatus(customer.id, 'Pending');
                              }}
                            >
                              Pending
                            </a>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-white hover:bg-blue-500 hover:text-white"
                              onClick={(e) => {
                                e.preventDefault();
                                setCustomerStatus(customer.id, 'New');
                              }}
                            >
                              New
                            </a>
                          </div>
                        </div>
                      )}
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
              Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">5</span> of <span className="font-medium text-white">{customers.length}</span> customers
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

      {/* Add Customer Modal */}
      {isAddCustomerOpen && (
        <div className={`w-full min-h-screen bg-black/90 text-white absolute  top-0  items-center justify-center `} >
          <div
            onClick={() => setIsAddCustomerOpen(!isAddCustomerOpen)}
            className={`w-10 h-10 right-20 cursor-pointer absolute top-0 p-3 `}>
            <IconArrowsCross className="h-4 w-4 shrink-0 text-white" />
          </div>
          <div className='w-4/12 min-h-[40rem] mx-auto mt-32  p-5 '>
            <h1 className='text-center font-bold text-2xl'>Add Customer</h1>
            <form className='w-full' onSubmit={(e) => {
              e.preventDefault();
              handleAddCustomer();
            }} >
              <div className='flex flex-wrap justify-between p-5 items-start'>
                <label className='text-center'>Customer Name</label>
                <input
                  type="text"
                  placeholder='Customer Name'
                  className='bg-gray-500 text-center rounded px-5 py-1'
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                />
              </div>
              <div className='flex flex-wrap justify-between p-5 items-start'>
                <label className='text-center'>Contact Email</label>
                <input
                  type="email"
                  placeholder='Contact Email'
                  className='bg-gray-500 text-center rounded px-5 py-1'
                  value={newCustomerEmail}
                  onChange={(e) => setNewCustomerEmail(e.target.value)}
                />
              </div>
              <div className='flex flex-wrap justify-between p-5 items-start'>
                <label className='text-center'>Contact Phone</label>
                <input
                  type="tel"
                  placeholder='Contact Phone'
                  className='bg-gray-500 text-center rounded px-5 py-1'
                  value={newCustomerPhone}
                  onChange={(e) => setNewCustomerPhone(e.target.value)}
                />
              </div>
              <div className='flex flex-wrap justify-between p-5 items-start'>
                <label className='text-center'>Location</label>
                <input
                  type="text"
                  placeholder='Location'
                  className='bg-gray-500 text-center rounded px-5 py-1'
                  value={newCustomerLocation}
                  onChange={(e) => setNewCustomerLocation(e.target.value)}
                />
              </div>
              <div className='flex flex-wrap justify-between p-5 items-start'>
                <label className='text-center'>Total Spent</label>
                <input
                  type="number"
                  placeholder='Total Spent'
                  className='bg-gray-500 text-center rounded px-5 py-1'
                  value={newCustomerTotalSpent}
                  onChange={(e) => setNewCustomerTotalSpent(Number(e.target.value))}
                />
              </div>
              <div className='flex flex-wrap justify-between p-5 items-start'>
                <label className='text-center'>Status</label>
                <select
                  className='bg-gray-500 text-center rounded px-5 py-1'
                  value={newCustomerStatus}
                  onChange={(e) => setNewCustomerStatus(e.target.value as Customer['status'])}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="New">New</option>
                </select>
              </div>
              <div className='flex flex-wrap justify-between p-5 items-start'>
                <label className='text-center'>Customer Since</label>
                <input
                  type="date"
                  placeholder='Customer Since'
                  className='bg-gray-500 text-center rounded px-5 py-1'
                  value={newCustomerSince}
                  onChange={(e) => setNewCustomerSince(e.target.value)}
                />
              </div>
              <div className='flex flex-wrap justify-between p-5 items-start'>
                <button className='px-10 rounded-sm  mx-auto bg-blue-500 py-2'>Add Customer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}