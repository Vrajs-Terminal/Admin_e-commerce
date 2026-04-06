import React, { useMemo } from 'react';
import { AlertTriangle, Download, PackageSearch } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Table from '../../components/ui/Table';
import { productCatalog } from './productData';

const LimitedStock = () => {
  const lowStockRows = useMemo(
    () => productCatalog.filter((item) => item.stock <= 20).map((item, index) => ({ ...item, sl: index + 1 })),
    []
  );

  const columns = [
    { key: 'sl', label: 'SL', render: (row) => <span>{row.sl}</span> },
    {
      key: 'name',
      label: 'Product',
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-surface-900 dark:text-white">{row.name}</span>
          <span className="text-xs text-surface-500">{row.sku}</span>
        </div>
      ),
    },
    { key: 'category', label: 'Category' },
    { key: 'stock', label: 'Current Stock', sortable: true },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <Badge variant={row.stock === 0 ? 'danger' : 'warning'}>{row.stock === 0 ? 'Out of Stock' : 'Low Stock'}</Badge>,
    },
    {
      key: 'restock',
      label: 'Suggestion',
      render: (row) => <span className="text-sm font-semibold text-primary-600">Order {Math.max(20, 60 - row.stock)} units</span>,
    },
  ];

  const handleExport = () => {
    const csv = [
      ['SKU', 'Product', 'Category', 'Stock'],
      ...lowStockRows.map((item) => [item.sku, item.name, item.category, item.stock]),
    ]
      .map((line) => line.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'limited-stock-report.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight">
            Limited <span className="text-primary-600">Stock</span>
          </h1>
          <p className="text-sm text-surface-500 mt-1">Track low inventory and create smart restock plans.</p>
        </div>
        <Button variant="outline" icon={Download} onClick={handleExport}>Export Report</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
          <p className="text-xs uppercase font-bold text-surface-500">Low Stock Items</p>
          <p className="text-3xl font-extrabold mt-1 text-amber-600">{lowStockRows.filter((item) => item.stock > 0).length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
          <p className="text-xs uppercase font-bold text-surface-500">Out Of Stock</p>
          <p className="text-3xl font-extrabold mt-1 text-red-600">{lowStockRows.filter((item) => item.stock === 0).length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
          <p className="text-xs uppercase font-bold text-surface-500">Total Alerted</p>
          <p className="text-3xl font-extrabold mt-1 text-primary-600">{lowStockRows.length}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-card overflow-hidden">
        <div className="px-5 py-3 border-b border-surface-200 dark:border-surface-700 flex items-center gap-2 text-surface-700 dark:text-surface-300 font-semibold">
          <PackageSearch size={16} />
          Inventory Alerts
        </div>
        <Table columns={columns} data={lowStockRows} pageSize={8} emptyState={<p className="text-surface-500">No low stock alerts.</p>} />
      </div>

      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 flex items-start gap-2">
        <AlertTriangle size={16} className="text-amber-600 mt-0.5" />
        <p className="text-sm text-amber-700 dark:text-amber-300">Critical products should be restocked before daily order cut-off to avoid order cancellations.</p>
      </div>
    </div>
  );
};

export default LimitedStock;
