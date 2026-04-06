import React, { useMemo, useState } from 'react';
import { CheckCircle2, Clock3, XCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import { restockRequestsSeed } from './productData';

const RequestRestockList = () => {
  const [requests, setRequests] = useState(restockRequestsSeed);

  const rows = useMemo(() => requests.map((item, index) => ({ ...item, sl: index + 1 })), [requests]);

  const updateStatus = (id, status) => {
    setRequests((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  const columns = [
    { key: 'sl', label: 'SL', render: (row) => <span>{row.sl}</span> },
    {
      key: 'productName',
      label: 'Product',
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-surface-900 dark:text-white">{row.productName}</span>
          <span className="text-xs text-surface-500">{row.sku}</span>
        </div>
      ),
    },
    { key: 'requestedQty', label: 'Requested Qty' },
    { key: 'currentStock', label: 'Current Stock' },
    { key: 'supplier', label: 'Supplier' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
          row.status === 'Approved'
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
            : row.status === 'Rejected'
              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
        }`}>
          {row.status === 'Approved' ? <CheckCircle2 size={12} /> : row.status === 'Rejected' ? <XCircle size={12} /> : <Clock3 size={12} />}
          {row.status}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Action',
      sortable: false,
      render: (row) => (
        <div className="flex gap-2" onClick={(event) => event.stopPropagation()}>
          <Button size="sm" variant="success" disabled={row.status !== 'Pending'} onClick={() => updateStatus(row.id, 'Approved')}>
            Approve
          </Button>
          <Button size="sm" variant="danger" disabled={row.status !== 'Pending'} onClick={() => updateStatus(row.id, 'Rejected')}>
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight">
          Request <span className="text-primary-600">Restock List</span>
        </h1>
        <p className="text-sm text-surface-500 mt-1">Review and approve procurement requests generated from low stock triggers.</p>
      </div>

      <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-card overflow-hidden">
        <Table columns={columns} data={rows} pageSize={8} />
      </div>
    </div>
  );
};

export default RequestRestockList;
