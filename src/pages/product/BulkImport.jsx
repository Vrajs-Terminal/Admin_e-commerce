import React, { useState } from 'react';
import { FileUp, UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';

const BulkImport = () => {
  const [history, setHistory] = useState([
    { id: 'IMP-301', fileName: 'products-apr-01.csv', imported: 215, failed: 3, status: 'Completed' },
    { id: 'IMP-300', fileName: 'products-mar-28.csv', imported: 80, failed: 0, status: 'Completed' },
  ]);

  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newRun = {
      id: `IMP-${Math.floor(302 + Math.random() * 200)}`,
      fileName: file.name,
      imported: Math.floor(30 + Math.random() * 150),
      failed: Math.floor(Math.random() * 6),
      status: 'Completed',
    };

    setHistory((prev) => [newRun, ...prev]);
  };

  const columns = [
    { key: 'id', label: 'Import ID' },
    { key: 'fileName', label: 'File Name' },
    { key: 'imported', label: 'Imported Rows' },
    { key: 'failed', label: 'Failed Rows' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
          row.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
        }`}>
          {row.status === 'Completed' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight">
          Bulk <span className="text-primary-600">Import</span>
        </h1>
        <p className="text-sm text-surface-500 mt-1">Upload CSV files to create or update products in batch.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 bg-white dark:bg-surface-800 rounded-2xl p-5 border border-surface-200 dark:border-surface-700 shadow-card space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-surface-500">Upload File</h2>
          <label className="border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-2xl p-10 min-h-[220px] flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary-500 transition-colors">
            <UploadCloud size={30} className="text-primary-500 mb-2" />
            <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Click to upload CSV file</span>
            <span className="text-xs text-surface-500 mt-1">Only .csv files, max 10MB</span>
            <input type="file" accept=".csv" className="hidden" onChange={handleImport} />
          </label>
          <div className="flex items-center gap-2">
            <Button variant="secondary" icon={FileUp} type="button">Download Template</Button>
          </div>
        </div>

        <div className="bg-white dark:bg-surface-800 rounded-2xl p-5 border border-surface-200 dark:border-surface-700 shadow-card space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-surface-500">Import Notes</h2>
          <ul className="text-sm text-surface-600 dark:text-surface-300 space-y-2 list-disc pl-5">
            <li>Keep SKU unique in each row.</li>
            <li>Use valid category and sub-category names.</li>
            <li>Use numeric values for price and stock.</li>
            <li>UTF-8 CSV recommended.</li>
          </ul>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-card overflow-hidden">
        <div className="px-5 py-3 border-b border-surface-200 dark:border-surface-700 font-semibold text-surface-700 dark:text-surface-300">Import History</div>
        <Table columns={columns} data={history} pageSize={5} />
      </div>
    </div>
  );
};

export default BulkImport;
