import React from 'react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal,
  Download,
  Calendar,
  DollarSign
} from 'lucide-react';

const transactions = [
  { id: '#TRX-9482', date: 'Apr 03, 2026', customer: 'Alice Cooper', amount: 1250.00, status: 'Completed', method: 'Visa •••• 4242', type: 'Credit' },
  { id: '#TRX-9481', date: 'Apr 03, 2026', customer: 'Emma Wilson', amount: 85.00, status: 'Pending', method: 'Apple Pay', type: 'Credit' },
  { id: '#TRX-9479', date: 'Apr 02, 2026', customer: 'Michael Chen', amount: 450.00, status: 'Completed', method: 'Mastercard •••• 1111', type: 'Credit' },
  { id: '#TRX-9475', date: 'Apr 01, 2026', customer: 'Sarah Jenkins', amount: -129.50, status: 'Refunded', method: 'PayPal', type: 'Debit' },
  { id: '#TRX-9472', date: 'Mar 31, 2026', customer: 'James Rodriguez', amount: 210.25, status: 'Failed', method: 'Google Pay', type: 'Credit' },
];

const Transactions = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto transition-all duration-300">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight animate-slide-in">
            Financial <span className="text-primary-600">Transactions</span>
          </h1>
          <p className="text-sm sm:text-base text-surface-500 max-w-md">
            Track every dollar flowing through your FitFloor store with precision.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-white rounded-xl shadow-sm hover:bg-surface-50 dark:hover:bg-surface-900 transition-all font-bold active:scale-95 text-sm">
          <Download size={18} className="text-primary-600" />
          <span>Export Statement</span>
        </button>
      </div>

      {/* Transaction Filter Card */}
      <div className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-3xl shadow-card p-4 sm:p-6 overflow-hidden transition-all duration-300">
        <div className="flex flex-col xl:flex-row items-center gap-4 mb-8">
           <div className="relative flex-1 w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 group-focus-within:text-primary-500 transition-colors" />
              <input type="text" placeholder="Search by ID, customer, or amount..." className="w-full pl-10 pr-4 py-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 font-bold transition-all text-sm dark:text-white" />
           </div>
           <div className="flex items-center gap-3 w-full xl:w-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-2xl text-xs font-black uppercase tracking-widest text-surface-600 dark:text-surface-300 hover:text-primary-600 transition-all">
                <Calendar size={18} className="text-primary-500" />
                <span>Last 30 Days</span>
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-surface-200 dark:border-surface-700 rounded-2xl text-xs font-black uppercase tracking-widest text-surface-600 dark:text-surface-300 hover:bg-surface-50 transition-all">
                <Filter size={18} className="text-primary-500" />
                <span>Filters</span>
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[850px]">
            <thead className="text-[10px] uppercase font-black tracking-widest text-surface-400 border-b border-surface-50 dark:border-surface-700">
              <tr>
                <th className="py-5 px-6">Transaction ID</th>
                <th className="py-5 px-4">Entity Details</th>
                <th className="py-5 px-4">Full Date</th>
                <th className="py-5 px-4">Pay Method</th>
                <th className="py-5 px-4 text-right">Net Amount</th>
                <th className="py-5 px-4 text-center">Status</th>
                <th className="py-5 px-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-50 dark:divide-surface-700/50">
              {transactions.map((tx, i) => (
                <tr key={i} className="group hover:bg-surface-25 dark:hover:bg-surface-900/40 transition-all cursor-pointer">
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-sm transition-transform group-hover:scale-110 ${tx.type === 'Credit' ? 'bg-green-50 dark:bg-green-900/30 border-green-100 dark:border-green-800 text-green-600' : 'bg-red-50 dark:bg-red-900/30 border-red-100 dark:border-red-800 text-red-600'}`}>
                         {tx.type === 'Credit' ? <ArrowUpRight size={22} /> : <ArrowDownRight size={22} />}
                      </div>
                      <div className="min-w-0">
                        <p className="font-extrabold text-surface-900 dark:text-white text-sm">{tx.id}</p>
                        <p className="text-[10px] text-surface-400 font-black uppercase tracking-widest">{tx.type} FLOW</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-3">
                       <div className="w-9 h-9 rounded-xl bg-surface-100 dark:bg-surface-700 flex items-center justify-center font-black text-[10px] text-surface-500 uppercase shadow-inner">
                          {tx.customer.split(' ').map(n => n[0]).join('')}
                       </div>
                       <span className="text-sm font-bold text-surface-900 dark:text-white uppercase tracking-widest">{tx.customer}</span>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-[10px] font-black text-surface-400 uppercase tracking-widest whitespace-nowrap">{tx.date}</td>
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-2">
                       <CreditCard size={14} className="text-primary-500" />
                       <span className="text-[10px] font-black text-surface-500 uppercase tracking-widest">{tx.method}</span>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-right">
                    <span className={`text-lg font-black ${tx.amount > 0 ? 'text-surface-900 dark:text-white' : 'text-red-500'}`}>
                      {tx.amount > 0 ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                    </span>
                  </td>
                  <td className="py-6 px-4 text-center">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest ${
                      tx.status === 'Completed' ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : 
                      tx.status === 'Pending' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600' : 
                      tx.status === 'Refunded' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'bg-red-50 dark:bg-red-900/20 text-red-600'
                    }`}>
                      {tx.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-6 px-6 text-right">
                    <button className="p-2.5 hover:bg-white dark:hover:bg-surface-700 border border-transparent hover:border-surface-200 dark:hover:border-surface-700 rounded-xl text-surface-400 transition-all opacity-0 group-hover:opacity-100 shadow-sm">
                      <MoreHorizontal size={20} />
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

export default Transactions;
