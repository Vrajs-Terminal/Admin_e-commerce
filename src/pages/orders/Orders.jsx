import React, { useState, useMemo } from 'react';
import {
  Download,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  Filter,
  TrendingUp,
  ShoppingCart,
  CheckCircle,
  AlertCircle,
  IndianRupee,
  Calendar,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Table from '../../components/ui/Table';
import FilterBar from '../../components/orders/FilterBar';
import OrderDetailsDrawer from '../../components/orders/OrderDetailsDrawer';
import StatusTracker from '../../components/orders/StatusTracker';
import { ordersData, getOrdersByStatus, getOrdersByPaymentStatus, searchOrders } from '../../constants/ordersMockData';

const getStatusVariant = (status = '') => {
  const normalized = status.toLowerCase().replace(/\s+/g, '-');
  if (normalized === 'out-for-delivery') return 'delivery';
  if (normalized === 'failed-to-deliver') return 'failed';
  if (normalized === 'cancelled') return 'canceled';
  return normalized;
};

const KpiCard = ({ title, value, icon: Icon, trend = '+8.2%', tone = 'primary' }) => {
  const toneClasses = {
    primary: 'text-primary-600 bg-primary-50 dark:bg-primary-900/20',
    success: 'text-green-600 bg-green-50 dark:bg-green-900/20',
    warning: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20',
    danger: 'text-red-600 bg-red-50 dark:bg-red-900/20',
  };

  return (
    <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-card hover:shadow-card-hover transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div className={`p-1.5 rounded-md ${toneClasses[tone]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-green-100 dark:bg-green-900/30 text-green-600">
          <TrendingUp size={8} />
          {trend}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-[11px] font-semibold text-surface-500 uppercase tracking-wide">{title}</p>
        <p className="text-lg sm:text-xl font-extrabold text-surface-900 dark:text-white tracking-tight mt-0.5">{value}</p>
      </div>
    </div>
  );
};

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('All');
  const [selectedRows, setSelectedRows] = useState([]);

  // Filter orders based on search, status filters
  const filteredOrders = useMemo(() => {
    let filtered = ordersData;

    // Apply status filter
    if (selectedStatus !== 'all') {
      filtered = getOrdersByStatus(selectedStatus);
    }

    // Apply payment status filter
    if (selectedPaymentStatus !== 'All') {
      filtered = getOrdersByPaymentStatus(selectedPaymentStatus);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = searchOrders(searchQuery, filtered);
    }

    return filtered;
  }, [searchQuery, selectedStatus, selectedPaymentStatus]);

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const handleExport = () => {
    const csv = [
      ['Order ID', 'Customer', 'Date', 'Amount', 'Payment Status', 'Order Status'],
      ...filteredOrders.map(order => [
        order.orderId,
        order.customer,
        order.date,
        `₹${order.amount}`,
        order.paymentStatus,
        order.status,
      ]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'packaging', label: 'Packaging' },
    { value: 'delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'returned', label: 'Returned' },
    { value: 'failed', label: 'Failed to Deliver' },
    { value: 'canceled', label: 'Canceled' },
  ];

  const statusStats = [
    { label: 'Pending', value: ordersData.filter((o) => o.status === 'Pending').length, icon: Filter, trend: '+2.1%', tone: 'warning' },
    { label: 'Confirmed', value: ordersData.filter((o) => o.status === 'Confirmed').length, icon: CheckCircle, trend: '+4.4%', tone: 'primary' },
    { label: 'Packaging', value: ordersData.filter((o) => o.status === 'Packaging').length, icon: ShoppingCart, trend: '+3.2%', tone: 'primary' },
    { label: 'Out for Delivery', value: ordersData.filter((o) => o.status === 'Out for Delivery').length, icon: ShoppingCart, trend: '+3.8%', tone: 'primary' },
    { label: 'Delivered', value: ordersData.filter((o) => o.status === 'Delivered').length, icon: CheckCircle, trend: '+6.8%', tone: 'success' },
    { label: 'Canceled', value: ordersData.filter((o) => o.status === 'Canceled').length, icon: AlertCircle, trend: '+1.9%', tone: 'danger' },
    { label: 'Returned', value: ordersData.filter((o) => o.status === 'Returned').length, icon: AlertCircle, trend: '+1.4%', tone: 'warning' },
    { label: 'Failed', value: ordersData.filter((o) => o.status === 'Failed').length, icon: AlertCircle, trend: '-1.9%', tone: 'danger' },
  ];

  const tableColumns = [
    {
      key: 'orderId',
      label: 'Order ID',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <code className="text-xs font-mono bg-surface-100 dark:bg-surface-800 px-2 py-1 rounded">
            {row.orderId}
          </code>
        </div>
      ),
    },
    {
      key: 'customer',
      label: 'Customer',
      sortable: true,
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-surface-900 dark:text-white">{row.customer}</span>
          <span className="text-xs text-surface-500 dark:text-surface-400">{row.email}</span>
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (row) => (
        <span className="text-surface-600 dark:text-surface-300">
          {new Date(row.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-surface-900 dark:text-white">
          ₹{row.amount.toLocaleString('en-IN')}
        </span>
      ),
    },
    {
      key: 'paymentStatus',
      label: 'Payment',
      sortable: true,
      render: (row) => (
        <Badge
          variant={row.paymentStatus === 'Paid' ? 'paid' : row.paymentStatus === 'Unpaid' ? 'unpaid' : 'pending_payment'}
          dot
        >
          {row.paymentStatus}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Order Status',
      sortable: true,
      render: (row) => <Badge variant={getStatusVariant(row.status)}>{row.status}</Badge>,
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleRowClick(row)}
            className="p-2 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg transition-colors text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400"
            title="View Details"
          >
            <Eye size={18} />
          </button>
          <button
            className="p-2 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg transition-colors text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400"
            title="Edit"
          >
            <Edit size={18} />
          </button>
          <button
            className="p-2 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg transition-colors text-surface-600 dark:text-surface-400 hover:text-red-600 dark:hover:text-red-400"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight">
                Orders <span className="text-primary-600">Overview</span>
              </h1>
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-semibold">
                {filteredOrders.length}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl shadow-sm text-sm font-medium text-surface-600 dark:text-surface-300">
              <Calendar size={16} className="text-primary-500" />
              <span className="whitespace-nowrap">Apr 01 - Apr 07, 2026</span>
            </div>
            {selectedRows.length > 0 && (
              <Button
                variant="secondary"
                size="md"
                className="text-sm"
              >
                Bulk Actions ({selectedRows.length})
              </Button>
            )}
            <Button
              variant="primary"
              size="md"
              icon={Download}
              onClick={handleExport}
            >
              Export Data
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-primary-600" />
            <h2 className="text-sm font-bold text-surface-600 dark:text-surface-400 uppercase tracking-wider">Orders Intelligence</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <KpiCard title="Total Orders" value={ordersData.length} icon={ShoppingCart} trend="+12.5%" tone="primary" />
            {statusStats.map((stat) => (
              <KpiCard
                key={stat.label}
                title={stat.label}
                value={stat.value}
                icon={stat.icon}
                trend={stat.trend}
                tone={stat.tone}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 border border-surface-200 dark:border-surface-700 shadow-card">
        <FilterBar
          onSearch={setSearchQuery}
          onStatusFilter={setSelectedStatus}
          onPaymentStatusFilter={setSelectedPaymentStatus}
          onReset={() => {
            setSearchQuery('');
            setSelectedStatus('all');
            setSelectedPaymentStatus('All');
          }}
          statuses={statusOptions}
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-card overflow-hidden">
        <Table
          columns={tableColumns}
          data={filteredOrders}
          onRowClick={handleRowClick}
          pageSize={10}
          selectable={true}
          onSelectRows={setSelectedRows}
          emptyState={
            <div className="py-16 text-center">
              <Filter size={48} className="mx-auto mb-4 text-surface-300 dark:text-surface-700" />
              <p className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                No orders found
              </p>
              <p className="text-surface-600 dark:text-surface-400">
                Try adjusting your filters or search query
              </p>
            </div>
          }
        />
      </div>

      {/* Order Details Drawer */}
      <OrderDetailsDrawer
        order={selectedOrder}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default Orders;
