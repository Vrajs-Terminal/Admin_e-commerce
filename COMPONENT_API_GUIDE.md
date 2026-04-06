# 🎨 Component API Guide - Quick Reference

## UI Components

### Button Component

**Location:** `src/components/ui/Button.jsx`

```jsx
import Button from '../components/ui/Button';

// Basic usage
<Button>Click me</Button>

// With variant (6 options)
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Delete</Button>
<Button variant="success">Confirm</Button>

// With size (5 options)
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon">🔍</Button>

// With icon
<Button icon={Download}>Export</Button>
<Button icon={Trash2} variant="danger">Delete</Button>

// Icon position
<Button icon={ChevronRight} iconPosition="right">Next</Button>

// Loading state
<Button isLoading>Processing...</Button>

// Disabled
<Button disabled>Can't click</Button>

// Custom className
<Button className="w-full" variant="primary">Full width</Button>
```

**Props:**
- `variant` - 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
- `size` - 'sm' | 'md' | 'lg' | 'xl' | 'icon'
- `icon` - Lucide Icon component
- `iconPosition` - 'left' | 'right'
- `isLoading` - boolean
- `disabled` - boolean
- `children` - React nodes

---

### Badge Component

**Location:** `src/components/ui/Badge.jsx`

```jsx
import Badge from '../components/ui/Badge';

// Status variants (14+ options)
<Badge variant="pending">Pending</Badge>
<Badge variant="confirmed">Confirmed</Badge>
<Badge variant="packaging">Packaging</Badge>
<Badge variant="delivery">Out for Delivery</Badge>
<Badge variant="delivered">Delivered</Badge>
<Badge variant="returned">Returned</Badge>
<Badge variant="failed">Failed</Badge>
<Badge variant="canceled">Canceled</Badge>
<Badge variant="paid">Paid</Badge>
<Badge variant="unpaid">Unpaid</Badge>
<Badge variant="pending_payment">Pending Payment</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="danger">Danger</Badge>

// With dot indicator
<Badge variant="delivered" dot>Delivered</Badge>

// With icon
<Badge variant="pending" icon={Clock}>Waiting</Badge>

// Size variants
<Badge size="sm" variant="pending">Small</Badge>
<Badge size="md" variant="pending">Medium</Badge>
<Badge size="lg" variant="pending">Large</Badge>

// Custom className
<Badge className="font-bold" variant="success">Custom</Badge>
```

**Props:**
- `variant` - 14+ status/color options
- `size` - 'sm' | 'md' | 'lg'
- `dot` - boolean (show colored indicator)
- `icon` - Lucide Icon component
- `children` - React nodes
- `className` - additional styles

---

### Table Component

**Location:** `src/components/ui/Table.jsx`

```jsx
import Table from '../components/ui/Table';

// Basic usage
const columns = [
  {
    key: 'orderId',
    label: 'Order ID',
    sortable: true,
    render: (row) => <code>{row.orderId}</code>
  },
  {
    key: 'customer',
    label: 'Customer',
    sortable: true,
    render: (row) => <span>{row.customer}</span>
  },
  {
    key: 'amount',
    label: 'Amount',
    sortable: true,
    render: (row) => <strong>₹{row.amount}</strong>
  }
];

<Table
  columns={columns}
  data={orders}
  onRowClick={handleRowClick}
  pageSize={10}
  selectable={true}
  onSelectRows={handleSelectRows}
  pagination={true}
/>

// With empty state
<Table
  columns={columns}
  data={[]}
  emptyState={
    <div className="text-center py-12">
      <Filter size={48} className="mx-auto text-gray-300 mb-4" />
      <p className="text-gray-600">No orders found</p>
    </div>
  }
/>

// Loading state
<Table
  columns={columns}
  data={[]}
  isLoading={true}
/>
```

**Column Definition:**
```javascript
{
  key: 'fieldName',           // Data key to access
  label: 'Column Title',      // Header text
  sortable: true,             // Allow sorting (default: true)
  render: (row, value) => {}  // Custom render function
}
```

**Props:**
- `columns` - Array of column definitions
- `data` - Array of objects (rows)
- `onRowClick` - Function called on row click
- `isLoading` - boolean
- `isEmpty` - boolean
- `emptyState` - React node for empty state
- `pagination` - boolean
- `pageSize` - number (default: 10)
- `selectable` - boolean
- `onSelectRows` - Function with selected indices

---

### FilterBar Component

**Location:** `src/components/orders/FilterBar.jsx`

```jsx
import FilterBar from '../components/orders/FilterBar';

const [searchQuery, setSearchQuery] = useState('');
const [selectedStatus, setSelectedStatus] = useState('all');
const [selectedPayment, setSelectedPayment] = useState('All');

<FilterBar
  onSearch={setSearchQuery}
  onStatusFilter={setSelectedStatus}
  onPaymentStatusFilter={setSelectedPayment}
  onDateRange={({ from, to }) => {
    console.log('Date range:', from, to);
  }}
  onReset={() => {
    setSearchQuery('');
    setSelectedStatus('all');
    setSelectedPayment('All');
  }}
  statuses={[
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' }
  ]}
  paymentStatuses={['All', 'Paid', 'Unpaid', 'Pending']}
/>
```

**Props:**
- `onSearch` - Function(query)
- `onStatusFilter` - Function(status)
- `onPaymentStatusFilter` - Function(paymentStatus)
- `onDateRange` - Function({ from, to })
- `onReset` - Function()
- `statuses` - Array of { value, label }
- `paymentStatuses` - Array of strings

---

## Order-Specific Components

