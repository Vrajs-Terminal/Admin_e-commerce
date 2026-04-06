import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  ChevronRight,
  Calendar,
  Store,
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import SalesAnalyticsChart from '../components/charts/SalesAnalyticsChart';

const data = [
  { name: 'Mon', sales: 4000, prevSales: 3200, revenue: 2400 },
  { name: 'Tue', sales: 3000, prevSales: 2800, revenue: 1398 },
  { name: 'Wed', sales: 2000, prevSales: 2400, revenue: 9800 },
  { name: 'Thu', sales: 2780, prevSales: 3100, revenue: 3908 },
  { name: 'Fri', sales: 1890, prevSales: 2200, revenue: 4800 },
  { name: 'Sat', sales: 2390, prevSales: 2100, revenue: 3800 },
  { name: 'Sun', sales: 3490, prevSales: 3800, revenue: 4300 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const currentValue = payload[0].value;
    const change = Math.round(((currentValue - 3200) / 3200) * 100);
    const isPositive = change >= 0;

    return (
      <div className="bg-white/95 dark:bg-surface-800/95 backdrop-blur-md border border-white/20 dark:border-surface-700/50 rounded-2xl shadow-2xl p-4 min-w-[220px]">
        <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-2">{label}</p>
        <p className="text-2xl font-black text-surface-900 dark:text-white mb-1">₹{currentValue.toLocaleString()}</p>
        <div className={`flex items-center gap-1 text-xs font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{isPositive ? '+' : ''}{change}%</span>
        </div>
        <p className="text-[10px] text-surface-500 mt-2">vs previous period</p>
      </div>
    );
  }
  return null;
};

const KPICard = ({ title, value, change, isPositive, icon: Icon, color }) => (
  <div className={`p-4 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-card hover:shadow-card-hover transition-all duration-300 group`}>
    <div className="flex items-center justify-between">
      <div className={`p-2 rounded-lg bg-white dark:bg-surface-900 border border-surface-100 dark:border-surface-700 shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-6`}>
        <Icon className={`w-5 h-5 text-primary-600`} />
      </div>
      <button className="p-1 hover:bg-surface-50 dark:hover:bg-surface-700 rounded-lg text-surface-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreVertical size={14} />
      </button>
    </div>
    <div className="mt-3">
      <div className="flex items-center justify-between gap-1 mb-1">
        <span className="text-xs font-medium text-surface-500">{title}</span>
        <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${isPositive ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'}`}>
          {isPositive ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
          {change}%
        </div>
      </div>
      <div className="text-lg font-bold text-surface-900 dark:text-white tracking-tight">
        {value}
      </div>
    </div>
  </div>
);

const AnalyticsCard = ({ title, value, icon: Icon, high, low, showHigh }) => (
  <div className="p-4 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-card hover:shadow-card-hover transition-all duration-300 group">
    <div className="flex items-center justify-between">
      <div className="p-2 rounded-lg bg-white dark:bg-surface-900 border border-surface-100 dark:border-surface-700 shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-6">
        <Icon className="w-5 h-5 text-primary-600" />
      </div>
      <button className="p-1 hover:bg-surface-50 dark:hover:bg-surface-700 rounded-lg text-surface-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreVertical size={14} />
      </button>
    </div>
    <div className="mt-3">
      <div className="flex items-center justify-between gap-1 mb-1">
        <span className="text-xs font-medium text-surface-500">{title}</span>
        <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${showHigh ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'}`}>
          {showHigh ? (
            <>
              <TrendingUp size={9} />
              {high}%
            </>
          ) : (
            <>
              <TrendingDown size={9} />
              {low}%
            </>
          )}
        </div>
      </div>
      <div className="text-lg font-bold text-surface-900 dark:text-white tracking-tight">
        {value}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 transition-all duration-300">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight animate-slide-in">
            Dashboard <span className="text-primary-600">Overview</span>
          </h1>
          <p className="text-sm sm:text-base text-surface-500 max-w-md">
            Welcome back, Viren! Monitor your store's health at a glance.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto animate-fade-in group">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl shadow-sm text-sm font-medium text-surface-600 dark:text-surface-300 hover:border-primary-500 transition-colors cursor-pointer">
            <Calendar size={16} className="text-primary-500" />
            <span className="whitespace-nowrap">Apr 01 - Apr 07, 2026</span>
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:shadow-primary-500/40 transition-all font-semibold active:scale-95 text-sm sm:text-base">
            Export Data
            <ArrowUpRight size={16} className="text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Business Analytics Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-2">
          <BarChart3 size={24} className="text-primary-600" />
          <h2 className="text-xl font-black text-surface-900 dark:text-white tracking-tight">Business Analytics</h2>
        </div>

        {/* Section: Overview */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-surface-600 dark:text-surface-400 uppercase tracking-wider">Overview</h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="Total Revenue" value="$42,850.50" change="12.5" isPositive={true} icon={DollarSign} />
            <KPICard title="Total Orders" value="1,245" change="8.2" isPositive={true} icon={ShoppingCart} />
            <KPICard title="New Customers" value="84" change="2.4" isPositive={false} icon={Users} />
            <KPICard title="Active Sessions" value="238" change="5.8" isPositive={true} icon={BarChart3} />
          </div>
        </div>

        {/* Section: Order Flow */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-surface-600 dark:text-surface-400 uppercase tracking-wider">Order Flow</h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnalyticsCard title="Pending Orders" value="58" icon={Clock} high="22" low="10" showHigh={false} />
            <AnalyticsCard title="Confirmed Orders" value="21" icon={CheckCircle} high="28" low="7" showHigh={true} />
            <AnalyticsCard title="Packaging" value="9" icon={Package} high="14" low="4" showHigh={true} />
            <AnalyticsCard title="Out for Delivery" value="8" icon={Truck} high="16" low="6" showHigh={true} />
            <AnalyticsCard title="Delivered Orders" value="81" icon={CheckCircle} high="35" low="15" showHigh={true} />
            <AnalyticsCard title="Canceled Orders" value="9" icon={XCircle} high="12" low="2" showHigh={false} />
            <AnalyticsCard title="Returned Orders" value="4" icon={RotateCcw} high="8" low="1" showHigh={false} />
            <AnalyticsCard title="Failed to Deliver" value="5" icon={AlertCircle} high="11" low="3" showHigh={false} />
          </div>
        </div>

        {/* Section: Revenue Insights */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-surface-600 dark:text-surface-400 uppercase tracking-wider">Revenue Insights</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-card hover:shadow-card-hover transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-white dark:bg-surface-900 border border-surface-100 dark:border-surface-700 shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-6">
                  <DollarSign className="w-6 h-6 text-primary-600" />
                </div>
                <button className="p-1 hover:bg-surface-50 dark:hover:bg-surface-700 rounded-lg text-surface-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical size={16} />
                </button>
              </div>
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-sm font-medium text-surface-500">Total Revenue</span>
                  <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-600">
                    <TrendingUp size={10} />
                    12.5%
                  </div>
                </div>
                <div className="text-3xl font-black text-surface-900 dark:text-white tracking-tight">$42,850.50</div>
                <p className="text-xs text-surface-500 mt-3">Monthly revenue growth showing strong upward trend</p>
              </div>
            </div>

            <div className="space-y-4">
              <AnalyticsCard title="Total Stores" value="10" icon={Store} high="25" low="5" showHigh={true} />
              <AnalyticsCard title="Total Products" value="402" icon={Package} high="32" low="12" showHigh={true} />
            </div>
          </div>
        </div>

        {/* Section: Activity */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-surface-600 dark:text-surface-400 uppercase tracking-wider">Activity</h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
            <AnalyticsCard title="Total Orders" value="195" icon={ShoppingCart} high="18" low="8" showHigh={true} />
            <AnalyticsCard title="Total Customers" value="7" icon={Users} high="15" low="3" showHigh={true} />
          </div>
        </div>
      </div>

      {/* Analytics Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 transition-all duration-300 auto-rows-max lg:auto-rows-auto">
        {/* Sales Chart Container */}
        <div className="lg:col-span-2 w-full">
          <SalesAnalyticsChart />
        </div>

        {/* Activity Feed Container */}
        <div className="p-5 sm:p-7 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-3xl shadow-card h-full">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-surface-900 dark:text-white">Recent Activity</h2>
              <button className="text-xs font-bold text-primary-600 hover:text-primary-700 uppercase tracking-wider">View All</button>
           </div>
           <div className="space-y-7 relative">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4 relative group cursor-pointer">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-surface-50 dark:bg-surface-900 border border-surface-100 dark:border-surface-700 p-0.5 relative z-10 transition-transform group-hover:scale-110">
                      <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${i + 62}`} alt="Avatar" className="w-full h-full rounded-lg" />
                  </div>
                  {i !== 4 && <div className="absolute left-5 top-10 w-px h-[calc(100%+28px)] bg-surface-100 dark:bg-surface-700" />}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-surface-900 dark:text-white truncate">Order #{(45821 + i).toString()}</span>
                      <span className="text-[10px] text-surface-400 font-bold uppercase whitespace-nowrap">{i * 15}m ago</span>
                    </div>
                    <p className="text-xs text-surface-500 mt-1 line-clamp-2">New order placed by Alex Johnson for $129.00</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-3xl shadow-card overflow-hidden transition-all duration-300">
        <div className="p-5 sm:p-7 border-b border-surface-100 dark:border-surface-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-surface-900 dark:text-white">Recent Store Orders</h2>
            <p className="text-xs sm:text-sm text-surface-400">Real-time update of your latest customer transactions</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl text-xs font-bold text-surface-600 dark:text-surface-300 hover:text-primary-600 transition-colors whitespace-nowrap">
            Detailed Overview <ChevronRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="text-[10px] font-bold uppercase tracking-widest text-surface-400 border-b border-surface-50 dark:border-surface-700">
              <tr>
                <th className="py-4 px-6">Transaction ID</th>
                <th className="py-4 px-4">Customer</th>
                <th className="py-4 px-4">Full Date</th>
                <th className="py-4 px-4 text-right">Price</th>
                <th className="py-4 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-surface-50 dark:divide-surface-700/50">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="group hover:bg-surface-25 dark:hover:bg-surface-900/30 transition-colors cursor-pointer">
                  <td className="py-4 px-6 font-mono font-bold text-surface-900 dark:text-white text-xs">#FT-82{i}954</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-100 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${i * 812}`} alt="Initials" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-surface-900 dark:text-white text-sm truncate">Jordan Vance</div>
                        <div className="text-[10px] text-surface-500 font-medium">j.vance@mail.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-surface-500 font-bold text-xs">0{i} Apr, 2026</td>
                  <td className="py-4 px-4 text-right font-black text-surface-900 dark:text-white">${(199.99 + (i * 20)).toFixed(2)}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${i % 3 === 0 ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600' : 'bg-primary-50 dark:bg-primary-900/20 text-primary-600'}`}>
                      {i % 3 === 0 ? 'PROCESSING' : 'COMPLETED'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
