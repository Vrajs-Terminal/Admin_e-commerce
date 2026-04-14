import React, { useMemo, useState } from 'react';
import { Download, Filter, Search, WalletCards } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const transactionTypes = ['All', 'Order', 'Refund', 'Adjustment', 'Bonus'];
const customerOptions = ['All Customer', 'Robert Downey', 'Chris Evans', 'Ariana Clark', 'Devid Jack'];

const transactions = [
  { id: '27e562f7-8ead-4dc4-91cc-91e7905c6417', createdAt: '2025-09-22', customer: 'Robert Downey', credit: 24, debit: 0, balance: 815, type: 'Order' },
  { id: '89f24a5b-9c75-4bda-966e-168b1a4bf28f', createdAt: '2025-09-22', customer: 'Chris Evans', credit: 325, debit: 0, balance: 553, type: 'Bonus' },
  { id: 'b206f38b-ef74-4eb8-8420-808b60418edb', createdAt: '2025-09-22', customer: 'Robert Downey', credit: 13, debit: 0, balance: 791, type: 'Order' },
  { id: '6a2cb524-f1d9-4374-b06a-3f65cb7b3414', createdAt: '2025-09-23', customer: 'Ariana Clark', credit: 0, debit: 41, balance: 228, type: 'Refund' },
  { id: '2aa650db-c8bb-46ee-b1ef-1b6cc1f1f74d', createdAt: '2025-09-24', customer: 'Devid Jack', credit: 110, debit: 20, balance: 430, type: 'Adjustment' },
];

const formatMoney = (value) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const LoyaltyPointsPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [customerFilter, setCustomerFilter] = useState('All Customer');
  const [search, setSearch] = useState('');

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();
    return transactions.filter((row) => {
      const matchesType = typeFilter === 'All' || row.type === typeFilter;
      const matchesCustomer = customerFilter === 'All Customer' || row.customer === customerFilter;
      const matchesQuery = !query || row.id.toLowerCase().includes(query) || row.customer.toLowerCase().includes(query);

      let matchesDate = true;
      if (startDate) matchesDate = matchesDate && row.createdAt >= startDate;
      if (endDate) matchesDate = matchesDate && row.createdAt <= endDate;

      return matchesType && matchesCustomer && matchesQuery && matchesDate;
    });
  }, [startDate, endDate, typeFilter, customerFilter, search]);

  const totals = useMemo(() => {
    const credit = filteredTransactions.reduce((sum, row) => sum + row.credit, 0);
    const debit = filteredTransactions.reduce((sum, row) => sum + row.debit, 0);
    return {
      credit,
      debit,
      balance: credit - debit,
    };
  }, [filteredTransactions]);

  const resetFilters = () => {
    setStartDate('');
    setEndDate('');
    setTypeFilter('All');
    setCustomerFilter('All Customer');
    setSearch('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-primary-600 dark:bg-primary-900/20">
          20 People & Content
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-surface-900 dark:text-white">Loyalty Point Report</h1>
        <p className="max-w-2xl text-sm sm:text-base text-surface-500">Track loyalty balance flow by customer and transaction type with an export-ready ledger.</p>
      </div>

      <section className="space-y-6 rounded-3xl border border-surface-200 bg-white p-5 shadow-card dark:border-surface-700 dark:bg-surface-800 sm:p-6">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_auto_auto]">
          <div className="grid gap-2 sm:grid-cols-2">
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="w-full rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-sm text-surface-700 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
            />
            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="w-full rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-sm text-surface-700 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            className="rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-sm text-surface-700 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
          >
            {transactionTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={customerFilter}
            onChange={(event) => setCustomerFilter(event.target.value)}
            className="rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-sm text-surface-700 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
          >
            {customerOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <Button type="button" variant="secondary" onClick={resetFilters}>Reset</Button>
          <Button type="button" variant="primary" icon={Filter}>Filter</Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-3xl border border-surface-200 bg-white p-5 shadow-card dark:border-surface-700 dark:bg-surface-800">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-surface-200 bg-surface-50 p-2.5 dark:border-surface-700 dark:bg-surface-900">
              <WalletCards size={18} className="text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-surface-500">Balance</p>
              <h3 className="text-3xl font-extrabold text-surface-900 dark:text-white">{formatMoney(totals.balance)}</h3>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-5 shadow-card dark:border-emerald-900/40 dark:bg-emerald-900/20">
          <p className="text-sm text-surface-500">Credit</p>
          <h3 className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-300">{formatMoney(totals.credit)}</h3>
        </article>

        <article className="rounded-3xl border border-rose-100 bg-rose-50/60 p-5 shadow-card dark:border-rose-900/40 dark:bg-rose-900/20">
          <p className="text-sm text-surface-500">Debit</p>
          <h3 className="text-3xl font-extrabold text-rose-700 dark:text-rose-300">{formatMoney(totals.debit)}</h3>
        </article>
      </section>

      <section className="overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-card dark:border-surface-700 dark:bg-surface-800">
        <div className="flex flex-col gap-3 border-b border-surface-100 p-5 dark:border-surface-700 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-surface-900 dark:text-white">Transactions</h2>
            <p className="text-sm text-surface-500">{filteredTransactions.length} matching entries.</p>
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="relative w-full lg:w-[20rem]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by transaction id or customer"
                className="w-full rounded-xl border border-surface-200 bg-surface-50 py-2.5 pl-10 pr-4 text-sm text-surface-700 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
              />
            </div>
            <Button variant="secondary" icon={Download}>Export</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-sm">
            <thead className="border-b border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900/60">
              <tr>
                <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-surface-500">SL</th>
                <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-surface-500">Transaction ID</th>
                <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-surface-500">Created At</th>
                <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-surface-500">Customer Name</th>
                <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-surface-500">Credit ($)</th>
                <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-surface-500">Debit ($)</th>
                <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-surface-500">Balance ($)</th>
                <th className="px-5 py-4 text-left text-xs uppercase tracking-wide text-surface-500">Transaction Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((row, index) => (
                <tr key={row.id} className="border-b border-surface-100 dark:border-surface-800">
                  <td className="px-5 py-4 text-surface-500">{index + 1}</td>
                  <td className="px-5 py-4 font-medium text-surface-700 dark:text-surface-200">{row.id}</td>
                  <td className="px-5 py-4 text-surface-700 dark:text-surface-200">{row.createdAt}</td>
                  <td className="px-5 py-4 text-surface-900 dark:text-white">{row.customer}</td>
                  <td className="px-5 py-4 text-emerald-700 dark:text-emerald-300">{formatMoney(row.credit)}</td>
                  <td className="px-5 py-4 text-rose-700 dark:text-rose-300">{formatMoney(row.debit)}</td>
                  <td className="px-5 py-4 text-surface-900 dark:text-white">{formatMoney(row.balance)}</td>
                  <td className="px-5 py-4"><Badge variant="info" size="sm">{row.type}</Badge></td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-surface-500 dark:text-surface-400">No loyalty transactions match the current filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default LoyaltyPointsPage;
