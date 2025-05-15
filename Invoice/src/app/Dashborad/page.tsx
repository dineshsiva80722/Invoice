"use client";
import React, { useState, useEffect, useRef } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { useUser } from '@/app/Pages/context/UserContext';
import {
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconSitemap,
  IconQuote,
  IconTruckDelivery,
  IconFileInvoice,
  IconCreditCardPay,
  IconReportMoney,
  IconTimezone,
  IconMessageReport,
  IconSportBillard,
  IconHistory,
  IconSearch,
  IconBell,

  IconPlus,
  IconClock,
  IconDotsVertical,

} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Customer from '@/app/Pages/customers'
import Quotes from "@/app/Pages/quotes";
import Items from "@/app/Pages/items";
import Invoice from '@/app/Pages/invoice'
import Profile from '@/app/Pages/profile'
import { useSearchParams } from 'next/navigation';



export default function SidebarDemo() {

  const [activeTab, setActiveTab] = useState("Home");


  const links = [
    {
      label: "Home",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-200" />
      ),
    },
    {
      label: "Customers",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0  text-neutral-200" />
      ),
    },

    {
      label: "items",
      icon: (
        <IconSitemap className="h-5 w-5 shrink-0  text-neutral-200" />
      ),
    },
    {
      label: "Invoices",
      icon: (
        <IconFileInvoice className="h-5 w-5 shrink-0  text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-200" />
      ),
    },
    {
      label: "Quotes",
      icon: (
        <IconQuote className="h-5 w-5 shrink-0  text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);





  const { user } = useUser();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={cn(
        `mx-auto flex w-full  min-h-screen flex-1 flex-col overflow-hidden md:flex-row`,
        `h-screen`)}

    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 border-r border-gray-800">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={link.label}
                  link={{
                    label: link.label,
                    icon: link.icon
                  }}
                  className={cn(
                    "transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer",
                    activeTab === link.label ? "text-neutral-900 dark:text-neutral-100" : " text-neutral-400"
                  )}
                  onClick={() => setActiveTab(link.label)}
                >
                  {link.label}
                </SidebarLink>
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                icon: (
                  <img
                    src='https://res.cloudinary.com/do7dw5dwq/image/upload/v1746777603/bharani_hrisvu.png'
                    className="h-4 w-4 shrink-0 rounded-full cursor-pointer"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </ Sidebar>
      <Dashboard activeTab={activeTab} />
    </div>

  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white " />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-white dark:text-white"
      >
        Dezprox Invoice
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white" />
    </a>
  );
};

// Dummy dashboard component with content
interface DashboardProps {
  activeTab: string;
}

const Dashboard = ({ activeTab }: DashboardProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // btn functions 

  const handleAddCustomer = () => {
    setCurrentTab('Customers');
  };
  const handleProfileClick = () => {
    setCurrentTab('Profile');
  };

  const { user } = useUser();
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || user?.firstName || '';
  // home dashborad
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [lastMonthRevenue, setLastMonthRevenue] = useState(0);
  const [pendinginvoices, setpendinginvoices] = useState(0);
  const [lastMonthPendingInvoices, setlastMonthPendingInvoices] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [lasMonthTotalCustomers, setlasMonthTotalCustomers] = useState(0);
  const [Expense, setExpense] = useState(0);
  const [LastMonthExpense, setLastMonthExpense] = useState(0);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [totalQuotes, setTotalQuotes] = useState(0);
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 p-1 bg-neutral-900  ">
      <div className="flex h-full w-full flex-1 flex-col gap-1  bg-neutral-900   dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex bg-neutral-900 justify-between px-1  items-center w-full h-10 gap-2">
          <div className="flex items-center">
            <div className="flex items-center h-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full h-full pl-10 pr-4 py-2 text-sm text-white bg-neutral-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                />
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div className=" gap-5 h-full p-1 flex items-cener justify-start">
            <div className="relative px-5" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <img
                  src="https://res.cloudinary.com/do7dw5dwq/image/upload/v1746777603/bharani_hrisvu.png"
                  className="w-8 h-8 rounded-full object-cover border-2 border-white/30"
                  alt="Profile"
                />
                <h1 className="text-white">{name}</h1>

              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-lg shadow-lg py-1 z-50 border border-gray-700">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-sm font-medium text-white">{`${user.firstName} ${user.lastName}`}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>

                  <button
                    onClick={handleProfileClick}
                    className="px-4 py-2 text-sm text-white hover:bg-neutral-700 flex items-center w-full text-left"
                  >
                    <IconUserBolt className="w-4 h-4 mr-3 text-gray-400" />
                    Profile
                  </button>



                  <a href="#" className="px-4 py-2 text-sm text-red-400 hover:bg-neutral-700 flex items-center">
                    <IconDotsVertical className="w-4 h-4 mr-3 text-red-400" />
                    Logout
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>
        <div className="flex-1 p-1 overflow-auto">
          {currentTab === "Home" ? (
            <>
              {/* Quick Actions */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleAddCustomer}
                  className="flex items-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors dark:bg-white/20 dark:hover:bg-white/30 border border-white/30"
                >
                  <IconUserBolt className="h-4 w-4 mr-2" />
                  Add Customer
                </button>

              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-white">Total Revenue</h3>
                      <p className="text-2xl font-bold text-gray-100">{totalRevenue}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <IconReportMoney className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-green-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      {lastMonthRevenue}%
                    </span>
                    <span className="text-gray-100 ml-2">from last month</span>
                  </div>
                </div>

                <div className="bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-white">Pending Invoices</h3>
                      <p className="text-2xl font-bold text-gray-100">{pendinginvoices}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                      <IconFileInvoice className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-red-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                      </svg>
                      {lastMonthPendingInvoices}
                    </span>
                    <span className="text-gray-100 ml-2">from last month</span>
                  </div>
                </div>

                <div className="bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-white">Total Customers</h3>
                      <p className="text-2xl font-bold text-gray-100">{totalCustomers}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <IconUserBolt className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-green-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      {lasMonthTotalCustomers}
                    </span>
                    <span className="text-gray-100 ml-2">from last month</span>
                  </div>
                </div>

                <div className="bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-white">Total Expenses</h3>
                      <p className="text-2xl font-bold text-gray-100">{Expense}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                      <IconCreditCardPay className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-red-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                      </svg>
                      {LastMonthExpense}
                    </span>
                    <span className="text-gray-100 ml-2">from last month</span>
                  </div>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-800 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-white">Revenue Overview</h2>
                  <select className="text-sm text-white border border-gray-200  px-2 py-1 outline-none focus:ring focus:ring-blue-500">
                    <option className="bg-neutral-800">Last 7 days</option>
                    <option className="bg-neutral-800">Last 30 days</option>
                    <option className="bg-neutral-800">Last 3 months</option>
                    <option className="bg-neutral-800">Last year</option>
                  </select>
                </div>
                <div className="h-64 bg-neutral-700 rounded-lg flex items-center justify-center">
                  {/* Placeholder for chart - You'll need to integrate a chart library */}
                  <p className="text-gray-200">Revenue chart will be displayed here</p>
                </div>
              </div>

              {/* Recent Activity and Invoices */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="bg-neutral-800 rounded-lg shadow-sm border border-gray-800">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-white">Recent Activity</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <IconFileInvoice className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-100">New invoice created</p>
                          <p className="text-sm text-gray-500">Invoice #1234 for Client XYZ</p>
                          <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <IconCreditCardPay className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-100">Payment received</p>
                          <p className="text-sm text-gray-500">$2,500.00 from ABC Corp</p>
                          <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <IconUserBolt className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-100">New customer added</p>
                          <p className="text-sm text-gray-500">Sarah Connor from Cyberdyne Systems</p>
                          <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Invoices */}
                <div className="bg-neutral-800 rounded-lg shadow-sm border border-gray-800 lg:col-span-2">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Recent Invoices</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left bg-gray-800">
                          <th className="px-6 py-3 text-xs font-medium text-gray-200 uppercase tracking-wider">Invoice</th>
                          <th className="px-6 py-3 text-xs font-medium text-gray-200 uppercase tracking-wider">Client</th>
                          <th className="px-6 py-3 text-xs font-medium text-gray-200 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-xs font-medium text-gray-200 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">#INV-001</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">Tech Corp</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">$3,200.00</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Paid</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">#INV-002</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">Design Co</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">$1,800.00</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">#INV-003</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">Marketing Inc</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">$2,600.00</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Overdue</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>


              </div>
            </>
          ) : currentTab === "Profile" ? (
            <>
              <div className=''>
                <Profile />
              </div>
            </>
          ) : currentTab === "Customers" ? (
            <>
              <div className=''>
                <Customer />
              </div>
            </>
          ) : currentTab === "items" ? (
            <>
              <div className=''>
                <Items />
              </div>
            </>
          ) : currentTab === "Quotes" ? (
            <>
              <div className=''>
                <Quotes />
              </div>
            </>
          ) : currentTab === "Invoices" ? (
            <>
              <div className=''>
                <Invoice />
              </div>
            </>
          ) : (
            <div className="h-full place-content-center w-full">
              <h1 className="text-white text-center text-3xl uppercase underline">page not found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