### OrderDetailsDrawer

**Location:** `src/components/orders/OrderDetailsDrawer.jsx`

```jsx
import OrderDetailsDrawer from '../components/orders/OrderDetailsDrawer';

const [selectedOrder, setSelectedOrder] = useState(null);
const [isDrawerOpen, setIsDrawerOpen] = useState(false);

<OrderDetailsDrawer
  order={selectedOrder}
  isOpen={isDrawerOpen}
  onClose={() => setIsDrawerOpen(false)}
/>

// Open drawer
function handleViewOrder(order) {
  setSelectedOrder(order);
  setIsDrawerOpen(true);
}
```

**Required Order Object:**
```javascript
{
  orderId: '#ORD-001',
  customer: 'John Doe',
  email: 'john@example.com',
  phone: '+1-555-0000',
  date: '2024-04-12',
  status: 'Delivered',
  paymentStatus: 'Paid',
  amount: 1999,
  address: '123 Main St',
  city: 'New York',
  zip: '10001',
  subtotal: 1799,
  shipping: 150,
  tax: 50,
  items: [
    { name: 'Product 1', quantity: 2, price: 999 }
  ],
  timeline: [
    { title: 'Order Placed', timestamp: 'Apr 12, 2024 - 10:30 AM' }
  ]
}
```

---

### StatusTracker

**Location:** `src/components/orders/StatusTracker.jsx`

```jsx
import StatusTracker from '../components/orders/StatusTracker';

<StatusTracker
  currentStatus="packaging"  // pending, confirmed, packaging, delivery, delivered
  order={orderObject}
/>
```

**Current Status Values:**
- `pending` - Step 0
- `confirmed` - Step 1
- `packaging` - Step 2
- `delivery` - Step 3
- `delivered` - Step 4
- `returned` - Step 4
- `failed` - Step 2
- `canceled` - Step 0

---

### OrderCard (Mobile View)

**Location:** `src/components/orders/OrderCard.jsx`

```jsx
import OrderCard from '../components/orders/OrderCard';

<OrderCard
  order={order}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

// In a list
<div className="space-y-3">
  {orders.map(order => (
    <OrderCard
      key={order.orderId}
      order={order}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  ))}
</div>
```

---

## Hook Usage

### useFilterOrders (Custom)

```javascript
import { useMemo } from 'react';
import { 
  ordersData, 
  getOrdersByStatus, 
  getOrdersByPaymentStatus, 
  searchOrders 
} from '../constants/ordersMockData';

const filteredOrders = useMemo(() => {
  let filtered = ordersData;
  
  // Apply filters
  if (status !== 'all') {
    filtered = getOrdersByStatus(status);
  }
  
  if (paymentStatus !== 'All') {
    filtered = getOrdersByPaymentStatus(paymentStatus);
  }
  
  if (searchQuery) {
    filtered = searchOrders(searchQuery, filtered);
  }
  
  return filtered;
}, [searchQuery, status, paymentStatus]);
```

---

## Complete Page Example

```jsx
import React, { useState, useMemo } from 'react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';
import FilterBar from '../components/orders/FilterBar';
import OrderDetailsDrawer from '../components/orders/OrderDetailsDrawer';
import { ordersData } from '../constants/ordersMockData';

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    {
      key: 'orderId',
      label: 'Order ID',
      sortable: true
    },
    {
      key: 'customer',
      label: 'Customer',
      sortable: true
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (row) => <span className="font-bold">₹{row.amount}</span>
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => (
        <Badge variant={row.status.toLowerCase()}>
          {row.status}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>

      <FilterBar
        onSearch={setSearchQuery}
        onReset={() => setSearchQuery('')}
      />

      <Table
        columns={columns}
        data={ordersData.filter(o => 
          o.customer.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        onRowClick={(order) => {
          setSelectedOrder(order);
          setIsDrawerOpen(true);
        }}
      />

      <OrderDetailsDrawer
        order={selectedOrder}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
```

---

## Tailwind Classes Reference

### Common Patterns Used

```jsx
// Rounded corners
rounded-xl    // All corners
rounded-lg    // Medium radius
rounded-full  // Full circle

// Borders
border                    // All borders
border-surface-200        // Color variants
dark:border-surface-800   // Dark mode

// Spacing
px-6 py-4               // Padding
gap-3                   // Gap between items
space-y-3               // Vertical spacing

// Colors
bg-primary-600          // Background
text-white              // Text color
dark:bg-surface-900     // Dark mode support

// Shadows
shadow-sm               // Small shadow
shadow-lg               // Large shadow
shadow-xl               // Extra large
hover:shadow-md         // On hover

// Transitions
transition-all          // All properties
duration-200            // Duration
duration-300            // Slightly slower

// Responsive
md:grid-cols-2          // Tablet and up
lg:w-64                 // Desktop and up
```

---

## Tips & Best Practices

1. **Always use `dark:` variants**
   ```jsx
   className="bg-white dark:bg-surface-900"
   ```

2. **Consistent spacing**
   ```jsx
   <div className="space-y-4 p-6">
   ```

3. **Use semantic HTML**
   ```jsx
   <button>  // Not <div onClick>
   <table>   // For tabular data
   ```

4. **Memoize expensive calculations**
   ```jsx
   const filtered = useMemo(() => { /* ... */ }, [deps])
   ```

5. **Use icon library consistently**
   ```jsx
   import { IconName } from 'lucide-react';
   ```

6. **Test responsive designs**
   ```
   Mobile: 375px
   Tablet: 768px
   Desktop: 1024px+
   ```

---

**Happy coding! 🚀**
