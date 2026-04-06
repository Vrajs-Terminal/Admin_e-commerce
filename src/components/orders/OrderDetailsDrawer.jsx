import React from 'react';
import { createPortal } from 'react-dom';
import { X, Copy, Check } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import StatusTracker from './StatusTracker';

const OrderDetailsDrawer = ({ order, isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !order) return null;

  React.useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const drawerUI = (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120] animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`
          fixed inset-y-0 right-0 h-screen max-h-screen w-full max-w-2xl bg-white dark:bg-surface-900 shadow-2xl z-[121]
          flex flex-col overflow-hidden animate-slide-in
        `}
      >
        {/* Header */}
        <div className="bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 px-5 sm:px-6 py-4 flex items-center justify-between z-20 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-surface-900 dark:text-white">Order Details</h2>
            <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">Order ID: {order.orderId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg transition-colors"
          >
            <X size={24} className="text-surface-600 dark:text-surface-400" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-6 py-5 sm:py-6 space-y-6">
          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white uppercase tracking-wide">
              Order Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-surface-500 dark:text-surface-400 mb-1">Order ID</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono bg-surface-100 dark:bg-surface-800 px-3 py-2 rounded-lg text-surface-900 dark:text-white">
                    {order.orderId}
                  </code>
                  <button
                    onClick={() => copyToClipboard(order.orderId)}
                    className="p-2 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg transition-colors"
                  >
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-surface-500" />}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs text-surface-500 dark:text-surface-400 mb-1">Order Date</p>
                <p className="text-sm font-medium text-surface-900 dark:text-white">{order.date}</p>
              </div>
              <div>
                <p className="text-xs text-surface-500 dark:text-surface-400 mb-1">Order Status</p>
                <Badge variant={order.status.toLowerCase()}>{order.status}</Badge>
              </div>
              <div>
                <p className="text-xs text-surface-500 dark:text-surface-400 mb-1">Payment Status</p>
                <Badge variant={order.paymentStatus === 'Paid' ? 'paid' : 'unpaid'}>
                  {order.paymentStatus}
                </Badge>
              </div>
            </div>
          </div>

          {/* Status Tracker */}
          <div className="border-t border-surface-200 dark:border-surface-800 pt-6">
            <StatusTracker currentStatus={order.status.toLowerCase()} order={order} />
          </div>

          {/* Customer Information */}
          <div className="space-y-4 border-t border-surface-200 dark:border-surface-800 pt-6">
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white uppercase tracking-wide">
              Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-surface-500 dark:text-surface-400 mb-1">Customer Name</p>
                <p className="text-sm font-medium text-surface-900 dark:text-white">{order.customer}</p>
              </div>
              <div>
                <p className="text-xs text-surface-500 dark:text-surface-400 mb-1">Email</p>
                <p className="text-sm font-medium text-surface-900 dark:text-white">{order.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-surface-500 dark:text-surface-400 mb-1">Phone</p>
                <p className="text-sm font-medium text-surface-900 dark:text-white">{order.phone || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-4 border-t border-surface-200 dark:border-surface-800 pt-6">
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white uppercase tracking-wide">
              Delivery Address
            </h3>
            <div className="bg-surface-50 dark:bg-surface-800/50 p-4 rounded-lg border border-surface-200 dark:border-surface-700">
              <p className="text-sm text-surface-900 dark:text-white mb-2">{order.address || 'Not provided'}</p>
              <p className="text-sm text-surface-500 dark:text-surface-400">{order.city || ''} {order.zip || ''}</p>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-4 border-t border-surface-200 dark:border-surface-800 pt-6">
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white uppercase tracking-wide">
              Order Items
            </h3>
            <div className="space-y-3">
              {order.items && order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800/50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-surface-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-surface-900 dark:text-white">₹{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-4 border-t border-surface-200 dark:border-surface-800 pt-6">
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white uppercase tracking-wide">
              Payment Details
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-surface-600 dark:text-surface-400">Subtotal</span>
                <span className="text-sm font-medium text-surface-900 dark:text-white">₹{order.subtotal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-surface-600 dark:text-surface-400">Shipping</span>
                <span className="text-sm font-medium text-surface-900 dark:text-white">₹{order.shipping}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-surface-600 dark:text-surface-400">Tax</span>
                <span className="text-sm font-medium text-surface-900 dark:text-white">₹{order.tax}</span>
              </div>
              <div className="border-t border-surface-200 dark:border-surface-700 pt-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-surface-900 dark:text-white">Total Amount</span>
                <span className="text-lg font-bold text-primary-600">₹{order.amount}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Sticky Action Buttons */}
        <div className="border-t border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 px-5 sm:px-6 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] grid grid-cols-2 gap-3 flex-shrink-0">
          <Button variant="secondary" className="w-full">
            Edit Order
          </Button>
          <Button variant="danger" className="w-full">
            Cancel Order
          </Button>
        </div>
      </div>
    </>
  );

  return createPortal(drawerUI, document.body);
};

export default OrderDetailsDrawer;
