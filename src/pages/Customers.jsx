import React from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ChevronRight, 
  Mail, 
  Phone, 
  UserPlus
} from 'lucide-react';

const customers = [
  { id: 1, name: 'Alice Cooper', email: 'alice@example.com', phone: '+1 234-567-8901', orders: 12, spent: 1250, city: 'New York', status: 'Active' },
  { id: 2, name: 'Bob Morgan', email: 'bob@example.com', phone: '+1 987-654-3210', orders: 5, spent: 450, city: 'Los Angeles', status: 'Inactive' },
  { id: 3, name: 'Catherine Low', email: 'cat@example.com', phone: '+1 456-789-0123', orders: 24, spent: 5400, city: 'Chicago', status: 'Active' },
  { id: 4, name: 'David Smith', email: 'david@example.com', phone: '+1 789-012-3456', orders: 8, spent: 920, city: 'Houston', status: 'Active' },
  { id: 5, name: 'Elena Gilbert', email: 'elena@example.com', phone: '+1 345-678-9012', orders: 1, spent: 89, city: 'San Diego', status: 'Active' },
];

const Customers = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight animate-slide-in">
            Customer <span className="text-primary-600">Database</span>
          </h1>
          <p className="text-sm sm:text-base text-surface-500 max-w-md">
            Easily find, manage, and segment your entire customer base.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 text-white rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all font-bold active:scale-95 text-sm">
          <UserPlus size={20} />
          <span>New Customer</span>
        </button>
      </div>

      <div className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-3xl shadow-card p-4 sm:p-6 overflow-hidden transition-all duration-300">
        <div className="flex flex-col xl:flex-row items-center gap-4 mb-8">
           <div className="relative flex-1 w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 group-focus-within:text-primary-500 transition-colors" />
              <input type="text" placeholder="Search customer by name or email..." className="w-full pl-10 pr-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 font-bold transition-all text-sm dark:text-white" />
           </div>
           <div className="flex items-center gap-3 w-full xl:w-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-surface-200 dark:border-surface-700 rounded-2xl text-xs font-black uppercase tracking-widest text-surface-600 dark:text-surface-300 hover:bg-surface-50 transition-all">
                <Filter size={18} className="text-primary-500" />
                <span>Filters</span>
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl text-xs font-black uppercase tracking-widest text-surface-600 dark:text-surface-300 hover:text-primary-600 transition-all">
                 Export All
              </button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <tbody className="divide-y divide-surface-50 dark:divide-surface-700/50">
               {customers.map((c, i) => (
                  <tr key={i} className="group hover:bg-surface-25 dark:hover:bg-surface-900/30 transition-all cursor-pointer">
                    <td className="py-6 px-4 first:pl-2">
                       <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-surface-100 to-white dark:from-surface-700 dark:to-surface-800 border-2 border-primary-50 dark:border-primary-900/40 shadow-sm flex items-center justify-center p-[2px] transition-transform group-hover:scale-105">
                             <img src={`https://api.dicebear.com/7.x/open-peeps/svg?seed=${c.name}`} alt="Customer" className="w-full h-full rounded-2xl" />
                          </div>
                          <div className="min-w-0">
                             <h4 className="font-extrabold text-surface-900 dark:text-white group-hover:text-primary-600 transition-colors uppercase tracking-widest text-sm truncate">{c.name}</h4>
                             <div className="flex items-center gap-3 text-[10px] text-surface-400 font-black uppercase tracking-widest mt-1">
                                <span className={c.status === 'Active' ? 'text-green-500' : 'text-surface-300'}>{c.status}</span>
                                <span className="opacity-40">•</span>
                                <span className="truncate">{c.city}</span>
                             </div>
                          </div>
                       </div>
                    </td>
                    <td className="py-6 px-4">
                       <div className="space-y-1.5">
                          <div className="flex items-center gap-2.5 text-xs text-surface-500 font-bold">
                             <Mail size={14} className="text-primary-400" />
                             <span>{c.email}</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs text-surface-500 font-bold">
                             <Phone size={14} className="text-primary-400" />
                             <span>{c.phone}</span>
                          </div>
                       </div>
                    </td>
                    <td className="py-6 px-4 text-center">
                       <p className="text-[10px] font-black text-surface-300 uppercase tracking-widest mb-1">Orders</p>
                       <p className="text-lg font-black text-surface-900 dark:text-white">{c.orders}</p>
                    </td>
                    <td className="py-6 px-4 text-right">
                       <p className="text-[10px] font-black text-surface-300 uppercase tracking-widest mb-1">Total Life Value</p>
                       <p className="text-xl font-black text-primary-600">${c.spent.toLocaleString()}</p>
                    </td>
                    <td className="py-6 px-4 last:pr-2 text-right">
                       <button className="p-3.5 hover:bg-white dark:hover:bg-surface-700 border border-transparent hover:border-surface-100 dark:hover:border-surface-600 rounded-2xl transition-all shadow-none hover:shadow-card-hover opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                          <ChevronRight size={20} className="text-primary-500" />
                       </button>
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

export default Customers;
